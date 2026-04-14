export type Service = {
  id: string
  number: string
  title: string
  subtitle: string
  description: string
  features: string[]
}

export const services: Service[] = [
  {
    id: 'sourcing',
    number: '01',
    title: 'Strategic Equipment Sourcing',
    subtitle: 'SOURCING',
    description:
      'We go beyond standard catalogs. Our procurement specialists leverage direct relationships with top-tier brands like Rational, MKN, and Winterhalter to secure competitive pricing and find the best fit for your project.',
    features: [
      'MANUFACTURER-DIRECT PRICING',
      'CUSTOM SPEC PROCUREMENT',
      'GLOBAL WARRANTY MANAGEMENT',
      'SPARE PARTS STRATEGY',
    ],
  },
  {
    id: 'design',
    number: '02',
    title: 'Kitchen Engineering & CAD',
    subtitle: 'ENGINEERING',
    description:
      'A high-performance kitchen starts with a blueprint that respects the Chef\'s workflow. We design with ergonomics in mind, reducing steps for staff and optimizing high-activity layout for every peak service hour.',
    features: [
      'BIM/REVIT MODELLING',
      'HALF-FLOOR CALCULATION',
      'VENTILATION ASSESSMENT',
      'FIRE SUPPRESSION COORDINATION',
    ],
  },
  {
    id: 'logistics',
    number: '03',
    title: 'DDP Worldwide Logistics',
    subtitle: 'LOGISTICS',
    description:
      'Delivered Duty Paid means we handle every step — from factory order through shipping, customs clearance, import duties, and last-mile delivery. Your equipment arrives at your door, fully cleared.',
    features: [
      'FULL CUSTOMS MANAGEMENT',
      'MULTI-PORT CONSOLIDATION',
      'LIVE SHIPMENT TRACKING',
      'INSURANCE COVERAGE',
    ],
  },
  {
    id: 'after-sales',
    number: '04',
    title: 'After-Sales & Technical Support',
    subtitle: 'SUPPORT',
    description:
      'Our responsibility does not end at delivery. We maintain a network of certified technicians in key markets who provide commissioning, training, and ongoing maintenance contracts.',
    features: [
      'ON-SITE COMMISSIONING',
      'STAFF TRAINING PROGRAMS',
      'PREVENTIVE MAINTENANCE',
      'SPARE PARTS SUPPLY CHAIN',
    ],
  },
]

export const processSteps = [
  { number: '01', label: 'BRIEF & SURVEY' },
  { number: '02', label: 'TECHNICAL ANALYSIS' },
  { number: '03', label: 'GLOBAL SOURCING' },
  { number: '04', label: 'LOGISTICS & SHIPS' },
  { number: '05', label: 'INSTALLATION' },
]
