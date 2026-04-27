import type { Project } from '@/types'

export const projects: Project[] = [
  {
    slug: 'obsidian-grill-fine-dining',
    category: 'Retail & Supermarkets',
    location: 'Dubai, UAE',
    title: 'Obsidian Grill — Fine Dining Fitout',
    description:
      'Full turnkey kitchen engineering and equipment supply for a high-end fine dining concept, including ventilation, bespoke stainless fabrication and commissioning.',
    image: '/images/pic1.jpeg',
    tags: ['fine-dining', 'ventilation', 'stainless'],
    budget: '$120k',
    scope: 'Design, supply, install, commission',
    year: '2023',
  },
  {
    slug: 'global-tech-hq-exclusive-dining',
    category: 'Enterprise Kitchens',
    location: 'San Francisco, USA',
    title: 'Global Tech HQ — Exclusive Dining',
    description:
      'Large-scale staff dining kitchens and back-of-house fitout for an enterprise headquarters, optimised for high throughput and low maintenance.',
    image: '/images/pic2.jpeg',
    tags: ['enterprise', 'high-volume', 'procurement'],
    budget: '$450k',
    scope: 'Design & equipment procurement',
    year: '2022',
  },
  {
    slug: 'culinary-academy-innovation-lab',
    category: 'Café & Bakery',
    location: 'London, UK',
    title: 'Culinary Academy — Innovation Lab',
    description:
      'Teaching kitchens and R&D culinary lab for a hospitality academy, including specialised bake ovens and demonstration counters.',
    image: '/images/pic3.jpeg',
    tags: ['academy', 'training', 'R&D'],
    budget: '$85k',
    scope: 'Equipment supply & install',
    year: '2021',
  },
  {
    slug: 'grand-horizon-hotel-banquet',
    category: 'Hotels & Banquets',
    location: 'Manila, Philippines',
    title: 'Grand Horizon — Hotel Banquet Kitchen',
    description:
      'Comprehensive kitchen design and installation for a large hotel banquet facility, including cookline, refrigeration and service staging.',
    image: '/images/pic4.jpeg',
    tags: ['hotel', 'banquet', 'cookline'],
    budget: '$320k',
    scope: 'Design, supply, install',
    year: '2020',
  },
]

export const caseStudies = projects

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug)
}
