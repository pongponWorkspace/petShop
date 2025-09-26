import { useLanguage } from '@/src/contexts/LanguageContext';
import { api } from '@/src/services';
import { useApi } from '@/src/shared/hooks/useApi';
import { Pet } from '@/types';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { Alert, Platform } from 'react-native';

export interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

export interface DateSlot {
  date: string;
  dayName: string;
  dayNumber: string;
  timeSlots: TimeSlot[];
}

export interface Specialist {
  id: string;
  name: string;
  description: string;
}

export interface BookingRequest {
  specialistId: string;
  petId: string;
  date: string;
  timeSlotId: string;
  appointmentReason?: string;
  initialSymptoms?: string;
  requestVeterinarian?: string;
  notes?: string;
}

export interface HospitalBookingControllerState {
  specialist: Specialist | null;
  pets: Pet[];
  dateSlots: DateSlot[];
  selectedDate: Date;
  selectedTime: string | null;
  selectedPet: Pet | null;
  showDatePicker: boolean;
  appointmentReason: string;
  initialSymptoms: string;
  requestVeterinarian: string;
  notes: string;
  loading: boolean;
  petsLoading: boolean;
  bookingLoading: boolean;
  error: string | null;
}

export interface HospitalBookingController {
  state: HospitalBookingControllerState;
  actions: {
    loadSpecialist: () => Promise<void>;
    loadPets: () => Promise<void>;
    loadAvailableSlots: () => Promise<void>;
    handleDateChange: (event: any, date?: Date) => void;
    handleTimeSelect: (timeId: string) => void;
    handlePetSelect: (pet: Pet) => void;
    setAppointmentReason: (reason: string) => void;
    setInitialSymptoms: (symptoms: string) => void;
    setRequestVeterinarian: (vet: string) => void;
    setNotes: (notes: string) => void;
    setShowDatePicker: (show: boolean) => void;
    handleBookAppointment: () => Promise<void>;
    goBack: () => void;
  };
  helpers: {
    isBookingValid: () => boolean;
    getSelectedDateSlot: () => DateSlot | undefined;
    formatSelectedDate: () => string;
    getAvailableTimeSlots: () => TimeSlot[];
  };
}

