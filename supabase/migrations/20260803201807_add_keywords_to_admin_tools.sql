-- Add keywords column for search indexing
ALTER TABLE admin_tools
  ADD COLUMN IF NOT EXISTS keywords text[] DEFAULT ARRAY[]::text[];

-- Allow anon to read keywords (needed for public search)
-- The existing anon_select_ad_settings-style policy already grants SELECT on admin_tools
-- but we need to make sure anon can read the keywords column specifically.
-- Since the existing policy grants SELECT on all columns, no additional policy needed.

-- Backfill keywords from category for existing tools (basic seed)
UPDATE admin_tools
  SET keywords = ARRAY[category]
  WHERE keywords = ARRAY[]::text[];
