import { z } from 'zod'

export const contactCategoryValues = [
  'Fine Dining',
  'Quick Service',
  'Hospitality',
  'Central Kitchen',
] as const

const contactCategorySchema = z.enum(contactCategoryValues)

export const contactRequestSchema = z.object({
  fullName: z.string().trim().min(2, 'Full name is required.').max(120),
  company: z.string().trim().max(120).optional(),
  email: z.string().trim().email('Please provide a valid email address.'),
  phone: z.string().trim().max(32).optional(),
  scope: z.string().trim().max(4000).optional(),
  categories: z.array(contactCategorySchema).max(contactCategoryValues.length),
  consent: z.boolean().refine((value) => value, {
    message: 'You must accept the privacy policy.',
  }),
})

export type ContactRequestInput = z.infer<typeof contactRequestSchema>

export function parseContactFormData(formData: FormData) {
  const categorySet = new Set(
    formData
      .getAll('category')
      .map((value) => value.toString().trim())
      .filter((value) => contactCategoryValues.includes(value as (typeof contactCategoryValues)[number]))
  )

  return contactRequestSchema.safeParse({
    fullName: formData.get('fullName')?.toString() ?? '',
    company: formData.get('company')?.toString(),
    email: formData.get('email')?.toString() ?? '',
    phone: formData.get('phone')?.toString(),
    scope: formData.get('scope')?.toString(),
    categories: Array.from(categorySet),
    consent: formData.get('consent') === 'on' || formData.get('consent') === 'true',
  })
}

export const portalLoginSchema = z.object({
  email: z.string().trim().email('Invalid staff email.'),
  password: z.string().min(8, 'Password must be at least 8 characters.'),
  next: z
    .string()
    .trim()
    .optional()
    .transform((value) => {
      if (!value) {
        return undefined
      }

      return value.startsWith('/portal/') && value !== '/portal/login' ? value : undefined
    }),
})

export type PortalLoginInput = z.infer<typeof portalLoginSchema>
