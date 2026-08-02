'use client';

import { supabase } from '@/lib/supabase-client';

export type UploadResult = {
  path: string;
  url: string;
  error?: string;
};

const ALLOWED_TYPES: Record<string, string[]> = {
  logos: ['image/png', 'image/svg+xml', 'image/webp'],
  favicons: ['image/x-icon', 'image/png', 'image/svg+xml'],
  blog: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
  tools: ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'],
};

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export function validateFile(file: File, folder: keyof typeof ALLOWED_TYPES): string | null {
  const allowed = ALLOWED_TYPES[folder];
  if (!allowed) return 'Invalid upload folder.';
  if (!allowed.includes(file.type)) {
    return `File type ${file.type} is not allowed for ${folder}. Allowed: ${allowed.join(', ')}`;
  }
  if (file.size > MAX_FILE_SIZE) {
    return `File is too large. Maximum size is 5MB.`;
  }
  return null;
}

export async function uploadAdminAsset(file: File, folder: string): Promise<UploadResult> {
  const validationError = validateFile(file, folder);
  if (validationError) {
    return { path: '', url: '', error: validationError };
  }

  const ext = file.name.split('.').pop() ?? 'png';
  const filename = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

  const { error } = await supabase.storage
    .from('admin-assets')
    .upload(filename, file, { cacheControl: '3600', upsert: false });

  if (error) {
    return { path: '', url: '', error: error.message };
  }

  const { data: urlData } = supabase.storage.from('admin-assets').getPublicUrl(filename);
  return { path: filename, url: urlData.publicUrl };
}

export async function deleteAdminAsset(path: string): Promise<{ error?: string }> {
  const { error } = await supabase.storage.from('admin-assets').remove([path]);
  if (error) return { error: error.message };
  return {};
}
