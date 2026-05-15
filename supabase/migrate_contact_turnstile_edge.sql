-- ════════════════════════════════════════════════════════════════════════════
-- Contact form: Cloudflare Turnstile + Edge Function + server-side rate limit
-- Run in Supabase SQL Editor (no full reset). Safe to re-run with IF EXISTS.
-- ════════════════════════════════════════════════════════════════════════════

-- 1) Stop anonymous direct INSERTs (submissions go through Edge Function + service_role)
DROP POLICY IF EXISTS "Anyone can submit" ON public.contact_submissions;

-- 2) Rate bucket table (RLS on, no policies → only service_role bypass works)
CREATE TABLE IF NOT EXISTS public.contact_submit_rate (
  fingerprint       TEXT PRIMARY KEY,
  last_submit_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.contact_submit_rate ENABLE ROW LEVEL SECURITY;

-- Optional hardening: default grants are schema-dependent; RLS blocks anon/auth without policies.
REVOKE ALL ON public.contact_submit_rate FROM PUBLIC;
GRANT ALL ON public.contact_submit_rate TO service_role;

-- Edge Function deploy (CLI):
--   supabase secrets set TURNSTILE_SECRET_KEY=your_turnstile_secret
--   supabase secrets set EMAILJS_SERVICE_ID=...
--   supabase secrets set EMAILJS_TEMPLATE_ID=...
--   supabase secrets set EMAILJS_PUBLIC_KEY=...   -- EmailJS "Public Key"
-- If EmailJS "Use Private Key" is enabled: REQUIRED
-- supabase secrets set EMAILJS_PRIVATE_KEY=...   -- REST `accessToken`
--   supabase functions deploy submit-contact --no-verify-jwt
-- Or set the same keys in Dashboard → Edge Functions → Secrets.
-- Turnstile: add VITE_TURNSTILE_SITE_KEY to Vercel/local .env; hostnames must match your deployed URL.
