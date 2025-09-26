import { Booking } from '../types';
import { BookingStatus } from '../types/common';

export const mockBookings: Booking[] = [
  {
    id: '1',
    type: 'hospital',
    specialist: 'Veterinary Specialists API',
    petName: 'Max',
    petBreed: 'Golden Retriever',
    date: 'Tomorrow',
    time: '10:00 AM',
    status: BookingStatus.UPCOMING,
    bookingId: '#HB001'
  },
  {
    id: '2',
    type: 'hospital',
    specialist: 'Internal Medicine API',
    petName: 'Luna',
    petBreed: 'Persian Cat',
    date: 'Oct 25',
    time: '2:00 PM',
    status: BookingStatus.UPCOMING,
    bookingId: '#HB002'
  },
  {
    id: '3',
    type: 'grooming',
    service: 'Premium Grooming',
    petName: 'Buddy',
    petBreed: 'Labrador',
    date: 'Oct 30',
    time: '11:00 AM',
    status: BookingStatus.COMPLETED,
    bookingId: '#GB001'
  }
];