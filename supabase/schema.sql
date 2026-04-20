-- ============================================================================
-- HFHGC Website — Supabase Database Schema
-- ============================================================================
-- Run this in the Supabase SQL Editor to create all tables.
-- Images are stored in Supabase Storage; columns hold the public URL / path.
-- This schema is RERUNNABLE - it will drop existing tables and recreate them.
-- ============================================================================

-- Drop all tables first (in reverse dependency order)
DROP TABLE IF EXISTS contact_submissions CASCADE;
DROP TABLE IF EXISTS admin_profiles CASCADE;
DROP TABLE IF EXISTS partner_testimonials CASCADE;
DROP TABLE IF EXISTS partnership_benefits CASCADE;
DROP TABLE IF EXISTS partners CASCADE;
DROP TABLE IF EXISTS faqs CASCADE;
DROP TABLE IF EXISTS announcements CASCADE;
DROP TABLE IF EXISTS testimonials CASCADE;
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS blog_posts CASCADE;
DROP TABLE IF EXISTS core_values CASCADE;
DROP TABLE IF EXISTS about_page CASCADE;
DROP TABLE IF EXISTS social_links CASCADE;
DROP TABLE IF EXISTS impact_stats CASCADE;
DROP TABLE IF EXISTS home_cards CASCADE;
DROP TABLE IF EXISTS home_hero CASCADE;
DROP TABLE IF EXISTS site_settings CASCADE;

-- Drop functions
DROP FUNCTION IF EXISTS is_admin() CASCADE;
DROP FUNCTION IF EXISTS update_updated_at() CASCADE;


-- ╔══════════════════════════════════════════════════════════════════════════╗
-- ║  1. SITE SETTINGS  (global key-value config)                           ║
-- ╚══════════════════════════════════════════════════════════════════════════╝

CREATE TABLE site_settings (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key         TEXT UNIQUE NOT NULL,           -- e.g. 'org_email', 'org_phone'
  value       TEXT NOT NULL,
  updated_at  TIMESTAMPTZ DEFAULT now()
);

-- Seed the baseline settings (contact info, social links, etc.)
INSERT INTO site_settings (key, value) VALUES
  ('org_name',        'Habitat for Humanity Green Chapter DLSU'),
  ('org_email',       'hfhgc@dlsu.edu.ph'),
  ('org_phone',       '+63 912 345 6789'),
  ('org_address',     'De La Salle University, 2401 Taft Ave, Malate, Manila, 1004 Metro Manila'),
  ('partnerships_email', 'partnerships@hfhgc.org')
ON CONFLICT (key) DO NOTHING;


-- ╔══════════════════════════════════════════════════════════════════════════╗
-- ║  2. HOME PAGE                                                          ║
-- ╚══════════════════════════════════════════════════════════════════════════╝

-- 2a. Hero section
CREATE TABLE home_hero (
  id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  heading_line1   TEXT NOT NULL DEFAULT 'Building',
  heading_accent1 TEXT NOT NULL DEFAULT 'Homes',
  heading_line2   TEXT NOT NULL DEFAULT 'Building',
  heading_accent2 TEXT NOT NULL DEFAULT 'Hope',
  subtext         TEXT NOT NULL DEFAULT 'Habitat for Humanity Green Chapter in De La Salle University Manila is dedicated to creating sustainable communities and empowering families.',
  image_url       TEXT NOT NULL DEFAULT '',       -- Supabase Storage URL
  image_caption   TEXT NOT NULL DEFAULT 'Together we build!',
  cta1_label      TEXT NOT NULL DEFAULT 'Our Projects',
  cta1_link       TEXT NOT NULL DEFAULT '/projects',
  cta2_label      TEXT NOT NULL DEFAULT 'Get Involved',
  cta2_link       TEXT NOT NULL DEFAULT '/contact',
  updated_at      TIMESTAMPTZ DEFAULT now()
);

-- Single-row table — insert default
INSERT INTO home_hero DEFAULT VALUES
ON CONFLICT DO NOTHING;

