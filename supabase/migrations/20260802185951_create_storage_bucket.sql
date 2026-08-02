/*
# Create admin-assets storage bucket

## Overview
Creates a private storage bucket for admin-uploaded assets:
- Logos
- Favicons
- Blog post featured images
- Tool images

## Security
- Bucket is private (not public)
- Only authenticated users can upload/read/delete
- Files organized by subfolder: logos/, favicons/, blog/, tools/
*/

INSERT INTO storage.buckets (id, name, public)
VALUES ('admin-assets', 'admin-assets', false)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for admin-assets bucket
DROP POLICY IF EXISTS "admin_assets_read" ON storage.objects;
CREATE POLICY "admin_assets_read" ON storage.objects FOR SELECT
  TO authenticated
  USING (bucket_id = 'admin-assets');

DROP POLICY IF EXISTS "admin_assets_upload" ON storage.objects;
CREATE POLICY "admin_assets_upload" ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'admin-assets');

DROP POLICY IF EXISTS "admin_assets_update" ON storage.objects;
CREATE POLICY "admin_assets_update" ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'admin-assets')
  WITH CHECK (bucket_id = 'admin-assets');

DROP POLICY IF EXISTS "admin_assets_delete" ON storage.objects;
CREATE POLICY "admin_assets_delete" ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'admin-assets');
