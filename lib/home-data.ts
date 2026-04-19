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
    href: '/contact',
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
    src: '/images/land1.jpeg',
    alt: 'Commercial Kitchen Layout',
    width: 1200,
    height: 900,
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
    value: 'Worldwide',
    label: 'Global Shipping',
  },
  {
    icon: 'awards',
    value: 'Expert',
    label: 'Kitchen Design',
  },
  {
    icon: 'items',
    value: '500+',
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
    src: '/images/vulcan_master_series.png',
    alt: 'Vulcan Master Series modular stainless steel commercial kitchen equipment suite',
    width: 680,
    height: 420,
  },
} as const

export type ProjectItem = {
  image: string
  category: string
  title: string
  description?: string
  href: string
}

export const projects: ProjectItem[] = [
  {
    image: '/images/pic1.jpeg',
    category: 'Retail & Supermarkets',
    title: 'Commercial Refrigeration',
    description: 'We supply and install complete cooling setups, from heavy-duty walk-in freezers to sleek, multi-deck display units for every supermarket department.',
    href: '/projects/obsidian-grill-fine-dining',
  },
  {
    image: '/images/pic2.jpeg',
    category: 'Enterprise Kitchens',
    title: 'Hotels & Mega Kitchens',
    description: 'Built for peak volume. We design and fully equip industrial-grade kitchens tailored for luxury hotels, resorts, and large-scale catering facilities.',
    href: '/projects/global-tech-hq-exclusive-dining',
  },
  {
    image: '/images/pic3.jpeg',
    category: 'Café & Bakery',
    title: 'Coffee Shops & Bakeries',
    description: 'From precision baking ovens to stunning pastry display cases, we source everything you need to bring your artisanal café or bakery concept to life.',
    href: '/projects/culinary-academy-innovation-lab',
  },
]

export const ctaSection = {
  title: 'Ready to start your next project?',
  description: 'Our engineering team is standing by to provide a custom quote.',
  primaryCta: {
    label: 'Get a Custom Quote',
    href: '/contact',
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