-- 2b. Mission / Vision / Community cards
CREATE TABLE home_cards (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title       TEXT NOT NULL,
  description TEXT NOT NULL,
  icon_name   TEXT NOT NULL DEFAULT 'Home',     -- Lucide icon name
  sort_order  INT NOT NULL DEFAULT 0,
  updated_at  TIMESTAMPTZ DEFAULT now()
);

INSERT INTO home_cards (title, description, icon_name, sort_order) VALUES
  ('Our Vision',    'A world where everyone has a decent place to live. We envision communities where families thrive in safe, affordable homes.', 'Home', 0),
  ('Our Mission',   'Seeking to put God''s love into action, Habitat for Humanity brings people together to build homes, communities and hope.', 'Heart', 1),
  ('Our Community', 'Driven by passionate DLSU students, we are a family of volunteers dedicated to making a tangible difference in society.', 'Users', 2)
ON CONFLICT DO NOTHING;

-- 2c. Impact stats (number counters)
CREATE TABLE impact_stats (
  id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  label      TEXT NOT NULL,
  value      TEXT NOT NULL,                    -- e.g. '50+', '1,500+'
  icon_name  TEXT NOT NULL DEFAULT 'Home',
  sort_order INT NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT now()
);

INSERT INTO impact_stats (label, value, icon_name, sort_order) VALUES
  ('Homes Built',      '50+',    'Home',   0),
  ('Families Helped',  '200+',   'Users',  1),
  ('Volunteers',       '1,500+', 'Heart',  2),
  ('Volunteer Hours',  '10K+',   'Home',   3)
ON CONFLICT DO NOTHING;


-- ╔══════════════════════════════════════════════════════════════════════════╗
-- ║  2d. SOCIAL MEDIA LINKS                                                ║
-- ╚══════════════════════════════════════════════════════════════════════════╝

CREATE TABLE social_links (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  platform    TEXT NOT NULL,          -- e.g. 'facebook', 'instagram', 'tiktok', 'linkedin', 'twitter', 'youtube'
  url         TEXT NOT NULL,
  sort_order  INT DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT now(),
  updated_at  TIMESTAMPTZ DEFAULT now()
);

INSERT INTO social_links (platform, url, sort_order) VALUES
  ('facebook',  'https://facebook.com/dlsu.hfhgc', 1),
  ('instagram', 'https://instagram.com/habitatdlsu', 2),
  ('tiktok',    'https://www.tiktok.com/@habitatdlsu', 3),
  ('linkedin',  'https://linkedin.com/company/habitat-dlsu', 4)
ON CONFLICT DO NOTHING;


-- ╔══════════════════════════════════════════════════════════════════════════╗
-- ║  3. ABOUT PAGE                                                         ║
-- ╚══════════════════════════════════════════════════════════════════════════╝

CREATE TABLE about_page (
  id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  header_title    TEXT NOT NULL DEFAULT 'About Us',
  header_subtitle TEXT NOT NULL DEFAULT 'We are the Habitat for Humanity Green Chapter, a student organization based in De La Salle University Manila.',
  story_title     TEXT NOT NULL DEFAULT 'Our Story',
  story_body      TEXT NOT NULL DEFAULT 'Founded by passionate Lasallians, the Habitat for Humanity Green Chapter (HFHGC) serves as the university arm of Habitat for Humanity Philippines.\n\nWe believe that every family deserves a decent and safe place to live. Through volunteerism, advocacy, and fundraising, we mobilize the youth to address the housing crisis in the Philippines.\n\nOur core values are rooted in faith, community, and service. We don''t just build houses; we build homes, communities, and hope.',
  story_image_url TEXT NOT NULL DEFAULT '',
  story_image_caption TEXT NOT NULL DEFAULT 'The Green Chapter Family',
  vision_title    TEXT NOT NULL DEFAULT 'Vision',
  vision_body     TEXT NOT NULL DEFAULT '',
  vision_image_url TEXT NOT NULL DEFAULT '',
  mission_title   TEXT NOT NULL DEFAULT 'Mission',
  mission_body    TEXT NOT NULL DEFAULT '',
  mission_image_url TEXT NOT NULL DEFAULT '',
  updated_at      TIMESTAMPTZ DEFAULT now()
);

INSERT INTO about_page DEFAULT VALUES
ON CONFLICT DO NOTHING;

