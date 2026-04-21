import { Category } from '../types/category';

export const mockCategories: Category[] = [
  {
    id: 'cat-1',
    name: 'Refrigeration Equipment',
    description: 'Commercial refrigerators, freezers, display cases, and ice machines for food preservation.',
    imageUrl: 'https://placehold.co/800x400',
    parentId: null,
    createdAt: new Date().toISOString(),
    children: [
      { id: 'sub-1-1', name: 'Reach-In Refrigerators', parentId: 'cat-1', machineCount: 12, createdAt: new Date().toISOString(), imageUrl: 'https://placehold.co/800x400' },
      { id: 'sub-1-2', name: 'Walk-In Freezers', parentId: 'cat-1', machineCount: 4, createdAt: new Date().toISOString(), imageUrl: 'https://placehold.co/800x400' },
      { id: 'sub-1-3', name: 'Ice Machines', parentId: 'cat-1', machineCount: 8, createdAt: new Date().toISOString(), imageUrl: 'https://placehold.co/800x400' },
      { id: 'sub-1-4', name: 'Display Cases', parentId: 'cat-1', machineCount: 15, createdAt: new Date().toISOString(), imageUrl: 'https://placehold.co/800x400' },
    ],
  },
  {
    id: 'cat-2',
    name: 'Cooking Equipment',
    description: 'Ranges, ovens, fryers, grills, and specialized cooking stations.',
    imageUrl: 'https://placehold.co/800x400',
    parentId: null,
    createdAt: new Date().toISOString(),
    children: [
      { id: 'sub-2-1', name: 'Commercial Ovens', parentId: 'cat-2', machineCount: 18, createdAt: new Date().toISOString(), imageUrl: 'https://placehold.co/800x400' },
      { id: 'sub-2-2', name: 'Deep Fryers', parentId: 'cat-2', machineCount: 10, createdAt: new Date().toISOString(), imageUrl: 'https://placehold.co/800x400' },
      { id: 'sub-2-3', name: 'Griddles & Charbroilers', parentId: 'cat-2', machineCount: 14, createdAt: new Date().toISOString(), imageUrl: 'https://placehold.co/800x400' },
      { id: 'sub-2-4', name: 'Commercial Ranges', parentId: 'cat-2', machineCount: 20, createdAt: new Date().toISOString(), imageUrl: 'https://placehold.co/800x400' },
    ],
  },
  {
    id: 'cat-3',
    name: 'Food Preparation',
    description: 'Mixers, slicers, food processors, and heavy-duty prep stations.',
    imageUrl: 'https://placehold.co/800x400',
    parentId: null,
    createdAt: new Date().toISOString(),
    children: [
      { id: 'sub-3-1', name: 'Commercial Mixers', parentId: 'cat-3', machineCount: 9, createdAt: new Date().toISOString(), imageUrl: 'https://placehold.co/800x400' },
      { id: 'sub-3-2', name: 'Meat Slicers', parentId: 'cat-3', machineCount: 6, createdAt: new Date().toISOString(), imageUrl: 'https://placehold.co/800x400' },
      { id: 'sub-3-3', name: 'Food Processors', parentId: 'cat-3', machineCount: 11, createdAt: new Date().toISOString(), imageUrl: 'https://placehold.co/800x400' },
    ],
  },
  {
    id: 'cat-4',
    name: 'Warewashing',
    description: 'Dishwashers, glasswashers, pre-rinse sinks, and sanitization systems.',
    imageUrl: 'https://placehold.co/800x400',
    parentId: null,
    createdAt: new Date().toISOString(),
    children: [
      { id: 'sub-4-1', name: 'Conveyor Dishwashers', parentId: 'cat-4', machineCount: 3, createdAt: new Date().toISOString(), imageUrl: 'https://placehold.co/800x400' },
      { id: 'sub-4-2', name: 'Undercounter Dishwashers', parentId: 'cat-4', machineCount: 7, createdAt: new Date().toISOString(), imageUrl: 'https://placehold.co/800x400' },
      { id: 'sub-4-3', name: 'Glasswashers', parentId: 'cat-4', machineCount: 4, createdAt: new Date().toISOString(), imageUrl: 'https://placehold.co/800x400' },
      { id: 'sub-4-4', name: 'Sinks & Pre-Rinse', parentId: 'cat-4', machineCount: 25, createdAt: new Date().toISOString(), imageUrl: 'https://placehold.co/800x400' },
    ],
  },
  {
    id: 'cat-5',
    name: 'Beverage Equipment',
    description: 'Espresso machines, brewers, dispensers, and blenders for commercial use.',
    imageUrl: 'https://placehold.co/800x400',
    parentId: null,
    createdAt: new Date().toISOString(),
    children: [
      { id: 'sub-5-1', name: 'Espresso Machines', parentId: 'cat-5', machineCount: 8, createdAt: new Date().toISOString(), imageUrl: 'https://placehold.co/800x400' },
      { id: 'sub-5-2', name: 'Coffee Brewers', parentId: 'cat-5', machineCount: 12, createdAt: new Date().toISOString(), imageUrl: 'https://placehold.co/800x400' },
      { id: 'sub-5-3', name: 'Beverage Dispensers', parentId: 'cat-5', machineCount: 16, createdAt: new Date().toISOString(), imageUrl: 'https://placehold.co/800x400' },
    ],
  },
];