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
--   supabase secrets set TURNSTILE_SECRET_KEY=your_secret
--   supabase functions deploy submit-contact --no-verify-jwt
-- Or set TURNSTILE_SECRET_KEY in Dashboard → Edge Functions → Secrets.
-- Create Turnstile widget in Cloudflare dashboard; add VITE_TURNSTILE_SITE_KEY to the Vite app.