-- Core values
CREATE TABLE core_values (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title       TEXT NOT NULL,
  description TEXT NOT NULL,
  sort_order  INT NOT NULL DEFAULT 0,
  updated_at  TIMESTAMPTZ DEFAULT now()
);

INSERT INTO core_values (title, description, sort_order) VALUES
  ('Service',        'Selfless dedication to helping others.', 0),
  ('Community',      'Fostering strong bonds and teamwork.', 1),
  ('Sustainability', 'Creating lasting impact for the future.', 2),
  ('Empathy',        'Understanding and sharing the feelings of others.', 3)
ON CONFLICT DO NOTHING;


-- ╔══════════════════════════════════════════════════════════════════════════╗

-- ╔══════════════════════════════════════════════════════════════════════════╗
-- ║  5. BLOG  (created before projects — projects references blog_posts)   ║
-- ╚══════════════════════════════════════════════════════════════════════════╝

CREATE TABLE blog_posts (
  id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title        TEXT NOT NULL,
  slug         TEXT UNIQUE NOT NULL,
  excerpt      TEXT NOT NULL,
  content      TEXT NOT NULL,                   -- rich HTML
  author_name  TEXT NOT NULL,
  author_role  TEXT,
  category     TEXT NOT NULL DEFAULT 'General',
  tags         TEXT[] DEFAULT '{}',
  image_url    TEXT NOT NULL DEFAULT '',         -- cover image
  read_time    TEXT,                             -- e.g. '5 min read'
  is_featured  BOOLEAN NOT NULL DEFAULT false,
  is_published BOOLEAN NOT NULL DEFAULT true,
  published_at TIMESTAMPTZ DEFAULT now(),
  created_at   TIMESTAMPTZ DEFAULT now(),
  updated_at   TIMESTAMPTZ DEFAULT now()
);


-- ╔══════════════════════════════════════════════════════════════════════════╗
-- ║  6. PROJECTS PAGE  (upcoming events + completed projects)              ║
-- ╚══════════════════════════════════════════════════════════════════════════╝

CREATE TABLE projects (
  id                UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title             TEXT NOT NULL,
  description       TEXT,
  category          TEXT NOT NULL DEFAULT 'Build',   -- Build, Workshop, Fundraiser, etc.
  status            TEXT NOT NULL DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'completed')),
  image_url         TEXT NOT NULL DEFAULT '',

  -- Rich text / article fields
  cover_image_url     TEXT DEFAULT '',
  cover_image_caption TEXT DEFAULT '',
  content_json        JSONB DEFAULT '[]'::jsonb,       -- TipTap JSON
  excerpt             TEXT DEFAULT '',
  author              TEXT DEFAULT '',
  published_at        TIMESTAMPTZ,
  tags                TEXT[] DEFAULT ARRAY[]::TEXT[],

  -- Upcoming-specific fields
  event_date        DATE,
  date_display      TEXT,
  time_display      TEXT,
  location          TEXT,
  participants      TEXT,
  spots_left        INT,
  registration_link TEXT,

  -- Completed-specific fields
  completed_date    TEXT,
  blog_post_id      UUID REFERENCES blog_posts(id) ON DELETE SET NULL,

  sort_order        INT NOT NULL DEFAULT 0,
  is_visible        BOOLEAN NOT NULL DEFAULT true,
  created_at        TIMESTAMPTZ DEFAULT now(),
  updated_at        TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_published_at ON projects(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);


-- ╔══════════════════════════════════════════════════════════════════════════╗
-- ║  7. HOMIE CENTER                                                       ║
-- ╚══════════════════════════════════════════════════════════════════════════╝

