import { createClient } from '@supabase/supabase-js'

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp']

let supabaseClient: ReturnType<typeof createClient> | null = null

function getSupabaseClient() {
  if (supabaseClient) {
    return supabaseClient
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl) {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL environment variable.')
  }

  if (!supabaseAnonKey) {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable.')
  }

  try {
    const parsedUrl = new URL(supabaseUrl)
    if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') {
      throw new Error('invalid protocol')
    }
  } catch {
    throw new Error('Invalid NEXT_PUBLIC_SUPABASE_URL. Must be a valid HTTP or HTTPS URL.')
  }

  supabaseClient = createClient(supabaseUrl, supabaseAnonKey)
  return supabaseClient
}

function validateImageFile(file: File) {
  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    throw new Error('Invalid file type. Only JPEG, PNG, and WebP images are allowed.')
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    throw new Error('File is too large. Maximum file size is 5MB.')
  }
}

function sanitizeFileName(fileName: string) {
  return fileName.replace(/[^a-zA-Z0-9.-]/g, '_')
}

function buildFileName(file: File) {
  const timestamp = Date.now()
  return `${timestamp}-${sanitizeFileName(file.name)}`
}

async function uploadImageToBucket(bucket: string, filePath: string, file: File) {
  const supabase = getSupabaseClient()
  const { data, error } = await supabase.storage.from(bucket).upload(filePath, file)

  if (error) {
    throw new Error(`Failed to upload image. ${error.message}`)
  }

  const { data: publicData } = supabase.storage.from(bucket).getPublicUrl(data.path)
  return publicData.publicUrl
}

export async function uploadCategoryImage(file: File, path: 'parents' | 'subs', id: string): Promise<string> {
  validateImageFile(file)

  const fileName = buildFileName(file)
  const filePath = `${path}/${id}/${fileName}`

  return uploadImageToBucket('category-images', filePath, file)
}

export async function uploadMachineImage(file: File, machineId: string): Promise<string> {
  validateImageFile(file)

  const fileName = buildFileName(file)
  const filePath = `machines/${machineId}/${fileName}`

  return uploadImageToBucket('machines-gallery', filePath, file)
}
