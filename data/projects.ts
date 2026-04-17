import type { Project } from '@/types'

export const projects: Project[] = [
  {
    slug: 'obsidian-grill-fine-dining',
    category: 'FINE DINING',
    location: 'Dubai Marina',
    title: 'The Obsidian Grill — Fine Dining Concept',
    description:
      'Full kitchen consultancy and equipment procurement for a 220-cover fine-dining restaurant. Designed around an open theater kitchen concept with live fire cooking stations.',
    image: '/images/project_obsidian_grill.png',
    tags: ['Kitchen Design', 'Sourcing', 'DDP'],
    budget: '$280,000',
    scope: 'Full Turnkey',
    year: '2024',
  },
  {
    slug: 'grand-horizon-hotel-banquet',
    category: 'HOTELS',
    location: 'Riyadh, KSA',
    title: 'Grand Horizon Hotel Banquet Facility',
    description:
      'Banquet kitchen for a 1,800-cover convention center. Included 12 combi ovens, 3 hot holding lines, and a full cold production room.',
    image: '/images/project_global_tech_hq.png',
    tags: ['Banquet', 'Cold Room', 'DDP Logistics'],
    budget: '$1,200,000',
    scope: 'Full Turnkey',
    year: '2024',
  },
  {
    slug: 'global-tech-hq-exclusive-dining',
    category: 'CORPORATE',
    location: 'Abu Dhabi',
    title: 'Global Tech HQ — Exclusive Dining',
    description:
      'Corporate executive dining kitchen serving 340 covers daily. Designed for efficiency with a focus on health-forward cooking techniques.',
    image: '/images/hero_kitchen_pano.png',
    tags: ['Corporate', 'Kitchen Design', 'Sourcing'],
    budget: '$145,000',
    scope: 'Equipment + Design',
    year: '2023',
  },
  {
    slug: 'culinary-academy-innovation-lab',
    category: 'HOSPITALITY',
    location: 'Amman, Jordan',
    title: 'Culinary Academy Innovation Lab',
    description:
      'State-of-the-art culinary training facility with 24 individual training stations plus a full demonstration theater kitchen.',
    image: '/images/project_obsidian_grill.png',
    tags: ['Education', 'Multi-Station', 'DDP'],
    budget: '$380,000',
    scope: 'Full Turnkey',
    year: '2023',
  },
  {
    slug: 'azure-marine-yacht-club',
    category: 'DINING',
    location: 'Muscat, Oman',
    title: 'Azure Marine Yacht Club',
    description:
      'Compact high-output kitchen for a premium marina dining venue. Space-optimized layout handling 280 covers from 48 square meters of kitchen space.',
    image: '/images/project_global_tech_hq.png',
    tags: ['Space Optimization', 'Sourcing'],
    budget: '$92,000',
    scope: 'Equipment + Design',
    year: '2023',
  },
  {
    slug: 'heritage-brasserie-expansion',
    category: 'DINING',
    location: 'Cairo, Egypt',
    title: 'Heritage Brasserie Expansion',
    description:
      'Kitchen expansion and equipment upgrade for a heritage brasserie group scaling to three additional locations across Cairo.',
    image: '/images/hero_kitchen_pano.png',
    tags: ['Multi-Site', 'Sourcing', 'After-Sales'],
    budget: '$210,000',
    scope: 'Multi-Site Rollout',
    year: '2022',
  },
]

export const caseStudies = projects

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug)
}