-- 7a. Testimonials (carousel)
CREATE TABLE testimonials (
  id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name       TEXT NOT NULL,
  role       TEXT NOT NULL,
  quote      TEXT NOT NULL,
  photo_url  TEXT NOT NULL DEFAULT '',
  sort_order INT NOT NULL DEFAULT 0,
  is_visible BOOLEAN NOT NULL DEFAULT true,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 7b. Announcements
CREATE TABLE announcements (
  id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title      TEXT NOT NULL,
  body       TEXT NOT NULL,
  tag        TEXT NOT NULL DEFAULT 'General',     -- Event, Recruitment, Milestone, etc.
  image_url  TEXT NOT NULL DEFAULT '',
  is_visible BOOLEAN NOT NULL DEFAULT true,
  published_at TIMESTAMPTZ DEFAULT now(),
  created_at   TIMESTAMPTZ DEFAULT now(),
  updated_at   TIMESTAMPTZ DEFAULT now()
);

-- 7c. FAQs  (also used on the standalone /faq page)
CREATE TABLE faqs (
  id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  question   TEXT NOT NULL,
  answer     TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  is_visible BOOLEAN NOT NULL DEFAULT true,
  updated_at TIMESTAMPTZ DEFAULT now()
);


-- ╔══════════════════════════════════════════════════════════════════════════╗
-- ║  8. PARTNERSHIPS PAGE                                                  ║
-- ╚══════════════════════════════════════════════════════════════════════════╝

CREATE TABLE partners (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name        TEXT NOT NULL,
  description TEXT,
  is_past     BOOLEAN NOT NULL DEFAULT false,            -- false = Current Partner, true = Past Partner
  image_url   TEXT NOT NULL DEFAULT '',
  website     TEXT,
  since_year  TEXT,                                      -- e.g. '2023'
  sort_order  INT NOT NULL DEFAULT 0,
  is_visible  BOOLEAN NOT NULL DEFAULT true,
  updated_at  TIMESTAMPTZ DEFAULT now()
);

-- Partner testimonials (separate from Homie Center testimonials)
CREATE TABLE partner_testimonials (
  id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name       TEXT NOT NULL,
  title      TEXT NOT NULL,                              -- e.g. 'CEO, BuildPH Foundation'
  quote      TEXT NOT NULL,
  image_url  TEXT NOT NULL DEFAULT '',
  sort_order INT NOT NULL DEFAULT 0,
  is_visible BOOLEAN NOT NULL DEFAULT true,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Partnership benefits (Why Partner With Us section)
CREATE TABLE partnership_benefits (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title       TEXT NOT NULL,
  description TEXT NOT NULL,
  icon_name   TEXT,                                       -- lucide-react icon name (e.g., 'Heart', 'Building', 'Users', 'CheckCircle')
  sort_order  INT NOT NULL DEFAULT 0,
  is_visible  BOOLEAN NOT NULL DEFAULT true,
  updated_at  TIMESTAMPTZ DEFAULT now()
);


-- ╔══════════════════════════════════════════════════════════════════════════╗
-- ║  9. CONTACT PAGE                                                       ║
-- ╚══════════════════════════════════════════════════════════════════════════╝

-- Contact form submissions saved to the database
CREATE TABLE contact_submissions (
  id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name       TEXT NOT NULL,
  email      TEXT NOT NULL,
  subject    TEXT NOT NULL,
  message    TEXT NOT NULL,
  is_read    BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);


-- ╔══════════════════════════════════════════════════════════════════════════╗
-- ║  10. ADMIN / AUTH                                                      ║
-- ╚══════════════════════════════════════════════════════════════════════════╝

-- Uses Supabase Auth for login.  This table extends auth.users with a role.
CREATE TABLE admin_profiles (
  id         UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name  TEXT NOT NULL,
  role       TEXT NOT NULL DEFAULT 'editor' CHECK (role IN ('superadmin', 'admin', 'editor')),
  created_at TIMESTAMPTZ DEFAULT now()
);


-- ╔══════════════════════════════════════════════════════════════════════════╗
-- ║  11. SUPABASE STORAGE BUCKET                                           ║
-- ╚══════════════════════════════════════════════════════════════════════════╝

-- Create a public bucket for all website images
INSERT INTO storage.buckets (id, name, public)
VALUES ('website-images', 'website-images', true)
ON CONFLICT (id) DO NOTHING;


-- ╔══════════════════════════════════════════════════════════════════════════╗
-- ║  12. ROW LEVEL SECURITY (RLS)                                          ║
-- ╚══════════════════════════════════════════════════════════════════════════╝

-- Enable RLS on every table
ALTER TABLE site_settings        ENABLE ROW LEVEL SECURITY;
ALTER TABLE home_hero            ENABLE ROW LEVEL SECURITY;
ALTER TABLE home_cards           ENABLE ROW LEVEL SECURITY;
ALTER TABLE impact_stats         ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_links         ENABLE ROW LEVEL SECURITY;
ALTER TABLE about_page           ENABLE ROW LEVEL SECURITY;
ALTER TABLE core_values          ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects             ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts           ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials         ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements        ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs                 ENABLE ROW LEVEL SECURITY;
ALTER TABLE partners             ENABLE ROW LEVEL SECURITY;
ALTER TABLE partner_testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE partnership_benefits ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions  ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_profiles       ENABLE ROW LEVEL SECURITY;

-- ── Public read policies (anonymous + authenticated) ──────────────────────

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Public read" ON site_settings;
DROP POLICY IF EXISTS "Public read" ON home_hero;
DROP POLICY IF EXISTS "Public read" ON home_cards;
DROP POLICY IF EXISTS "Public read" ON impact_stats;
DROP POLICY IF EXISTS "Public read" ON social_links;
DROP POLICY IF EXISTS "Public read" ON about_page;
DROP POLICY IF EXISTS "Public read" ON core_values;
DROP POLICY IF EXISTS "Public read" ON projects;
DROP POLICY IF EXISTS "Public read" ON blog_posts;
DROP POLICY IF EXISTS "Public read" ON testimonials;
DROP POLICY IF EXISTS "Public read" ON announcements;
DROP POLICY IF EXISTS "Public read" ON faqs;
DROP POLICY IF EXISTS "Public read" ON partners;
DROP POLICY IF EXISTS "Public read" ON partner_testimonials;
DROP POLICY IF EXISTS "Public read" ON partnership_benefits;
DROP POLICY IF EXISTS "Anyone can submit" ON contact_submissions;
DROP POLICY IF EXISTS "Admin full access" ON site_settings;
DROP POLICY IF EXISTS "Admin update" ON site_settings;
DROP POLICY IF EXISTS "Admin insert" ON site_settings;
DROP POLICY IF EXISTS "Admin delete" ON site_settings;
DROP POLICY IF EXISTS "Admin full access" ON home_hero;
DROP POLICY IF EXISTS "Admin full access" ON home_cards;
DROP POLICY IF EXISTS "Admin full access" ON impact_stats;
DROP POLICY IF EXISTS "Admin full access" ON social_links;
DROP POLICY IF EXISTS "Admin delete" ON social_links;
DROP POLICY IF EXISTS "Admin full access" ON about_page;
DROP POLICY IF EXISTS "Admin full access" ON core_values;
DROP POLICY IF EXISTS "Admin full access" ON projects;
DROP POLICY IF EXISTS "Admin full access" ON blog_posts;
DROP POLICY IF EXISTS "Admin full access" ON testimonials;
DROP POLICY IF EXISTS "Admin full access" ON announcements;
DROP POLICY IF EXISTS "Admin full access" ON faqs;
DROP POLICY IF EXISTS "Admin full access" ON partners;
DROP POLICY IF EXISTS "Admin full access" ON partner_testimonials;
DROP POLICY IF EXISTS "Admin full access" ON partnership_benefits;
DROP POLICY IF EXISTS "Admin full access" ON contact_submissions;
DROP POLICY IF EXISTS "Admin full access" ON admin_profiles;
DROP POLICY IF EXISTS "Admin upload" ON storage.objects;
DROP POLICY IF EXISTS "Admin update" ON storage.objects;
DROP POLICY IF EXISTS "Admin delete" ON storage.objects;
DROP POLICY IF EXISTS "Public read images" ON storage.objects;

CREATE POLICY "Public read" ON site_settings        FOR SELECT USING (true);
CREATE POLICY "Public read" ON home_hero            FOR SELECT USING (true);
CREATE POLICY "Public read" ON home_cards           FOR SELECT USING (true);
CREATE POLICY "Public read" ON impact_stats         FOR SELECT USING (true);
CREATE POLICY "Public read" ON social_links         FOR SELECT USING (true);
CREATE POLICY "Public read" ON about_page           FOR SELECT USING (true);
CREATE POLICY "Public read" ON core_values          FOR SELECT USING (true);
CREATE POLICY "Public read" ON projects             FOR SELECT USING (is_visible = true);
CREATE POLICY "Public read" ON blog_posts           FOR SELECT USING (is_published = true);
CREATE POLICY "Public read" ON testimonials         FOR SELECT USING (is_visible = true);
CREATE POLICY "Public read" ON announcements        FOR SELECT USING (is_visible = true);
CREATE POLICY "Public read" ON faqs                 FOR SELECT USING (is_visible = true);
CREATE POLICY "Public read" ON partners             FOR SELECT USING (is_visible = true);
CREATE POLICY "Public read" ON partner_testimonials FOR SELECT USING (is_visible = true);
CREATE POLICY "Public read" ON partnership_benefits FOR SELECT USING (is_visible = true);

-- Contact submissions — anyone can INSERT
CREATE POLICY "Anyone can submit" ON contact_submissions FOR INSERT WITH CHECK (true);

-- ── Admin write policies (authenticated admins only) ──────────────────────

-- Helper: check if the current user is an admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM admin_profiles
    WHERE id = auth.uid()
  );
$$ LANGUAGE sql SECURITY DEFINER;

-- Admin full access on every content table
CREATE POLICY "Admin full access" ON site_settings        FOR ALL USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "Admin update"      ON site_settings        FOR UPDATE USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "Admin insert"      ON site_settings        FOR INSERT WITH CHECK (is_admin());
CREATE POLICY "Admin delete"      ON site_settings        FOR DELETE USING (is_admin());
CREATE POLICY "Admin full access" ON home_hero            FOR ALL USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "Admin full access" ON home_cards           FOR ALL USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "Admin full access" ON impact_stats         FOR ALL USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "Admin full access" ON social_links         FOR ALL USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "Admin delete"      ON social_links         FOR DELETE USING (is_admin());
CREATE POLICY "Admin full access" ON about_page           FOR ALL USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "Admin full access" ON core_values          FOR ALL USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "Admin full access" ON projects             FOR ALL USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "Admin full access" ON blog_posts           FOR ALL USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "Admin full access" ON testimonials         FOR ALL USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "Admin full access" ON announcements        FOR ALL USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "Admin full access" ON faqs                 FOR ALL USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "Admin full access" ON partners             FOR ALL USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "Admin full access" ON partner_testimonials FOR ALL USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "Admin full access" ON partnership_benefits FOR ALL USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "Admin full access" ON contact_submissions  FOR ALL USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "Admin full access" ON admin_profiles       FOR ALL USING (is_admin()) WITH CHECK (is_admin());

-- Storage policy: admins can upload to the website-images bucket
CREATE POLICY "Admin upload" ON storage.objects
  FOR INSERT
  WITH CHECK (bucket_id = 'website-images' AND is_admin());

CREATE POLICY "Admin update" ON storage.objects
  FOR UPDATE
  USING (bucket_id = 'website-images' AND is_admin());

CREATE POLICY "Admin delete" ON storage.objects
  FOR DELETE
  USING (bucket_id = 'website-images' AND is_admin());

CREATE POLICY "Public read images" ON storage.objects
  FOR SELECT
  USING (bucket_id = 'website-images');


-- ╔══════════════════════════════════════════════════════════════════════════╗
-- ║  13. AUTO-UPDATE updated_at TRIGGER                                    ║
-- ╚══════════════════════════════════════════════════════════════════════════╝

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to every table that has updated_at
DO $$
DECLARE
  tbl TEXT;
BEGIN
  FOREACH tbl IN ARRAY ARRAY[
    'site_settings', 'home_hero', 'home_cards', 'impact_stats', 'social_links',
    'about_page', 'core_values',
    'projects', 'blog_posts', 'testimonials', 'announcements', 'faqs',
    'partners', 'partner_testimonials', 'partnership_benefits'
  ] LOOP
    EXECUTE format(
      'CREATE TRIGGER set_updated_at BEFORE UPDATE ON %I FOR EACH ROW EXECUTE FUNCTION update_updated_at();',
      tbl
    );
  END LOOP;
END $$;