export function useHospitalBookingController(): HospitalBookingController {
  const params = useLocalSearchParams();
  const router = useRouter();
  const { t } = useLanguage();
  const { specialistId, hospitalType } = params;

  // State
  const [specialist, setSpecialist] = useState<Specialist | null>(null);
  const [pets, setPets] = useState<Pet[]>([]);
  const [dateSlots, setDateSlots] = useState<DateSlot[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date(Date.now() + 24 * 60 * 60 * 1000));
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [appointmentReason, setAppointmentReason] = useState<string>('');
  const [initialSymptoms, setInitialSymptoms] = useState<string>('');
  const [requestVeterinarian, setRequestVeterinarian] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  // API hooks
  const { loading: specialistLoading, execute: executeLoadSpecialist } = useApi<Specialist>();
  const { loading: petsLoading, execute: executeLoadPets } = useApi<Pet[]>();
  const { loading: slotsLoading, execute: executeLoadSlots } = useApi<DateSlot[]>();
  const { loading: bookingLoading, execute: executeBooking } = useApi<any>();

  // Load specialist data
  const loadSpecialist = useCallback(async () => {
    if (hospitalType) {
      // Create a mock specialist based on hospitalType
      const mockSpecialist = {
        id: hospitalType as string,
        name: hospitalType === 'specialist' ? t('specialistHospital') : t('generalHospital'),
        description: hospitalType === 'specialist' ? t('specialistHospitalDesc') : t('generalHospitalDesc')
      };
      setSpecialist(mockSpecialist);
    } else if (specialistId) {
      await executeLoadSpecialist(
        () => api.hospital.getSpecialist(specialistId as string),
        {
          onSuccess: (response: any) => {
            setSpecialist(response.data || response);
          },
          onError: (error) => {
            setError(t('failedToLoadSpecialist'));
            console.error('Failed to load specialist:', error);
          }
        }
      );
    } else {
      setError(t('specialistNotFound'));
    }
  }, [specialistId, hospitalType, executeLoadSpecialist, t]);

  // Load pets data
  const loadPets = useCallback(async () => {
    await executeLoadPets(
      () => api.pets.getPets(),
      {
        onSuccess: (response: any) => {
          setPets(response.data || response);
        },
        onError: (error) => {
          setError(t('failedToLoadPets'));
          console.error('Failed to load pets:', error);
        }
      }
    );
  }, [executeLoadPets, t]);

  // Load available time slots
  const loadAvailableSlots = useCallback(async () => {
    if (!specialistId) return;

    await executeLoadSlots(
      () => api.hospital.getAvailableSlots(specialistId as string),
      {
        onSuccess: (response: any) => {
          setDateSlots(response.data || response);
        },
        onError: (error) => {
          setError(t('failedToLoadAvailableSlots'));
          console.error('Failed to load available slots:', error);
        }
      }
    );
  }, [specialistId, executeLoadSlots, t]);

  // Handle date change
  const handleDateChange = useCallback((event: any, date?: Date) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }
    if (date) {
      setSelectedDate(date);
      setSelectedTime(null); // Reset time when date changes
    }
  }, []);

  // Handle time selection
  const handleTimeSelect = useCallback((timeId: string) => {
    setSelectedTime(timeId);
  }, []);

  // Handle pet selection
  const handlePetSelect = useCallback((pet: Pet) => {
    setSelectedPet(pet);
  }, []);

  // Handle booking appointment
  const handleBookAppointment = useCallback(async () => {
    if (!selectedTime || !selectedPet || !specialist) {
      Alert.alert(t('incompleteInformation'), t('selectTimeAndPet'));
      return;
    }

    const bookingData: BookingRequest = {
      specialistId: specialist.id,
      petId: selectedPet.id,
      date: selectedDate.toISOString().split('T')[0],
      timeSlotId: selectedTime,
      appointmentReason: appointmentReason.trim() || undefined,
      initialSymptoms: initialSymptoms.trim() || undefined,
      requestVeterinarian: requestVeterinarian.trim() || undefined,
      notes: notes.trim() || undefined,
    };

    Alert.alert(
      '⚠️ ' + t('confirmBooking'),
      t('bookingCannotBeCancelledConfirm'),
      [
        { text: t('cancel'), style: 'cancel' },
        {
          text: t('confirmBooking'),
          style: 'destructive',
          onPress: async () => {
            await executeBooking(
              () => api.hospital.createBooking(bookingData),
              {
                onSuccess: (response) => {
                  Alert.alert(
                    t('bookingConfirmed'),
                    t('appointmentBookedSuccessfully', { bookingId: `#${response?.id || 'UNKNOWN'}` }),
                    [
                      {
                        text: t('ok'),
                        onPress: () => {
                          // Navigate back to home and trigger refresh
                          router.push('/(tabs)');
                          // Optionally trigger a refresh event or refetch data
                          // This could be handled by a global state manager or event system
                        }
                      }
                    ]
                  );
                },
                onError: (error) => {
                  Alert.alert(t('bookingFailed'), t('failedToCreateBooking'));
                  console.error('Failed to create booking:', error);
                }
              }
            );
          }
        }
      ]
    );
  }, [
    selectedTime,
    selectedPet,
    specialist,
    selectedDate,
    appointmentReason,
    initialSymptoms,
    requestVeterinarian,
    notes,
    executeBooking,
    t,
    router
  ]);

  // Navigate back
  const goBack = useCallback(() => {
    router.back();
  }, [router]);

  // Helper functions
  const isBookingValid = useCallback(() => {
    return !!(selectedTime && selectedPet);
  }, [selectedTime, selectedPet]);

  const getSelectedDateSlot = useCallback(() => {
    const selectedDateString = selectedDate.toISOString().split('T')[0];
    return dateSlots.find(slot => slot.date === selectedDateString);
  }, [selectedDate, dateSlots]);

  const formatSelectedDate = useCallback(() => {
    return selectedDate.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }, [selectedDate]);

  // Generate 24-hour time slots
  const getAvailableTimeSlots = useCallback(() => {
    const timeSlots = [];

    // Generate time slots from 00:00 to 23:00
    for (let hour = 0; hour < 24; hour++) {
      const timeString = `${hour.toString().padStart(2, '0')}:00`;
      const id = `${hour}`;

      // Mark some slots as unavailable for demo (randomly)
      const isUnavailable = Math.random() < 0.2; // 20% chance of being unavailable

      timeSlots.push({
        id,
        time: timeString,
        available: !isUnavailable
      });
    }

    return timeSlots;
  }, []);

  // Load data on mount
  useEffect(() => {
    loadSpecialist();
    loadPets();
    loadAvailableSlots();
  }, [loadSpecialist, loadPets, loadAvailableSlots]);

  return {
    state: {
      specialist,
      pets,
      dateSlots,
      selectedDate,
      selectedTime,
      selectedPet,
      showDatePicker,
      appointmentReason,
      initialSymptoms,
      requestVeterinarian,
      notes,
      loading: specialistLoading || slotsLoading,
      petsLoading,
      bookingLoading,
      error
    },
    actions: {
      loadSpecialist,
      loadPets,
      loadAvailableSlots,
      handleDateChange,
      handleTimeSelect,
      handlePetSelect,
      setAppointmentReason,
      setInitialSymptoms,
      setRequestVeterinarian,
      setNotes,
      setShowDatePicker,
      handleBookAppointment,
      goBack
    },
    helpers: {
      isBookingValid,
      getSelectedDateSlot,
      formatSelectedDate,
      getAvailableTimeSlots
    }
  };
}