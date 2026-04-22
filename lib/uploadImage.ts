import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function uploadCategoryImage(
  file: File,
  path: 'parents' | 'subs',
  id: string
): Promise<string> {
  // Validate file type
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
  if (!allowedTypes.includes(file.type)) {
    throw new Error('Invalid file type: Only JPEG, PNG, and WebP images are allowed.')
  }

  // Validate file size (max 2MB)
  const maxSizeBytes = 2 * 1024 * 1024
  if (file.size > maxSizeBytes) {
    throw new Error('File is too large: Maximum file size is 2MB.')
  }

  // Generate unique filename with timestamp
  const timestamp = Date.now()
  const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
  const fileName = `${id}-${timestamp}-${safeName}`
  const filePath = `${path}/${id}/${fileName}`

  // Upload to Supabase Storage
  const { data, error } = await supabase.storage
    .from('category-images')
    .upload(filePath, file)

  if (error) {
    throw new Error(`Failed to upload image: ${error.message}`)
  }

  // Retrieve public URL
  const { data: { publicUrl } } = supabase.storage
    .from('category-images')
    .getPublicUrl(data.path)

  return publicUrl
}
