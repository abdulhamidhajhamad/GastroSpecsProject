export interface NavItem {
  label: string
  href: string
}

export interface FooterGroup {
  title: string
  links: NavItem[]
}

export interface SocialLink {
  label: string
  href: string
  platform: 'facebook' | 'x' | 'instagram'
}

export const SITE_CONFIG = {
  name: 'GastroSpecs',
  description:
    'Global leaders in commercial kitchen procurement and engineering services.',
  localeLabel: 'AR / En',
  quoteCta: {
    label: 'Request Quote',
    href: '/contact',
  },
} as const

export const NAV_ITEMS: NavItem[] = [
  { label: 'Catalog', href: '/catalog' },
  { label: 'Services', href: '/services' },
  { label: 'Projects', href: '/projects' },
  { label: 'About', href: '/about' },
]

export const FOOTER_GROUPS: FooterGroup[] = [
  {
    title: 'Catalog',
    links: [
      { label: 'Heavy Cooking', href: '/catalog/heavy-cooking' },
      { label: 'Refrigeration', href: '/catalog/refrigeration' },
      { label: 'Food Prep', href: '/catalog/food-prep' },
      { label: 'Dishwashing', href: '/catalog/dishwashing' },
    ],
  },
  {
    title: 'Services',
    links: [
      { label: 'Kitchen Design', href: '/services/kitchen-design' },
      { label: 'Sourcing', href: '/services/sourcing' },
      { label: 'DDP Logistics', href: '/services/ddp-logistics' },
      { label: 'After Sales', href: '/services/after-sales' },
    ],
  },
]

export const FOOTER_LEGAL_LINKS: NavItem[] = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Contact Sales', href: '/contact' },
]

export const SOCIAL_LINKS: SocialLink[] = [
  { label: 'Facebook', href: '#', platform: 'facebook' },
  { label: 'X (Twitter)', href: '#', platform: 'x' },
  { label: 'Instagram', href: '#', platform: 'instagram' },
]

export const HOME_HERO = {
  badge: 'Heavy Site M&R',
  headingPrefix: 'Engineering',
  headingEmphasis: 'Excellence',
  headingSuffix: 'in Every Kitchen.',
  description: SITE_CONFIG.description,
  primaryCta: { label: 'Browse Catalog', href: '/catalog' },
  secondaryCta: { label: 'Our Services', href: '/services' },
  image: {
    src: '/images/vulcan_master_series.png',
    alt: 'Vulcan Master Series modular commercial kitchen equipment',
    width: 680,
    height: 420,
  },
} as const

export const HOME_STATS = [
  { icon: 'coverage', value: '45+', label: 'Countries Covered' },
  { icon: 'awards', value: '12', label: 'Design Awards' },
  { icon: 'items', value: '10k+', label: 'Items Sourced' },
] as const

export const HOME_SOLUTIONS = [
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
] as const

export const HOME_FEATURED_PRODUCT = {
  category: 'Heavy Cooking',
  title: 'Master Series',
  tags: ['Dual Burner', 'Modular Design', 'Cast Iron'],
  href: '',
  ctaLabel: '',
  image: {
    src: '/images/vulcan_master_series.png',
    alt: 'Master Series modular stainless steel commercial kitchen equipment suite',
    width: 680,
    height: 420,
  },
} as const

export const HOME_PROJECTS = [
  {
    image: '/images/project_obsidian_grill.png',
    category: 'Project',
    title: 'The Obsidian Grill',
    href: '/projects/obsidian-grill-fine-dining',
  },
  {
    image: '/images/project_global_tech_hq.png',
    category: 'Project',
    title: 'Global Tech HQ',
    href: '/projects/global-tech-hq-exclusive-dining',
  },
  {
    image: '/images/hero_kitchen_pano.png',
    category: 'Project',
    title: 'Skyline Culinary Lab',
    href: '/projects/culinary-academy-innovation-lab',
  },
] as const

export const HOME_CTA = {
  title: 'Ready to start your next project?',
  description: 'Our engineering team is standing by to provide a custom quote.',
  primaryCta: {
    label: 'Get a Custom Quote',
    href: '/contact',
  },
  whatsappHref: 'https://wa.me/1234567890',
} as const
