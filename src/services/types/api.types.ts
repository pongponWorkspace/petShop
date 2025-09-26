// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  timestamp: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Error Types
export interface ApiError {
  code: string;
  message: string;
  details?: any;
}

// Status Enums (as they come from API - uppercase)
export enum ApiServiceStatus {
  READY_TO_USE = 'READY_TO_USE',
  USED = 'USED',
  EXPIRED = 'EXPIRED'
}

export enum ApiCouponStatus {
  AVAILABLE = 'AVAILABLE',
  USED = 'USED',
  EXPIRED = 'EXPIRED'
}

export enum ApiBookingStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

// Service Data Types
export interface ApiService {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  purchaseDate: string;
  expiryDate?: string;
  status: ApiServiceStatus;
  category: string;
}

export interface ApiCoupon {
  id: string;
  title: string;
  description: string;
  expiryDate: string;
  status: ApiCouponStatus;
  icon: string;
  color: string;
  discountValue?: number;
  discountType?: 'PERCENTAGE' | 'FIXED';
  imageUrl?: string;
  purchaseDate?: string;
  terms?: string;
}

export interface ApiBooking {
  id: string;
  bookingId: string;
  type: 'HOSPITAL' | 'GROOMING' | 'BOARDING';
  specialist?: string;
  service?: string;
  petName: string;
  petBreed: string;
  date: string;
  time: string;
  status: ApiBookingStatus;
  price?: number;
  notes?: string;
}

export interface ApiPet {
  id: string;
  name: string;
  type: 'DOG' | 'CAT';
  breed: string;
  age: number;
  weight: number;
  imageUrl: string;
  vaccinated: boolean;
  medicalNotes?: string;
}

export interface ApiHotel {
  id: string;
  name: string;
  description: string;
  petType: 'DOG' | 'CAT';
  imageUrl: string;
  rating: number;
  amenities: string[];
  location: string;
}

export interface ApiRoomType {
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

// Request Types
export interface CreateBookingRequest {
  type: 'HOSPITAL' | 'GROOMING' | 'BOARDING';
  petId: string;
  serviceId?: string;
  date: string;
  time: string;
  notes?: string;
}

export interface UpdateBookingRequest {
  date?: string;
  time?: string;
  notes?: string;
}