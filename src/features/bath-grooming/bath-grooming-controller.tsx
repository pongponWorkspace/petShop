import { useRouter, useLocalSearchParams } from 'expo-router';
import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { mockPets } from '@/src/data/mock';
import { Pet } from '@/src/data/types';
import { useLanguage } from '@/src/contexts/LanguageContext';
import dayjs from 'dayjs';

export interface GroomingService {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  imageUrl: string;
  available: boolean;
  category: 'bath' | 'grooming' | 'combo';
}

export interface BathGroomingState {
  loading: boolean;
  services: GroomingService[];
  selectedCategory: string;
  error: string | null;
  bookingLoading: boolean;
  selectedService: GroomingService | null;
  selectedDate: string;
  selectedTime: string;
  selectedPets: Pet[];
  availablePets: Pet[];
  step: 'services' | 'booking';
}

export interface BathGroomingActions {
  goBack: () => void;
  loadServices: () => void;
  setSelectedCategory: (category: string) => void;
  handleServiceBook: (service: GroomingService) => void;
  setSelectedDate: (date: string) => void;
  setSelectedTime: (time: string) => void;
  togglePetSelection: (pet: Pet) => void;
  confirmBooking: () => void;
  backToServices: () => void;
}

export interface BathGroomingHelpers {
  getFilteredServices: () => GroomingService[];
  getCategoryLabel: (category: string) => string;
  getAvailableCategories: () => string[];
  formatPrice: (price: number) => string;
  getAvailableTimeSlots: () => string[];
  getTotalPrice: () => number;
  isBookingValid: () => boolean;
  formatDate: (date: string) => string;
}

export interface BathGroomingController {
  state: BathGroomingState;
  actions: BathGroomingActions;
  helpers: BathGroomingHelpers;
}

// Mock services data
const mockGroomingServices: GroomingService[] = [
  {
    id: '1',
    name: 'Basic Bath',
    description: 'Complete washing with premium shampoo and conditioning',
    price: 299,
    duration: '45 min',
    imageUrl: 'https://images.unsplash.com/photo-1581888227599-779811939961?w=400',
    available: true,
    category: 'bath',
  },
  {
    id: '2',
    name: 'Deluxe Bath & Dry',
    description: 'Premium bath service with blow-dry and basic brushing',
    price: 499,
    duration: '60 min',
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    available: true,
    category: 'bath',
  },
  {
    id: '3',
    name: 'Full Grooming',
    description: 'Complete grooming service with nail trim, ear cleaning, and styling',
    price: 799,
    duration: '90 min',
    imageUrl: 'https://images.unsplash.com/photo-1592754862816-1a21a4ea2281?w=400',
    available: true,
    category: 'grooming',
  },
  {
    id: '4',
    name: 'Premium Grooming',
    description: 'Luxury grooming with spa treatment and premium styling',
    price: 1299,
    duration: '120 min',
    imageUrl: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400',
    available: true,
    category: 'grooming',
  },
  {
    id: '5',
    name: 'Bath & Grooming Combo',
    description: 'Complete service package with bath, grooming, and nail care',
    price: 999,
    duration: '105 min',
    imageUrl: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400',
    available: false,
    category: 'combo',
  },
  {
    id: '6',
    name: 'Spa Day Package',
    description: 'Ultimate pampering with bath, grooming, massage, and aromatherapy',
    price: 1899,
    duration: '180 min',
    imageUrl: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400',
    available: true,
    category: 'combo',
  },
];

