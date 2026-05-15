-- ════════════════════════════════════════════════════════════════════════════
-- Apply on an existing database (no full reset). Safe to re-run.
-- Matches supabase/schema.sql hardening: is_admin(), RLS cleanup, contact limits.
-- ════════════════════════════════════════════════════════════════════════════

-- 1) Contact row size limits (fails if existing rows violate lengths; trim data first if needed)
ALTER TABLE public.contact_submissions
  DROP CONSTRAINT IF EXISTS contact_name_len,
  DROP CONSTRAINT IF EXISTS contact_email_len,
  DROP CONSTRAINT IF EXISTS contact_subject_len,
  DROP CONSTRAINT IF EXISTS contact_message_len;

ALTER TABLE public.contact_submissions
  ADD CONSTRAINT contact_name_len CHECK (char_length(trim(name)) BETWEEN 1 AND 200),
  ADD CONSTRAINT contact_email_len CHECK (char_length(trim(email)) BETWEEN 3 AND 254),
  ADD CONSTRAINT contact_subject_len CHECK (char_length(trim(subject)) BETWEEN 1 AND 500),
  ADD CONSTRAINT contact_message_len CHECK (char_length(trim(message)) BETWEEN 1 AND 8000);

-- 2) Harden is_admin()
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_profiles
    WHERE id = auth.uid()
  );
$$;

REVOKE ALL ON FUNCTION public.is_admin() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated;

-- 3) Drop redundant admin policies (FOR ALL already covers these)
DROP POLICY IF EXISTS "Admin update" ON public.site_settings;
DROP POLICY IF EXISTS "Admin insert" ON public.site_settings;
DROP POLICY IF EXISTS "Admin delete" ON public.site_settings;

DROP POLICY IF EXISTS "Admin delete" ON public.social_links;
