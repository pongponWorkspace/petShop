import { mockPets, mockRoomTypes } from '@/src/data/mock';
import { Pet, RoomType } from '@/src/data/types';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, Platform } from 'react-native';

export interface HotelBookingState {
  loading: boolean;
  room: RoomType | null;
  error: string | null;

  // Date selection
  selectedDate: Date;
  showDatePicker: boolean;

  // Time selection
  selectedTime: string | null;
  availableTimeSlots: {
    id: string;
    time: string;
    available: boolean;
  }[];

  // Pet selection
  pets: Pet[];
  petsLoading: boolean;
  selectedPet: Pet | null;

  // Form data
  appointmentReason: string;
  initialSymptoms: string;
  requestVeterinarian: string;
  notes: string;

  // Booking
  bookingLoading: boolean;
}

export interface HotelBookingActions {
  goBack: () => void;
  loadRoom: () => void;
  loadPets: () => void;

  // Date actions
  setShowDatePicker: (show: boolean) => void;
  handleDateChange: (event: any, selectedDate?: Date) => void;

  // Time actions
  handleTimeSelect: (timeId: string) => void;

  // Pet actions
  handlePetSelect: (pet: Pet) => void;

  // Form actions
  setAppointmentReason: (reason: string) => void;
  setInitialSymptoms: (symptoms: string) => void;
  setRequestVeterinarian: (vet: string) => void;
  setNotes: (notes: string) => void;

  // Booking action
  handleBookRoom: () => void;
}

export interface HotelBookingHelpers {
  formatSelectedDate: () => string;
  getAvailableTimeSlots: () => {
    id: string;
    time: string;
    available: boolean;
  }[];
  isBookingValid: () => boolean;
  formatPrice: () => string;
}

export interface HotelBookingController {
  state: HotelBookingState;
  actions: HotelBookingActions;
  helpers: HotelBookingHelpers;
}

export function useHotelBookingController(): HotelBookingController {
  const router = useRouter();
  const { roomId, petType } = useLocalSearchParams<{ roomId: string; petType: 'dog' | 'cat' }>();

  const [state, setState] = useState<HotelBookingState>({
    loading: true,
    room: null,
    error: null,

    selectedDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
    showDatePicker: false,

    selectedTime: null,
    availableTimeSlots: [],

    pets: [],
    petsLoading: false,
    selectedPet: null,

    appointmentReason: '',
    initialSymptoms: '',
    requestVeterinarian: '',
    notes: '',

    bookingLoading: false,
  });

  const loadRoom = () => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    setTimeout(() => {
      const room = mockRoomTypes.find(r => r.id === roomId);
      if (room) {
        setState(prev => ({
          ...prev,
          loading: false,
          room,
          error: null,
        }));
      } else {
        setState(prev => ({
          ...prev,
          loading: false,
          room: null,
          error: 'Room not found',
        }));
      }
    }, 1000);
  };

  const loadPets = () => {
    setState(prev => ({ ...prev, petsLoading: true }));

    setTimeout(() => {
      const pets = mockPets.filter(pet => pet.type === petType);
      setState(prev => ({
        ...prev,
        pets,
        petsLoading: false,
        selectedPet: pets.length > 0 ? pets[0] : null,
      }));
    }, 500);
  };

  useEffect(() => {
    loadRoom();
    loadPets();
  }, [roomId, petType]);

  const actions: HotelBookingActions = {
    goBack: () => {
      router.back();
    },

    loadRoom,
    loadPets,

    setShowDatePicker: (show: boolean) => {
      setState(prev => ({ ...prev, showDatePicker: show }));
    },

    handleDateChange: (event: any, selectedDate?: Date) => {
      if (Platform.OS === 'android') {
        setState(prev => ({ ...prev, showDatePicker: false }));
      }

      if (selectedDate) {
        setState(prev => ({ ...prev, selectedDate }));
      }
    },

    handleTimeSelect: (timeId: string) => {
      setState(prev => ({ ...prev, selectedTime: timeId }));
    },

    handlePetSelect: (pet: Pet) => {
      setState(prev => ({ ...prev, selectedPet: pet }));
    },

    setAppointmentReason: (reason: string) => {
      setState(prev => ({ ...prev, appointmentReason: reason }));
    },

    setInitialSymptoms: (symptoms: string) => {
      setState(prev => ({ ...prev, initialSymptoms: symptoms }));
    },

    setRequestVeterinarian: (vet: string) => {
      setState(prev => ({ ...prev, requestVeterinarian: vet }));
    },

    setNotes: (notes: string) => {
      setState(prev => ({ ...prev, notes: notes }));
    },

    handleBookRoom: async () => {
      if (!helpers.isBookingValid()) return;

      setState(prev => ({ ...prev, bookingLoading: true }));

      // Simulate booking API call
      setTimeout(() => {
        setState(prev => ({ ...prev, bookingLoading: false }));

        Alert.alert(
          'Booking Confirmed',
          'Your hotel room has been successfully booked!',
          [
            {
              text: 'OK',
              onPress: () => {
                // Navigate back to home and refresh API
                router.push('/' as any);
              },
            },
          ]
        );
      }, 2000);
    },
  };

  const helpers: HotelBookingHelpers = {
    formatSelectedDate: () => {
      const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      };
      return state.selectedDate.toLocaleDateString('en-US', options);
    },

    getAvailableTimeSlots: () => {
      // Generate time slots based on the selected date
      const baseSlots = [
        { id: 'slot-1', time: '9:00 AM', available: true },
        { id: 'slot-2', time: '10:00 AM', available: false },
        { id: 'slot-3', time: '11:00 AM', available: true },
        { id: 'slot-4', time: '1:00 PM', available: true },
        { id: 'slot-5', time: '2:00 PM', available: false },
        { id: 'slot-6', time: '3:00 PM', available: true },
        { id: 'slot-7', time: '4:00 PM', available: true },
        { id: 'slot-8', time: '5:00 PM', available: false },
      ];

      return baseSlots;
    },

    isBookingValid: () => {
      return !!(
        state.room &&
        state.selectedDate &&
        state.selectedTime &&
        state.selectedPet &&
        !state.bookingLoading
      );
    },

    formatPrice: () => {
      return state.room ? `฿${state.room.price}` : '฿0';
    },
  };

  return {
    state,
    actions,
    helpers,
  };
}