export function useBathGroomingController(): BathGroomingController {
  const router = useRouter();
  const { serviceId } = useLocalSearchParams<{ serviceId?: string }>();
  const { t } = useLanguage();

  const [state, setState] = useState<BathGroomingState>({
    loading: true,
    services: [],
    selectedCategory: 'all',
    error: null,
    bookingLoading: false,
    selectedService: null,
    selectedDate: '',
    selectedTime: '',
    selectedPets: [],
    availablePets: [],
    step: 'services',
  });

  const categories = ['all', 'bath', 'grooming', 'combo'];

  const loadServices = () => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    setTimeout(() => {
      const pets = mockPets.filter(pet => pet.type === 'dog' || pet.type === 'cat');

      // If we have a serviceId from the service detail (like 'service-1'),
      // we should navigate to booking with a default grooming service
      let selectedService = null;
      if (serviceId) {
        // Default to the first available grooming service for now
        selectedService = mockGroomingServices.find(s => s.available) || mockGroomingServices[0];
      }

      setState(prev => ({
        ...prev,
        loading: false,
        services: mockGroomingServices,
        availablePets: pets,
        error: null,
        step: serviceId && selectedService ? 'booking' : 'services',
        selectedService: selectedService,
      }));
    }, 1000);
  };

  useEffect(() => {
    loadServices();
  }, []);

  const actions: BathGroomingActions = {
    goBack: () => {
      router.back();
    },

    loadServices,

    setSelectedCategory: (category: string) => {
      setState(prev => ({ ...prev, selectedCategory: category }));
    },

    handleServiceBook: (service: GroomingService) => {
      if (!service.available) {
        Alert.alert(t('serviceUnavailable'), t('serviceCurrentlyUnavailable'));
        return;
      }

      setState(prev => ({
        ...prev,
        selectedService: service,
        step: 'booking',
      }));
    },

    setSelectedDate: (date: string) => {
      setState(prev => ({ ...prev, selectedDate: date }));
    },

    setSelectedTime: (time: string) => {
      setState(prev => ({ ...prev, selectedTime: time }));
    },

    togglePetSelection: (pet: Pet) => {
      setState(prev => {
        const isSelected = prev.selectedPets.some(p => p.id === pet.id);
        return {
          ...prev,
          selectedPets: isSelected
            ? prev.selectedPets.filter(p => p.id !== pet.id)
            : [...prev.selectedPets, pet],
        };
      });
    },

    confirmBooking: () => {
      setState(prev => ({ ...prev, bookingLoading: true }));

      setTimeout(() => {
        setState(prev => ({ ...prev, bookingLoading: false }));

        Alert.alert(
          t('bookingConfirmed'),
          t('groomingBookingSuccess', { service: state.selectedService?.name }),
          [
            {
              text: t('ok'),
              onPress: () => router.push('/(tabs)'),
            },
          ]
        );
      }, 2000);
    },

    backToServices: () => {
      setState(prev => ({
        ...prev,
        step: 'services',
        selectedService: null,
        selectedDate: '',
        selectedTime: '',
        selectedPets: [],
      }));
    },
  };

  const helpers: BathGroomingHelpers = {
    getFilteredServices: () => {
      if (state.selectedCategory === 'all') {
        return state.services;
      }
      return state.services.filter(service =>
        service.category === state.selectedCategory
      );
    },

    getCategoryLabel: (category: string) => {
      switch (category) {
        case 'all':
          return t('allServices');
        case 'bath':
          return t('bath');
        case 'grooming':
          return t('grooming');
        case 'combo':
          return t('comboPackages');
        default:
          return category;
      }
    },

    getAvailableCategories: () => {
      return categories;
    },

    formatPrice: (price: number) => {
      return `฿${price}`;
    },

    getAvailableTimeSlots: () => {
      return [
        '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
        '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
        '16:00', '16:30', '17:00', '17:30'
      ];
    },

    getTotalPrice: () => {
      if (!state.selectedService) return 0;
      return state.selectedService.price * state.selectedPets.length;
    },

    isBookingValid: () => {
      return !!(state.selectedService && state.selectedDate && state.selectedTime && state.selectedPets.length > 0);
    },

    formatDate: (date: string) => {
      if (!date) return '';
      return dayjs(date).format('ddd, MMM DD, YYYY');
    },
  };

  return {
    state,
    actions,
    helpers,
  };
}