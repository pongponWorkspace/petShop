import { Pet } from '@/src/data/types';
import { LoadingManager } from '../middleware/api.middleware';
import {
  ApiResponse
} from '../types/api.types';

// Hospital-specific types
export interface ApiSpecialist {
  id: string;
  name: string;
  description: string;
}

export interface ApiTimeSlot {
  id: string;
  time: string;
  available: boolean;
}

export interface ApiDateSlot {
  date: string;
  dayName: string;
  dayNumber: string;
  timeSlots: ApiTimeSlot[];
}

export interface ApiBookingRequest {
  specialistId: string;
  petId: string;
  date: string;
  timeSlotId: string;
  appointmentReason?: string;
  initialSymptoms?: string;
  requestVeterinarian?: string;
  notes?: string;
}

export interface ApiBookingResponse {
  id: string;
  bookingNumber: string;
  specialistId: string;
  petId: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  appointmentReason?: string;
  initialSymptoms?: string;
  requestVeterinarian?: string;
  notes?: string;
  createdAt: string;
}

// Mock data
const mockSpecialists: Record<string, ApiSpecialist & { services: string[]; imageUrl: string }> = {
  '1': {
    id: '1',
    name: 'Dr. Sarah Johnson',
    description: 'General Veterinarian with 15+ years experience in comprehensive pet care',
    services: ['Health checkups', 'Vaccinations', 'Emergency care', 'Surgery', 'Dental care'],
    imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop&crop=face'
  },
  '2': {
    id: '2',
    name: 'Dr. Michael Chen',
    description: 'Internal Medicine Specialist focusing on complex medical conditions',
    services: ['Internal medicine', 'Cardiology', 'Endocrinology', 'Oncology', 'Gastroenterology'],
    imageUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop&crop=face'
  },
  '3': {
    id: '3',
    name: 'Dr. Emily Rodriguez',
    description: 'Exotic Animal Veterinarian specializing in birds, reptiles, and small mammals',
    services: ['Exotic pets', 'Birds care', 'Reptile medicine', 'Small mammals', 'Behavioral consultation'],
    imageUrl: 'https://images.unsplash.com/photo-1594824375863-4c5abbd9d5cb?w=200&h=200&fit=crop&crop=face'
  },
  '4': {
    id: '4',
    name: 'Dr. James Wilson',
    description: 'Orthopedic Surgery Specialist for bone, joint, and mobility issues',
    services: ['Orthopedic surgery', 'Joint replacement', 'Fracture repair', 'Rehabilitation', 'Pain management'],
    imageUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200&h=200&fit=crop&crop=face'
  },
  '5': {
    id: '5',
    name: 'Dr. Lisa Thompson',
    description: 'Dermatology Specialist treating skin, coat, and allergy conditions',
    services: ['Dermatology', 'Allergy treatment', 'Skin conditions', 'Coat care', 'Parasite control'],
    imageUrl: 'https://images.unsplash.com/photo-1551884170-09fb70a3a2ed?w=200&h=200&fit=crop&crop=face'
  }
};

const mockPets: Pet[] = [
  {
    id: '1',
    name: 'Max',
    type: 'dog',
    breed: 'Golden Retriever',
    age: 3,
    weight: 25,
    imageUrl: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=150&h=150&fit=crop',
    medicalHistory: [],
    allergies: [],
    congenitalDiseases: []
  },
  {
    id: '2',
    name: 'Luna',
    type: 'cat',
    breed: 'Persian',
    age: 2,
    weight: 4,
    imageUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=150&h=150&fit=crop',
    medicalHistory: [],
    allergies: [],
    congenitalDiseases: []
  },
  {
    id: '3',
    name: 'Buddy',
    type: 'dog',
    breed: 'Labrador',
    age: 5,
    weight: 30,
    imageUrl: 'https://images.unsplash.com/photo-1551717743-49959800b1f6?w=150&h=150&fit=crop',
    medicalHistory: [],
    allergies: [],
    congenitalDiseases: []
  }
];

const generateMockTimeSlots = (): ApiTimeSlot[] => {
  const slots: ApiTimeSlot[] = [];
  const commonlyBusySlots = ['10:00 - 11:00', '14:00 - 15:00', '15:00 - 16:00'];

  for (let hour = 9; hour < 17; hour++) {
    const startTime = `${hour.toString().padStart(2, '0')}:00`;
    const endTime = `${(hour + 1).toString().padStart(2, '0')}:00`;
    const timeRange = `${startTime} - ${endTime}`;

    let available = true;
    if (commonlyBusySlots.includes(timeRange)) {
      available = Math.random() > 0.6;
    } else if (hour === 12) {
      available = Math.random() > 0.7;
    } else if (hour >= 15 && hour < 17) {
      available = Math.random() > 0.4;
    } else {
      available = Math.random() > 0.2;
    }

    slots.push({
      id: `${hour}`,
      time: timeRange,
      available
    });
  }

  return slots;
};

