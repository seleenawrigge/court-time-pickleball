
export interface Court {
  id: number;
  name: string;
  type: 'indoor' | 'outdoor';
  image: string;
  pricePerHour: number;
  description: string;
  features: string[];
}

export const courts: Court[] = [
  {
    id: 1,
    name: 'Court 1',
    type: 'indoor',
    image: '/placeholder.svg',
    pricePerHour: 25,
    description: 'Our premium indoor court with professional-grade flooring and lighting.',
    features: ['Climate controlled', 'Pro-grade net', 'Seating area', 'Water station']
  },
  {
    id: 2,
    name: 'Court 2',
    type: 'indoor',
    image: '/placeholder.svg',
    pricePerHour: 25,
    description: 'Spacious indoor court perfect for both casual play and competitive matches.',
    features: ['Climate controlled', 'Pro-grade net', 'Equipment rental', 'Water station']
  },
  {
    id: 3,
    name: 'Court 3',
    type: 'outdoor',
    image: '/placeholder.svg',
    pricePerHour: 20,
    description: 'Beautiful outdoor court with excellent visibility and ample space.',
    features: ['Shaded viewing area', 'Pro-grade net', 'Night lighting', 'Water station']
  },
  {
    id: 4,
    name: 'Court 4',
    type: 'outdoor',
    image: '/placeholder.svg',
    pricePerHour: 20,
    description: 'Newly resurfaced outdoor court with tournament-quality playing conditions.',
    features: ['Shaded viewing area', 'Pro-grade net', 'Night lighting', 'Equipment rental']
  }
];
