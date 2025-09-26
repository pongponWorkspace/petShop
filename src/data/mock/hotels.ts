import { Hotel, RoomType } from '../types';

export const mockHotels: Hotel[] = [
  {
    id: '1',
    name: 'Paws Paradise Dog Hotel',
    description: 'Luxury accommodation for your beloved dogs with premium facilities and 24/7 care',
    petType: 'dog',
    imageUrl: 'https://images.unsplash.com/photo-1551717743-49959800b1f6?w=400&h=300&fit=crop',
    rating: 4.8,
    amenities: ['24/7 Supervision', 'Play Area', 'Grooming Service', 'Daily Walks', 'Medical Care', 'Air Conditioning']
  },
  {
    id: '2',
    name: 'Whiskers Haven Cat Hotel',
    description: 'Peaceful and comfortable retreat for cats with quiet environments and specialized cat care',
    petType: 'cat',
    imageUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=300&fit=crop',
    rating: 4.9,
    amenities: ['Quiet Environment', 'Climbing Trees', 'Individual Spaces', 'Play Time', 'Medical Care', 'Climate Control']
  }
];

export const mockRoomTypes: RoomType[] = [
  // Dog Hotel Rooms
  {
    id: '1',
    hotelId: '1',
    name: 'Standard Room',
    description: 'Comfortable basic accommodation with essential amenities',
    price: 50,
    size: '2m x 1.5m',
    capacity: 1,
    amenities: ['Comfortable Bed', 'Food & Water Bowls', 'Daily Cleaning', 'Feeding Service'],
    images: [
      'https://images.unsplash.com/photo-1551717743-49959800b1f6?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1552053831-71594a27632d?w=600&h=400&fit=crop'
    ],
    bookingConditions: [
      'Minimum 1 night stay',
      'Check-in: 2:00 PM, Check-out: 11:00 AM',
      'Vaccination records required',
      'No aggressive pets allowed',
      'Cancellation 24 hours before check-in'
    ],
    available: true
  },
  {
    id: '2',
    hotelId: '1',
    name: 'Deluxe Room',
    description: 'Spacious room with additional comfort features and play area',
    price: 80,
    size: '3m x 2m',
    capacity: 1,
    amenities: ['Premium Bed', 'Toys', 'Individual Play Area', 'Grooming Kit', 'Special Treats'],
    images: [
      'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1552053831-71594a27632d?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&h=400&fit=crop'
    ],
    bookingConditions: [
      'Minimum 1 night stay',
      'Check-in: 2:00 PM, Check-out: 11:00 AM',
      'Vaccination records required',
      'Temperament assessment required',
      'Cancellation 24 hours before check-in'
    ],
    available: true
  },
  {
    id: '3',
    hotelId: '1',
    name: 'Superior Room',
    description: 'Large room with outdoor access and premium amenities',
    price: 120,
    size: '4m x 3m',
    capacity: 2,
    amenities: ['King Size Bed', 'Outdoor Access', 'Premium Toys', 'Daily Grooming', 'Special Menu'],
    images: [
      'https://images.unsplash.com/photo-1552053831-71594a27632d?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&h=400&fit=crop'
    ],
    bookingConditions: [
      'Minimum 2 nights stay',
      'Check-in: 2:00 PM, Check-out: 12:00 PM',
      'Health certificate required',
      'Behavioral assessment mandatory',
      'Cancellation 48 hours before check-in'
    ],
    available: true
  },
  {
    id: '4',
    hotelId: '1',
    name: 'Suite',
    description: 'Ultimate luxury accommodation with private yard and personalized service',
    price: 200,
    size: '6m x 4m',
    capacity: 3,
    amenities: ['Private Yard', 'Personal Caretaker', 'Luxury Amenities', 'Custom Menu', 'Spa Services'],
    images: [
      'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1552053831-71594a27632d?w=600&h=400&fit=crop'
    ],
    bookingConditions: [
      'Minimum 3 nights stay',
      'Check-in: 1:00 PM, Check-out: 1:00 PM',
      'Complete health records required',
      'Prior visit assessment required',
      'Cancellation 72 hours before check-in'
    ],
    available: false
  },
  // Cat Hotel Rooms
  {
    id: '5',
    hotelId: '2',
    name: 'Standard Room',
    description: 'Cozy and quiet space perfect for cats who prefer solitude',
    price: 45,
    size: '2m x 1.5m',
    capacity: 1,
    amenities: ['Comfortable Bed', 'Scratching Post', 'Food & Water Station', 'Litter Box'],
    images: [
      'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1561948955-570b270e7c36?w=600&h=400&fit=crop'
    ],
    bookingConditions: [
      'Minimum 1 night stay',
      'Check-in: 3:00 PM, Check-out: 11:00 AM',
      'Vaccination records required',
      'Spayed/neutered cats preferred',
      'Cancellation 24 hours before check-in'
    ],
    available: true
  },
  {
    id: '6',
    hotelId: '2',
    name: 'Deluxe Room',
    description: 'Enhanced comfort with climbing structures and entertainment',
    price: 70,
    size: '3m x 2m',
    capacity: 1,
    amenities: ['Multi-level Climbing Tree', 'Premium Bedding', 'Interactive Toys', 'Window View'],
    images: [
      'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1561948955-570b270e7c36?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&h=400&fit=crop'
    ],
    bookingConditions: [
      'Minimum 1 night stay',
      'Check-in: 3:00 PM, Check-out: 11:00 AM',
      'Vaccination records required',
      'Social cats only',
      'Cancellation 24 hours before check-in'
    ],
    available: true
  },
  {
    id: '7',
    hotelId: '2',
    name: 'Superior Room',
    description: 'Spacious room with multiple levels and enrichment activities',
    price: 100,
    size: '4m x 3m',
    capacity: 2,
    amenities: ['Multi-room Setup', 'Premium Climbing Trees', 'Entertainment Center', 'Sunbathing Area'],
    images: [
      'https://images.unsplash.com/photo-1561948955-570b270e7c36?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=600&h=400&fit=crop'
    ],
    bookingConditions: [
      'Minimum 2 nights stay',
      'Check-in: 3:00 PM, Check-out: 12:00 PM',
      'Health certificate required',
      'Compatible cats only',
      'Cancellation 48 hours before check-in'
    ],
    available: true
  },
  {
    id: '8',
    hotelId: '2',
    name: 'Suite',
    description: 'Luxury cat paradise with private outdoor enclosure',
    price: 150,
    size: '5m x 4m',
    capacity: 2,
    amenities: ['Private Outdoor Enclosure', 'Multiple Rooms', 'Personal Caretaker', 'Premium Food Service'],
    images: [
      'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1561948955-570b270e7c36?w=600&h=400&fit=crop'
    ],
    bookingConditions: [
      'Minimum 3 nights stay',
      'Check-in: 2:00 PM, Check-out: 1:00 PM',
      'Complete health records required',
      'Behavioral assessment required',
      'Cancellation 72 hours before check-in'
    ],
    available: true
  }
];