const generateMockDateSlots = (): ApiDateSlot[] => {
  const slots: ApiDateSlot[] = [];
  const today = new Date();

  for (let i = 1; i <= 14; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);

    slots.push({
      date: date.toISOString().split('T')[0],
      dayName: date.toLocaleDateString('en-US', { weekday: 'short' }),
      dayNumber: date.getDate().toString(),
      timeSlots: generateMockTimeSlots()
    });
  }

  return slots;
};

// Hospital API
export class HospitalAPI {
  private static delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  // Get all specialists
  static async getSpecialists(): Promise<ApiResponse<ApiSpecialist[]>> {
    const loadingKey = 'getSpecialists';
    LoadingManager.setLoading(loadingKey, true);

    try {
      await this.delay(600);

      const specialistsList = Object.values(mockSpecialists).map(specialist => ({
        ...specialist,
        services: specialist.id === '1' ? [
          'General Health Checkups',
          'Vaccination Services',
          'Emergency Care',
          'Basic Surgery',
          'Dental Care',
          'Preventive Medicine'
        ] : [
          'Internal Medicine',
          'Cardiology',
          'Gastroenterology',
          'Oncology',
          'Endocrinology',
          'Advanced Diagnostics'
        ],
        imageUrl: specialist.id === '1'
          ? 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=400&h=300&fit=crop'
          : 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop'
      }));

      const response = {
        success: true,
        data: specialistsList,
        message: 'ดึงข้อมูลแพทย์เฉพาะทางสำเร็จ',
        timestamp: new Date().toISOString(),
      };

      return response;
    } catch (error) {
      console.error('HospitalAPI.getSpecialists error:', error);
      throw error;
    } finally {
      LoadingManager.setLoading(loadingKey, false);
    }
  }

  // Get specialist by ID
  static async getSpecialist(specialistId: string): Promise<ApiResponse<ApiSpecialist>> {
    const loadingKey = 'getSpecialist';
    LoadingManager.setLoading(loadingKey, true);

    try {
      await this.delay(600);

      const specialist = mockSpecialists[specialistId];
      if (!specialist) {
        throw new Error('Specialist not found');
      }

      const response = {
        success: true,
        data: specialist,
        message: 'ดึงข้อมูลแพทย์เฉพาะทางสำเร็จ',
        timestamp: new Date().toISOString(),
      };

      return response;
    } catch (error) {
      console.error('HospitalAPI.getSpecialist error:', error);
      throw error;
    } finally {
      LoadingManager.setLoading(loadingKey, false);
    }
  }

  // Get available time slots
  static async getAvailableSlots(specialistId: string): Promise<ApiResponse<ApiDateSlot[]>> {
    const loadingKey = 'getAvailableSlots';
    LoadingManager.setLoading(loadingKey, true);

    try {
      await this.delay(800);

      const dateSlots = generateMockDateSlots();

      const response = {
        success: true,
        data: dateSlots,
        message: 'ดึงข้อมูลช่วงเวลาว่างสำเร็จ',
        timestamp: new Date().toISOString(),
      };

      return response;
    } catch (error) {
      console.error('HospitalAPI.getAvailableSlots error:', error);
      throw error;
    } finally {
      LoadingManager.setLoading(loadingKey, false);
    }
  }

  // Create booking
  static async createBooking(bookingData: ApiBookingRequest): Promise<ApiResponse<ApiBookingResponse>> {
    const loadingKey = 'createBooking';
    LoadingManager.setLoading(loadingKey, true);

    try {
      await this.delay(1000);

      // Simulate booking creation
      const bookingId = `HB${Date.now()}`;
      const booking: ApiBookingResponse = {
        id: bookingId,
        bookingNumber: bookingId,
        specialistId: bookingData.specialistId,
        petId: bookingData.petId,
        date: bookingData.date,
        time: '10:00 - 11:00', // Mock time from time slot
        status: 'confirmed',
        appointmentReason: bookingData.appointmentReason,
        initialSymptoms: bookingData.initialSymptoms,
        requestVeterinarian: bookingData.requestVeterinarian,
        notes: bookingData.notes,
        createdAt: new Date().toISOString(),
      };

      const response = {
        success: true,
        data: booking,
        message: 'จองนัดหมายสำเร็จ',
        timestamp: new Date().toISOString(),
      };

      return response;
    } catch (error) {
      console.error('HospitalAPI.createBooking error:', error);
      throw error;
    } finally {
      LoadingManager.setLoading(loadingKey, false);
    }
  }

  // Get all pets (using existing pets data)
  static async getAllPets(): Promise<ApiResponse<Pet[]>> {
    const loadingKey = 'getAllPets';
    LoadingManager.setLoading(loadingKey, true);

    try {
      await this.delay(500);

      const response = {
        success: true,
        data: mockPets,
        message: 'ดึงข้อมูลสัตว์เลี้ยงสำเร็จ',
        timestamp: new Date().toISOString(),
      };

      return response;
    } catch (error) {
      console.error('HospitalAPI.getAllPets error:', error);
      throw error;
    } finally {
      LoadingManager.setLoading(loadingKey, false);
    }
  }
}