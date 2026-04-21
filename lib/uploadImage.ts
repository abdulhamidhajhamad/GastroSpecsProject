import { createClient } from '@supabase/supabase-js';

export async function uploadCategoryImage(
  file: File,
  categoryId: string
): Promise<string> {
  const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
  const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error('Invalid file type. Only JPEG, PNG, and WebP are allowed.');
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new Error('File size exceeds the 2MB limit.');
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase configuration is missing in environment variables.');
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  const timestamp = Date.now();
  const safeFilename = file.name.replace(/[^a-zA-Z0-9.]/g, '_');
  const filePath = `categories/${categoryId}/${timestamp}-${safeFilename}`;

  const { data, error } = await supabase.storage
    .from('category-images')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) {
    throw new Error(`Failed to upload image: ${error.message}`);
  }

  const { data: publicUrlData } = supabase.storage
    .from('category-images')
    .getPublicUrl(data.path);

  if (!publicUrlData.publicUrl) {
    throw new Error('Failed to retrieve public URL for the uploaded image.');
  }

  return publicUrlData.publicUrl;
}
