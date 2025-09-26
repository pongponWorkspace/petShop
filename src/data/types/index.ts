export interface Pet {
  id: string;
  name: string;
  type: 'dog' | 'cat' | 'other';
  breed: string;
  age: number;
  weight: number;
  imageUrl?: string;
  medicalHistory: MedicalRecord[];
  allergies: string[];
  congenitalDiseases: string[];
  attendingVeterinarian?: {
    name: string;
    phone: string;
  };
  lastSeen?: string;
  nextAppointment?: {
    date: string;
    time: string;
    type: string;
    veterinarian: string;
  };
}

export interface MedicalRecord {
  id: string;
  date: string;
  type: 'vaccination' | 'checkup' | 'treatment' | 'other';
  description: string;
  veterinarian?: string;
  notes?: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'boarding' | 'grooming' | 'training' | 'spa' | 'medical';
  imageUrl?: string;
  fullDescription: string;
  features: string[];
  requirements: string[];
  additionalInfo: string[];
  duration: string;
}

export interface Booking {
  id: string;
  type: 'hospital' | 'grooming' | 'boarding' | 'training' | 'spa';
  specialist?: string;
  petName: string;
  petBreed: string;
  petIds: string[];
  bookingId?: string;
  serviceId?: string;
  date: string;
  time: string;
  status: import('./common').BookingStatus;
  notes?: string;
  totalPrice: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'food' | 'toys' | 'accessories' | 'medicine' | 'other';
  imageUrl?: string;
  inStock: boolean;
  rating: number;
}

export interface LoyaltyPoints {
  userId: string;
  totalPoints: number;
  availablePoints: number;
  transactions: PointTransaction[];
}

export interface PointTransaction {
  id: string;
  type: 'earned' | 'redeemed';
  points: number;
  date: string;
  description: string;
  relatedBookingId?: string;
  relatedPurchaseId?: string;
}

export interface Coupon {
  id: string;
  title: string;
  description: string;
  category: 'service' | 'product' | 'special';
  status: 'available' | 'used' | 'expired';
  dateRedeemed?: string;
  expiryDate: string;
  points?: number;
  value?: number;
  imageUrl?: string;
  icon?: string;
  color?: string;
}

export interface UserService {
  id: string;
  serviceId: string;
  serviceName: string;
  description: string;
  status: 'ready_to_use' | 'used' | 'expired';
  purchaseDate: string;
  expiryDate?: string;
  imageUrl?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  pets: Pet[];
  loyaltyPoints: LoyaltyPoints;
  coupons: Coupon[];
  services: UserService[];
}

export interface Hotel {
  id: string;
  name: string;
  description: string;
  petType: 'dog' | 'cat';
  imageUrl: string;
  rating: number;
  amenities: string[];
}

export interface RoomType {
  id: string;
  hotelId: string;
  name: string;
  description: string;
  price: number;
  size: string;
  capacity: number;
  amenities: string[];
  images: string[];
  bookingConditions: string[];
  available: boolean;
}