import { Coupon, UserService } from '../types';
import { ServiceStatus } from '../types/common';

export const mockCoupons: Coupon[] = [
  {
    id: '1',
    title: 'Free Basic Grooming',
    description: 'Complete grooming service for small pets',
    category: 'service',
    status: 'available',
    expiryDate: '2025-12-15',
    value: 500,
    points: 1000,
    imageUrl: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=300&fit=crop',
    icon: 'star.fill',
    color: 'warning'
  },
  {
    id: '2',
    title: 'Premium Toy Bundle',
    description: 'Set of premium toys and treats',
    category: 'product',
    status: 'available',
    expiryDate: '2025-12-05',
    value: 300,
    points: 600,
    imageUrl: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=300&fit=crop',
    icon: 'gift.fill',
    color: 'secondary'
  },
  {
    id: '3',
    title: '30% Off Veterinary Checkup',
    description: 'Comprehensive health examination',
    category: 'service',
    status: 'expired',
    expiryDate: '2024-08-20',
    value: 450,
    points: 900,
    imageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop',
    icon: 'heart.fill',
    color: 'error'
  },
  {
    id: '4',
    title: 'Spa Treatment Package',
    description: 'Relaxing spa treatment for your pet',
    category: 'service',
    status: 'used',
    expiryDate: '2024-11-30',
    dateRedeemed: '2024-10-15',
    value: 600,
    points: 1200,
    imageUrl: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=400&h=300&fit=crop',
    icon: 'star.fill',
    color: 'warning'
  },
  {
    id: '5',
    title: 'Training Session Voucher',
    description: 'Professional training session',
    category: 'service',
    status: 'available',
    expiryDate: '2026-01-15',
    value: 800,
    points: 1600,
    imageUrl: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=300&fit=crop',
    icon: 'book.fill',
    color: 'info'
  }
];

export const mockUserServices: UserService[] = [
  {
    id: '1',
    title: 'Professional Grooming',
    purchaseDate: 'Sep 20, 2024',
    expiryDate: 'Dec 20, 2024',
    status: ServiceStatus.READY_TO_USE,
    imageUrl: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=300&fit=crop'
  },
  {
    id: '2',
    title: 'Pet Boarding',
    purchaseDate: 'Sep 18, 2024',
    expiryDate: 'Dec 18, 2024',
    status: ServiceStatus.READY_TO_USE,
    imageUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=300&fit=crop'
  },
  {
    id: '3',
    title: 'Health Checkup Package',
    purchaseDate: 'Aug 15, 2024',
    expiryDate: 'Nov 15, 2024',
    status: ServiceStatus.USED,
    imageUrl: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=400&h=300&fit=crop'
  }
];