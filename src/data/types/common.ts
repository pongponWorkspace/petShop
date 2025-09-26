// Additional enums not covered in main types
export enum CouponStatus {
  AVAILABLE = 'available',
  USED = 'used',
  EXPIRED = 'expired'
}

export enum ServiceStatus {
  READY_TO_USE = 'ready_to_use',
  USED = 'used',
  EXPIRED = 'expired'
}

export enum BookingStatus {
  CONFIRMED = 'confirmed',
  UPCOMING = 'upcoming',
  COMPLETED = 'completed'
}

// Additional interfaces for specific use cases
export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  date: string;
  type: 'news' | 'announcement';
  imageUrl: string;
}

export interface EducationalContent {
  id: string;
  title: string;
  description: string;
  category: 'health' | 'training' | 'nutrition' | 'grooming';
  author: string;
  imageUrl: string;
}

export interface QuickAction {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  screen: string;
}

// Re-export main types for convenience
export type { Booking, Coupon, LoyaltyPoints, MedicalRecord, Pet, PointTransaction, Product, Service, User, UserService } from './index';
