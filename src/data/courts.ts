
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
    image: '/lovable-uploads/75ab559b-f3d4-4f4c-96ac-0a07052b9964.png',
    pricePerHour: 3000,
    description: 'Our premium indoor court with professional-grade flooring and lighting.',
    features: ['Climate controlled', 'Pro-grade net', 'Seating area', 'Water station']
  },
  {
    id: 2,
    name: 'Court 2',
    type: 'indoor',
    image: '/lovable-uploads/10a8b238-5403-4349-95d6-7dc255345cbd.png',
    pricePerHour: 3000,
    description: 'Spacious indoor court perfect for both casual play and competitive matches.',
    features: ['Climate controlled', 'Pro-grade net', 'Equipment rental', 'Water station']
  },
  {
    id: 3,
    name: 'Court 3',
    type: 'outdoor',
    image: '/lovable-uploads/30d0e4c1-261e-45a5-845f-eaaf78342ff4.png',
    pricePerHour: 3000,
    description: 'Beautiful outdoor court with excellent visibility and ample space.',
    features: ['Shaded viewing area', 'Pro-grade net', 'Night lighting', 'Water station']
  },
  {
    id: 4,
    name: 'Court 4',
    type: 'outdoor',
    image: '/lovable-uploads/7b5982cb-ebf2-4836-8d23-cf86e79131f4.png',
    pricePerHour: 3000,
    description: 'Newly resurfaced outdoor court with tournament-quality playing conditions.',
    features: ['Shaded viewing area', 'Pro-grade net', 'Night lighting', 'Equipment rental']
  }
];
