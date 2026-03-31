-- ============================================================================
-- HFHGC Website — Schema Modifications
-- ============================================================================
-- All schema changes after the initial schema.sql go here.
-- Run this in the Supabase SQL Editor after schema.sql and populate.sql.
-- ============================================================================

-- ============================================================================
-- Projects Rich Text Editor Enhancement
-- ============================================================================
-- Enhances the projects table to support rich text content with images

-- Make description column nullable since we're using excerpt and rich text content now
ALTER TABLE projects 
  ALTER COLUMN description DROP NOT NULL;

-- Add new columns to projects table for rich text content
ALTER TABLE projects 
  ADD COLUMN IF NOT EXISTS cover_image_url TEXT DEFAULT '',
  ADD COLUMN IF NOT EXISTS cover_image_caption TEXT DEFAULT '',
  ADD COLUMN IF NOT EXISTS content_json JSONB DEFAULT '[]'::jsonb,  -- Rich text editor content (TipTap JSON)
  ADD COLUMN IF NOT EXISTS excerpt TEXT DEFAULT '',  -- Short summary for listings
  ADD COLUMN IF NOT EXISTS author TEXT DEFAULT '',  -- Who created/wrote the project
  ADD COLUMN IF NOT EXISTS published_at TIMESTAMPTZ,  -- When it was published
  ADD COLUMN IF NOT EXISTS tags TEXT[] DEFAULT ARRAY[]::TEXT[];  -- Project tags/keywords

-- Update existing projects to use cover_image_url from image_url
UPDATE projects SET cover_image_url = image_url WHERE cover_image_url = '';

-- Add index for better query performance
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_published_at ON projects(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);

-- Add comment for documentation
COMMENT ON COLUMN projects.content_json IS 'Rich text editor content stored as TipTap JSON format';
COMMENT ON COLUMN projects.cover_image_url IS 'Main cover image for the project article';
COMMENT ON COLUMN projects.excerpt IS 'Short summary/preview text for project listings';
