-- ============================================================================
-- Optional seed: three default line items for every package that has none
-- ----------------------------------------------------------------------------
-- Use when tiers exist in partnership_packages but partnership_package_items
-- is empty (e.g. migration skipped backfill). Safe to run multiple times.
-- Edit the text_value '0' defaults below to match your site if needed.
-- ============================================================================

WITH need AS (
  SELECT pp.id
  FROM public.partnership_packages pp
  WHERE NOT EXISTS (
    SELECT 1 FROM public.partnership_package_items i WHERE i.package_id = pp.id
  )
)
INSERT INTO public.partnership_package_items
  (package_id, sort_order, title, subtext, display_type, text_value, is_included)
SELECT id, 0, 'Social Media Followers', 'FB or IG page follows', 'text', '0', false FROM need
UNION ALL
SELECT id, 1, 'Publicity Materials', 'Likes & shares on chosen posts', 'text', '0', false FROM need
UNION ALL
SELECT id, 2, 'Post-Activity Report', 'Provided upon request', 'checkbox', '', true FROM need;
