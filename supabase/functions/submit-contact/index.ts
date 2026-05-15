/**
 * POST /functions/v1/submit-contact — verify Turnstile, rate-limit, insert contact_submissions (service_role).
 *
 * Secrets (Dashboard → Edge Functions → Secrets):
 *   TURNSTILE_SECRET_KEY       — Cloudflare Turnstile secret
 *   EMAILJS_SERVICE_ID        — optional; sends notification after save
 *   EMAILJS_TEMPLATE_ID
 *   EMAILJS_PUBLIC_KEY        — EmailJS "Public Key" / user_id for REST
 *   EMAILJS_PRIVATE_KEY       — required if EmailJS → Account → API Settings has "Use Private Key" ON
 *                               (maps to REST body field `accessToken`)
 *
 * Auto-injected by Supabase:
 *   SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
 *
 * EmailJS REST: https://www.emailjs.com/docs/rest-api/send/
 */
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.1';

const corsHeaders: Record<string, string> = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, accept, accept-language, x-supabase-api-version',
  'Access-Control-Max-Age': '86400',
};

const MAX_NAME = 200;
const MAX_EMAIL = 254;
const MIN_EMAIL = 3;
const MAX_SUBJECT = 500;
const MAX_MESSAGE = 8000;
/** Minimum time between submissions per IP+email fingerprint */
const RATE_WINDOW_MS = 15 * 60 * 1000;

interface BodyPayload {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  captchaToken?: string;
}

function jsonResponse(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

async function sha256Hex(input: string): Promise<string> {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(input));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

function clientIp(req: Request): string {
  const xff = req.headers.get('x-forwarded-for');
  if (xff) return xff.split(',')[0]?.trim() || 'unknown';
  const xr = req.headers.get('x-real-ip');
  if (xr) return xr.trim();
  return 'unknown';
}

async function verifyTurnstile(token: string, remoteip: string): Promise<boolean> {
  const secret = Deno.env.get('TURNSTILE_SECRET_KEY');
  if (!secret || !token) return false;
  const body = new URLSearchParams({ secret, response: token });
  if (remoteip !== 'unknown') body.set('remoteip', remoteip);
  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  });
  const json = (await res.json()) as { success?: boolean };
  return json.success === true;
}

type EmailNotificationResult = 'sent' | 'not_configured' | 'failed';

/** Best-effort inbox notification; does not fail the request if EmailJS is down or unset. */
async function sendEmailJsNotification(params: {
  from_name: string;
  from_email: string;
  subject: string;
  message: string;
}): Promise<EmailNotificationResult> {
  const serviceId = Deno.env.get('EMAILJS_SERVICE_ID');
  const templateId = Deno.env.get('EMAILJS_TEMPLATE_ID');
  const publicKey = Deno.env.get('EMAILJS_PUBLIC_KEY');
  const accessToken = Deno.env.get('EMAILJS_PRIVATE_KEY');

  if (!serviceId || !templateId || !publicKey) {
    console.warn('[submit-contact] EmailJS secrets not set — skipping email notification');
    return 'not_configured';
  }

  const payload: Record<string, unknown> = {
    service_id: serviceId,
    template_id: templateId,
    user_id: publicKey,
    template_params: params,
  };
  if (accessToken) payload.accessToken = accessToken;

  const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const txt = await res.text();
    console.error('[submit-contact] EmailJS send failed', res.status, txt);
    if (res.status === 403 && !accessToken) {
      console.warn(
        '[submit-contact] EmailJS 403 — add Edge secret EMAILJS_PRIVATE_KEY (your EmailJS private key) when "Use Private Key" is enabled in EmailJS.',
      );
    }
    return 'failed';
  }
  return 'sent';
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return jsonResponse({ error: 'Method not allowed' }, 405);
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const serviceRole = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  if (!supabaseUrl || !serviceRole) {
    return jsonResponse({ error: 'Server not configured' }, 500);
  }

  const sb = createClient(supabaseUrl, serviceRole, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  let body: BodyPayload;
  try {
    body = (await req.json()) as BodyPayload;
  } catch {
    return jsonResponse({ error: 'Invalid JSON' }, 400);
  }

  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const subject = typeof body.subject === 'string' ? body.subject.trim() : '';
  const message = typeof body.message === 'string' ? body.message.trim() : '';
  const captchaToken = typeof body.captchaToken === 'string' ? body.captchaToken : '';

  if (name.length < 1 || name.length > MAX_NAME) {
    return jsonResponse({ error: 'Invalid name length' }, 400);
  }
  if (email.length < MIN_EMAIL || email.length > MAX_EMAIL) {
    return jsonResponse({ error: 'Invalid email' }, 400);
  }
  if (subject.length < 1 || subject.length > MAX_SUBJECT) {
    return jsonResponse({ error: 'Invalid subject length' }, 400);
  }
  if (message.length < 1 || message.length > MAX_MESSAGE) {
    return jsonResponse({ error: 'Invalid message length' }, 400);
  }

  const ip = clientIp(req);
  const fingerprint = await sha256Hex(`${ip}:${email.toLowerCase()}`);

  const { data: rateRow, error: rateErr } = await sb
    .from('contact_submit_rate')
    .select('last_submit_at')
    .eq('fingerprint', fingerprint)
    .maybeSingle();

  if (rateErr) {
    console.error('rate lookup', rateErr);
    return jsonResponse({ error: 'Rate check failed' }, 500);
  }

  if (rateRow?.last_submit_at) {
    const last = new Date(rateRow.last_submit_at).getTime();
    if (Date.now() - last < RATE_WINDOW_MS) {
      return jsonResponse({ error: 'Too many submissions. Try again in a few minutes.' }, 429);
    }
  }

  const captchaOk = await verifyTurnstile(captchaToken, ip);
  if (!captchaOk) {
    return jsonResponse({ error: 'Captcha verification failed. Refresh and try again.' }, 403);
  }

  const { error: insertErr } = await sb.from('contact_submissions').insert({
    name,
    email,
    subject,
    message,
  });

  if (insertErr) {
    console.error('insert contact_submissions', insertErr);
    return jsonResponse({ error: 'Could not save your message.' }, 500);
  }

  const { error: upsertErr } = await sb.from('contact_submit_rate').upsert(
    { fingerprint, last_submit_at: new Date().toISOString() },
    { onConflict: 'fingerprint' },
  );

  if (upsertErr) {
    console.error('upsert contact_submit_rate', upsertErr);
  }

  const email_notification = await sendEmailJsNotification({
    from_name: name,
    from_email: email,
    subject,
    message,
  });

  return jsonResponse({ ok: true, email_notification });
});
