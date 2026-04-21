import { Machine } from '@/types/machine'

export const mockMachines: Machine[] = [
  {
    id: 'mach_1a2b3c',
    categoryId: 'cat_prep_01',
    categoryName: 'Food Preparation',
    name: 'Heavy Duty Meat Grinder 32',
    specifications: {
      'Power': '1.5kW',
      'Voltage': '220V/50Hz',
      'Capacity': '300kg/h',
      'Material': 'Stainless Steel 304',
      'Dimensions': '530x290x500mm'
    },
    notes: 'Includes multiple grinding plates and sausage stuffing tubes.',
    images: [
      { id: 'img_1a1', machineId: 'mach_1a2b3c', url: 'https://placehold.co/600x400', isPrimary: true, order: 1 },
      { id: 'img_1a2', machineId: 'mach_1a2b3c', url: 'https://placehold.co/600x400', isPrimary: false, order: 2 }
    ],
    machineSuppliers: [
      {
        id: 'ms_1a1',
        machineId: 'mach_1a2b3c',
        supplierId: 'sup_b72c9f14',
        supplierName: 'Ningbo BlueWave Foodservice Technology Co., Ltd.',
        costPrice: 245.00,
        moq: 10,
        leadTimeDays: 15,
        modelNumber: 'BW-MG32',
        qualityNotes: 'CE certified engine, very durable.',
        createdAt: '2025-11-20T10:00:00.000Z'
      },
      {
        id: 'ms_1a2',
        machineId: 'mach_1a2b3c',
        supplierId: 'sup_3d9b7e21',
        supplierName: 'Shandong Huaxin Heavy Kitchen Equipment Co., Ltd.',
        costPrice: 230.00,
        moq: 20,
        leadTimeDays: 20,
        modelNumber: 'HX-MG32E',
        createdAt: '2025-11-21T11:00:00.000Z'
      }
    ],
    createdAt: '2025-11-15T09:00:00.000Z'
  },
  {
    id: 'mach_2b3c4d',
    categoryId: 'cat_prep_02',
    categoryName: 'Food Preparation',
    name: '30L Planetary Dough Mixer',
    specifications: {
      'Bowl Capacity': '30L',
      'Flour Capacity': '12.5kg',
      'Power': '1.1kW',
      'Voltage': '220V/50Hz',
      'Speed Levels': '3 Speeds (105/180/408 RPM)',
      'Dimensions': '545x440x882mm'
    },
    notes: 'Comes with dough hook, flat beater, and wire whip.',
    images: [
      { id: 'img_2b1', machineId: 'mach_2b3c4d', url: 'https://placehold.co/600x400', isPrimary: true, order: 1 },
      { id: 'img_2b2', machineId: 'mach_2b3c4d', url: 'https://placehold.co/600x400', isPrimary: false, order: 2 },
      { id: 'img_2b3', machineId: 'mach_2b3c4d', url: 'https://placehold.co/600x400', isPrimary: false, order: 3 }
    ],
    machineSuppliers: [
      {
        id: 'ms_2b1',
        machineId: 'mach_2b3c4d',
        supplierId: 'sup_c51e6a83',
        supplierName: 'Foshan Titan Thermal Equipment Co., Ltd.',
        costPrice: 380.00,
        moq: 5,
        leadTimeDays: 25,
        modelNumber: 'TT-B30',
        qualityNotes: 'Belt-driven, very quiet operation.',
        createdAt: '2025-10-05T08:30:00.000Z'
      },
      {
        id: 'ms_2b2',
        machineId: 'mach_2b3c4d',
        supplierId: 'sup_b72c9f14',
        supplierName: 'Ningbo BlueWave Foodservice Technology Co., Ltd.',
        costPrice: 355.00,
        moq: 10,
        leadTimeDays: 15,
        modelNumber: 'BW-MIX30',
        createdAt: '2025-10-06T09:15:00.000Z'
      }
    ],
    createdAt: '2025-10-01T12:00:00.000Z'
  },
  {
    id: 'mach_3c4d5e',
    categoryId: 'cat_cook_01',
    categoryName: 'Cooking Equipment',
    name: '10-Tray Electric Combi Steam Oven',
    specifications: {
      'Capacity': '10 x GN 1/1 Trays',
      'Power': '18.5kW',
      'Voltage': '380V/50Hz/3Ph',
      'Temperature Range': '30°C - 300°C',
      'Material': 'Stainless Steel 304 (Interior & Exterior)'
    },
    notes: 'Features a programmable touchscreen and automatic cleaning system.',
    images: [
      { id: 'img_3c1', machineId: 'mach_3c4d5e', url: 'https://placehold.co/600x400', isPrimary: true, order: 1 },
      { id: 'img_3c2', machineId: 'mach_3c4d5e', url: 'https://placehold.co/600x400', isPrimary: false, order: 2 }
    ],
    machineSuppliers: [
      {
        id: 'ms_3c1',
        machineId: 'mach_3c4d5e',
        supplierId: 'sup_c51e6a83',
        supplierName: 'Foshan Titan Thermal Equipment Co., Ltd.',
        costPrice: 2850.00,
        moq: 2,
        leadTimeDays: 30,
        modelNumber: 'TT-C10E',
        qualityNotes: 'Top seller, stable motherboard and excellent boiler system.',
        createdAt: '2025-08-10T14:45:00.000Z'
      },
      {
        id: 'ms_3c2',
        machineId: 'mach_3c4d5e',
        supplierId: 'sup_3d9b7e21',
        supplierName: 'Shandong Huaxin Heavy Kitchen Equipment Co., Ltd.',
        costPrice: 2700.00,
        moq: 5,
        leadTimeDays: 35,
        modelNumber: 'HX-C10T',
        createdAt: '2025-08-12T10:20:00.000Z'
      }
    ],
    createdAt: '2025-08-01T10:00:00.000Z'
  },
  {
    id: 'mach_4d5e6f',
    categoryId: 'cat_ref_01',
    categoryName: 'Refrigeration',
    name: '2-Door Upright Commercial Freezer',
    specifications: {
      'Capacity': '1000L',
      'Temperature Range': '-18°C ~ -22°C',
      'Compressor': 'Embraco / Danfoss',
      'Refrigerant': 'R290',
      'Dimensions': '1220x760x1950mm'
    },
    notes: 'Air cooling, auto-defrost, LED interior lighting.',
    images: [
      { id: 'img_4d1', machineId: 'mach_4d5e6f', url: 'https://placehold.co/600x400', isPrimary: true, order: 1 },
      { id: 'img_4d2', machineId: 'mach_4d5e6f', url: 'https://placehold.co/600x400', isPrimary: false, order: 2 },
      { id: 'img_4d3', machineId: 'mach_4d5e6f', url: 'https://placehold.co/600x400', isPrimary: false, order: 3 }
    ],
    machineSuppliers: [
      {
        id: 'ms_4d1',
        machineId: 'mach_4d5e6f',
        supplierId: 'sup_8f1a2c4d',
        supplierName: 'Guangzhou Frostline Refrigeration Systems Co., Ltd.',
        costPrice: 750.00,
        moq: 5,
        leadTimeDays: 20,
        modelNumber: 'FL-2D1000F',
        qualityNotes: 'High-quality copper evaporator, very reliable in high ambient temperatures.',
        createdAt: '2025-09-15T09:00:00.000Z'
      },
      {
        id: 'ms_4d2',
        machineId: 'mach_4d5e6f',
        supplierId: 'sup_e04a7d56',
        supplierName: 'Suzhou MetroPack Display Solutions Co., Ltd.',
        costPrice: 710.00,
        moq: 10,
        leadTimeDays: 25,
        modelNumber: 'MP-UF2D',
        createdAt: '2025-09-18T14:30:00.000Z'
      }
    ],
    createdAt: '2025-09-10T11:00:00.000Z'
  },
  {
    id: 'mach_5e6f7g',
    categoryId: 'cat_wash_01',
    categoryName: 'Warewashing',
    name: 'Pass-through Commercial Dishwasher',
    specifications: {
      'Washing Capacity': '60 Baskets/Hour',
      'Water Consumption': '2.5L/Basket',
      'Tank Temperature': '60°C - 65°C',
      'Boiler Temperature': '82°C - 90°C',
      'Power': '14.5kW',
      'Voltage': '380V/50Hz/3Ph'
    },
    notes: 'Built-in rinse aid and detergent dispensers.',
    images: [
      { id: 'img_5e1', machineId: 'mach_5e6f7g', url: 'https://placehold.co/600x400', isPrimary: true, order: 1 },
      { id: 'img_5e2', machineId: 'mach_5e6f7g', url: 'https://placehold.co/600x400', isPrimary: false, order: 2 }
    ],
    machineSuppliers: [
      {
        id: 'ms_5e1',
        machineId: 'mach_5e6f7g',
        supplierId: 'sup_3d9b7e21',
        supplierName: 'Shandong Huaxin Heavy Kitchen Equipment Co., Ltd.',
        costPrice: 1250.00,
        moq: 3,
        leadTimeDays: 25,
        modelNumber: 'HX-PT60',
        qualityNotes: 'Solid construction, Italian wash pumps included.',
        createdAt: '2025-12-05T10:00:00.000Z'
      },
      {
        id: 'ms_5e2',
        machineId: 'mach_5e6f7g',
        supplierId: 'sup_c51e6a83',
        supplierName: 'Foshan Titan Thermal Equipment Co., Ltd.',
        costPrice: 1320.00,
        moq: 2,
        leadTimeDays: 20,
        modelNumber: 'TT-DWPT',
        createdAt: '2025-12-07T11:15:00.000Z'
      }
    ],
    createdAt: '2025-12-01T08:00:00.000Z'
  },
  {
    id: 'mach_6f7g8h',
    categoryId: 'cat_ref_02',
    categoryName: 'Refrigeration',
    name: '12-Pan Gelato Display Showcase',
    specifications: {
      'Pans Capacity': '12 x 1/3 GN Pans',
      'Temperature Range': '-15°C ~ -20°C',
      'Cooling System': 'Ventilated Cooling',
      'Glass Type': 'Heated Anti-condensation Glass',
      'Dimensions': '1200x1050x1350mm'
    },
    notes: 'Curved front glass, stylish marble base.',
    images: [
      { id: 'img_6f1', machineId: 'mach_6f7g8h', url: 'https://placehold.co/600x400', isPrimary: true, order: 1 },
      { id: 'img_6f2', machineId: 'mach_6f7g8h', url: 'https://placehold.co/600x400', isPrimary: false, order: 2 },
      { id: 'img_6f3', machineId: 'mach_6f7g8h', url: 'https://placehold.co/600x400', isPrimary: false, order: 3 }
    ],
    machineSuppliers: [
      {
        id: 'ms_6f1',
        machineId: 'mach_6f7g8h',
        supplierId: 'sup_e04a7d56',
        supplierName: 'Suzhou MetroPack Display Solutions Co., Ltd.',
        costPrice: 1650.00,
        moq: 1,
        leadTimeDays: 30,
        modelNumber: 'MP-GD12',
        qualityNotes: 'Exquisite finishing, highly recommended for front-of-house.',
        createdAt: '2025-11-25T13:00:00.000Z'
      },
      {
        id: 'ms_6f2',
        machineId: 'mach_6f7g8h',
        supplierId: 'sup_8f1a2c4d',
        supplierName: 'Guangzhou Frostline Refrigeration Systems Co., Ltd.',
        costPrice: 1590.00,
        moq: 2,
        leadTimeDays: 20,
        modelNumber: 'FL-G1200',
        createdAt: '2025-11-28T09:45:00.000Z'
      }
    ],
    createdAt: '2025-11-20T09:00:00.000Z'
  }
]
