export type LinkItem = {
  label: string
  href: string
}

export const siteConfig = {
  name: 'GastroSpecs',
  description:
    'Global leaders in commercial kitchen procurement and engineering services.',
  localeLabel: 'AR / En',
  quoteCta: {
    label: 'Request Quote',
    href: '/quote',
  },
} as const

export const mainNavigation: LinkItem[] = [
  { label: 'Catalog', href: '/catalog' },
  { label: 'Services', href: '/services' },
  { label: 'Projects', href: '/projects' },
  { label: 'About', href: '/about' },
]

export const heroContent = {
  badge: 'Heavy Site M&R',
  headingPrefix: 'Engineering',
  headingEmphasis: 'Excellence',
  headingSuffix: 'in Every Kitchen.',
  description: siteConfig.description,
  primaryCta: {
    label: 'Browse Catalog',
    href: '/catalog',
  },
  secondaryCta: {
    label: 'Our Services',
    href: '/services',
  },
  image: {
    src: '/assets/vulcan_master_series.png',
    alt: 'Vulcan Master Series modular commercial kitchen equipment',
    width: 680,
    height: 420,
  },
} as const

export type StatIcon = 'coverage' | 'awards' | 'items'

export type StatItem = {
  icon: StatIcon
  value: string
  label: string
}

export const stats: StatItem[] = [
  {
    icon: 'coverage',
    value: '45+',
    label: 'Countries Covered',
  },
  {
    icon: 'awards',
    value: '12',
    label: 'Design Awards',
  },
  {
    icon: 'items',
    value: '10k+',
    label: 'Items Sourced',
  },
]

export type SolutionIcon = 'sourcing' | 'logistics' | 'engineering'

export type SolutionItem = {
  icon: SolutionIcon
  number: string
  title: string
  description: string
}

export const solutions: SolutionItem[] = [
  {
    icon: 'sourcing',
    number: '01',
    title: 'GLOBAL SOURCING',
    description:
      'Global leaders in commercial kitchen procurement and engineering services.',
  },
  {
    icon: 'logistics',
    number: '02',
    title: 'DDP LOGISTICS',
    description:
      'Turnkey and door-paid shipping directly to anywhere in the world.',
  },
  {
    icon: 'engineering',
    number: '03',
    title: 'KITCHEN ENGINEERING',
    description:
      'From technical plans to execution support across complex kitchen builds.',
  },
]

export const featuredProduct = {
  category: 'Heavy Cooking',
  title: 'Vulcan Master Series',
  tags: ['Dual Burner', 'Modular Design', 'Cast Iron'],
  href: '/catalog/vulcan-master-series',
  ctaLabel: 'View Specifications',
  image: {
    src: '/assets/vulcan_master_series.png',
    alt: 'Vulcan Master Series modular stainless steel commercial kitchen equipment suite',
    width: 680,
    height: 420,
  },
} as const

export type ProjectItem = {
  image: string
  category: string
  title: string
  href: string
}

export const projects: ProjectItem[] = [
  {
    image: '/assets/project_obsidian_grill.png',
    category: 'Project',
    title: 'The Obsidian Grill',
    href: '/projects/obsidian-grill',
  },
  {
    image: '/assets/project_global_tech_hq.png',
    category: 'Project',
    title: 'Global Tech HQ',
    href: '/projects/global-tech-hq',
  },
  {
    image: '/assets/hero_kitchen_pano.png',
    category: 'Project',
    title: 'Skyline Culinary Lab',
    href: '/projects/skyline-culinary-lab',
  },
]

export const ctaSection = {
  title: 'Ready to start your next project?',
  description: 'Our engineering team is standing by to provide a custom quote.',
  primaryCta: {
    label: 'Get a Custom Quote',
    href: '/quote',
  },
  whatsappHref: 'https://wa.me/1234567890',
} as const

export type SocialPlatform = 'facebook' | 'x' | 'instagram'

export type SocialLinkItem = {
  label: string
  href: string
  platform: SocialPlatform
}

export const socialLinks: SocialLinkItem[] = [
  {
    label: 'Facebook',
    href: '#',
    platform: 'facebook',
  },
  {
    label: 'X (Twitter)',
    href: '#',
    platform: 'x',
  },
  {
    label: 'Instagram',
    href: '#',
    platform: 'instagram',
  },
]

export const footerCatalogLinks: LinkItem[] = [
  { label: 'Heavy Cooking', href: '/catalog/heavy-cooking' },
  { label: 'Refrigeration', href: '/catalog/refrigeration' },
  { label: 'Food Prep', href: '/catalog/food-prep' },
  { label: 'Dishwashing', href: '/catalog/dishwashing' },
]

export const footerServicesLinks: LinkItem[] = [
  { label: 'Kitchen Design', href: '/services/kitchen-design' },
  { label: 'Sourcing', href: '/services/sourcing' },
  { label: 'DDP Logistics', href: '/services/ddp-logistics' },
  { label: 'After Sales', href: '/services/after-sales' },
]

export const footerLegalLinks: LinkItem[] = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Contact Sales', href: '/contact' },
]
