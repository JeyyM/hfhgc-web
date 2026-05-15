-- ============================================================================
-- Migration: customizable partnership package rows
-- ----------------------------------------------------------------------------
-- Run this ONCE in the Supabase SQL Editor on a database that still has the
-- OLD partnership_packages columns (followers_count, publicity_materials_count,
-- has_report) OR on a DB that already has the new tables (script is mostly safe).
--
-- Afterward the app expects:
--   - partnership_packages WITHOUT those three legacy columns + WITH is_most_popular
--   - partnership_package_items (child rows per package)
--
-- Fresh installs: use supabase/schema.sql instead (already includes everything).
-- ============================================================================

-- 1) Featured tier flag ------------------------------------------------------------
ALTER TABLE public.partnership_packages
  ADD COLUMN IF NOT EXISTS is_most_popular BOOLEAN NOT NULL DEFAULT false;

UPDATE public.partnership_packages
SET is_most_popular = true
WHERE tier_name ILIKE '%gold%';

-- Optional: exactly one featured tier (toggle off others named differently)
-- UPDATE public.partnership_packages SET is_most_popular = false WHERE tier_name NOT ILIKE '%gold%';

-- 2) Child table -------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.partnership_package_items (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  package_id    UUID NOT NULL REFERENCES public.partnership_packages(id) ON DELETE CASCADE,
  sort_order    INTEGER NOT NULL DEFAULT 0,
  title         TEXT NOT NULL DEFAULT '',
  subtext       TEXT NOT NULL DEFAULT '',
  display_type  TEXT NOT NULL DEFAULT 'text' CHECK (display_type IN ('text', 'checkbox')),
  text_value    TEXT NOT NULL DEFAULT '',
  is_included   BOOLEAN NOT NULL DEFAULT false,
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_partnership_package_items_package_sort
  ON public.partnership_package_items(package_id, sort_order);

COMMENT ON TABLE public.partnership_package_items IS 'Per-tier package card rows (text stat or checkbox include/exclude).';

-- 3) Backfill line items from legacy columns (only when those columns exist) -------
DO $$
DECLARE
  pkg RECORD;
  has_legacy BOOLEAN;
BEGIN
  SELECT EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'partnership_packages'
      AND column_name = 'followers_count'
  ) INTO has_legacy;

  IF NOT has_legacy THEN
    RETURN;
  END IF;

  FOR pkg IN SELECT * FROM public.partnership_packages LOOP
    IF EXISTS (SELECT 1 FROM public.partnership_package_items WHERE package_id = pkg.id) THEN
      CONTINUE;
    END IF;

    INSERT INTO public.partnership_package_items
      (package_id, sort_order, title, subtext, display_type, text_value, is_included)
    VALUES
      (pkg.id, 0, 'Social Media Followers', 'FB or IG page follows', 'text',
       COALESCE(pkg.followers_count::text, ''), false),
      (pkg.id, 1, 'Publicity Materials', 'Likes & shares on chosen posts', 'text',
       COALESCE(pkg.publicity_materials_count::text, ''), false),
      (pkg.id, 2, 'Post-Activity Report', 'Provided upon request', 'checkbox',
       '', COALESCE(pkg.has_report, false));
  END LOOP;
END $$;

-- 4) Drop legacy columns ------------------------------------------------------------
ALTER TABLE public.partnership_packages
  DROP COLUMN IF EXISTS followers_count,
  DROP COLUMN IF EXISTS publicity_materials_count,
  DROP COLUMN IF EXISTS has_report;

-- 5) RLS -----------------------------------------------------------------------------
ALTER TABLE public.partnership_package_items ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read" ON public.partnership_package_items;
DROP POLICY IF EXISTS "Admin full access" ON public.partnership_package_items;

CREATE POLICY "Public read" ON public.partnership_package_items
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.partnership_packages p
      WHERE p.id = package_id AND p.is_visible = true
    )
  );

CREATE POLICY "Admin full access" ON public.partnership_package_items
  FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

-- 6) updated_at trigger (requires update_updated_at() from schema.sql) --------------
DROP TRIGGER IF EXISTS set_updated_at ON public.partnership_package_items;
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.partnership_package_items
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at();
