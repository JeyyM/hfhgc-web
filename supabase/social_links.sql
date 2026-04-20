-- ==========================================
-- Social Media Links Table
-- ==========================================

-- Create table
CREATE TABLE IF NOT EXISTS social_links (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  platform    TEXT NOT NULL,          -- e.g. 'facebook', 'instagram', 'tiktok', 'linkedin', 'twitter', 'youtube'
  url         TEXT NOT NULL,
  sort_order  INT DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT now(),
  updated_at  TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE social_links ENABLE ROW LEVEL SECURITY;

-- Public can read
DROP POLICY IF EXISTS "Public read" ON social_links;
CREATE POLICY "Public read" ON social_links FOR SELECT USING (true);

-- Admin full access
DROP POLICY IF EXISTS "Admin full access" ON social_links;
CREATE POLICY "Admin full access" ON social_links FOR ALL USING (is_admin()) WITH CHECK (is_admin());

-- Explicit admin delete (ensures DELETE is covered)
DROP POLICY IF EXISTS "Admin delete" ON social_links;
CREATE POLICY "Admin delete" ON social_links FOR DELETE USING (is_admin());

-- Auto-update updated_at
CREATE OR REPLACE TRIGGER set_social_links_updated_at
  BEFORE UPDATE ON social_links
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Seed with initial data
INSERT INTO social_links (platform, url, sort_order) VALUES
  ('facebook',  'https://facebook.com/dlsu.hfhgc', 1),
  ('instagram', 'https://instagram.com/habitatdlsu', 2),
  ('tiktok',    'https://www.tiktok.com/@habitatdlsu', 3),
  ('linkedin',  'https://linkedin.com/company/habitat-dlsu', 4)
ON CONFLICT DO NOTHING;
