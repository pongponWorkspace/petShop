import { Service } from '../types/index';

export const mockAvailableServices: Service[] = [
  {
    id: 'service-2',
    name: 'Pet Boarding',
    description: '24/7 professional pet care while you\'re away',
    price: 500,
    category: 'boarding',
    imageUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=300&fit=crop',
    fullDescription: 'Premium pet boarding service with 24/7 supervision, comfortable accommodations, daily exercise, feeding service, and emergency veterinary access. Your pet will be safe, comfortable, and well-cared for.',
    features: [
      '24/7 professional supervision',
      'Comfortable private accommodations',
      'Daily exercise and playtime',
      'Regular feeding schedule',
      'Emergency veterinary access',
      'Photo updates for pet parents'
    ],
    requirements: [
      'Advance booking required',
      'Vaccination records must be current',
      'Pet health certificate required'
    ],
    additionalInfo: [
      'Pickup and drop-off service available',
      'Special diets accommodated',
      'Medication administration included'
    ],
    duration: 'Per night'
  },
  {
    id: 'service-3',
    name: 'Veterinary Checkup',
    description: 'Comprehensive health examination by experienced veterinarians',
    price: 1500,
    category: 'medical',
    imageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop',
    fullDescription: 'Complete health examination including physical assessment, vaccination updates, dental checkup, weight monitoring, and health record updates. Early detection and prevention of health issues.',
    features: [
      'Comprehensive physical examination',
      'Vaccination updates and boosters',
      'Dental health assessment',
      'Weight and nutrition counseling',
      'Blood tests (if recommended)',
      'Health record documentation'
    ],
    requirements: [
      'Appointment booking required',
      'Bring previous health records',
      'Fasting required for blood tests'
    ],
    additionalInfo: [
      'Experienced licensed veterinarians',
      'Modern medical equipment',
      'Follow-up care included'
    ],
    duration: '45 minutes'
  },
  {
    id: 'service-4',
    name: 'Dog Training',
    description: 'Professional training sessions for obedience and behavior correction',
    price: 1200,
    category: 'training',
    imageUrl: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=300&fit=crop',
    fullDescription: 'Professional dog training sessions focusing on basic obedience, behavior correction, socialization, and custom training plans. Positive reinforcement methods used by certified trainers.',
    features: [
      'Basic obedience training',
      'Behavior problem correction',
      'Socialization training',
      'Custom training plans',
      'Progress tracking and reports',
      'Home visit options available'
    ],
    requirements: [
      'Owner participation required',
      'Session packages recommended',
      'Consistent practice between sessions'
    ],
    additionalInfo: [
      'Certified professional trainers',
      'Positive reinforcement methods only',
      'Ongoing support and guidance'
    ],
    duration: '1 hour per session'
  },
  {
    id: 'service-5',
    name: 'Pet Spa',
    description: 'Luxury spa treatment for ultimate relaxation and wellness',
    price: 600,
    category: 'spa',
    imageUrl: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=400&h=300&fit=crop',
    fullDescription: 'Luxury spa experience including aromatherapy bath, massage therapy, paw treatment, and relaxation in a calm environment. Perfect for stress relief and bonding.',
    features: [
      'Aromatherapy bath with essential oils',
      'Therapeutic massage treatment',
      'Paw and nail care treatment',
      'Calming environment setup',
      'Premium organic products',
      'Complimentary health check'
    ],
    requirements: [
      'Advance booking recommended',
      'Pet health assessment required',
      'No recent illness or injury'
    ],
    additionalInfo: [
      'Helps reduce anxiety and stress',
      'Improves skin and coat health',
      'Great bonding experience'
    ],
    duration: '3-4 hours'
  }
];