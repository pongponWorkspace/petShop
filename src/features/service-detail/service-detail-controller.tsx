import { useLanguage } from '@/src/contexts/LanguageContext';
import { mockAvailableServices } from '@/src/data/mock';
import { Service } from '@/src/data/types';
import { api } from '@/src/services';
import { useApi } from '@/src/shared/hooks/useApi';
import { useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { Alert } from 'react-native';


export interface ServiceDetailControllerState {
  service: Service | null;
  loading: boolean;
  bookingLoading: boolean;
  error: string | null;
}



export function useServiceDetailController(id: string) {
  const router = useRouter();
  const { t } = useLanguage();

  const [service, setService] = useState<Service | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // API hooks
  const { loading: bookingLoading, execute: executeBooking } = useApi<any>();

  // Load service
  const loadService = useCallback(async () => {
    if (!id) {
      setError(t('serviceNotFound'));
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    // Use mock data for now - simulate API call
    setTimeout(() => {
      const foundService = mockAvailableServices.find(s => s.id === id);
      if (foundService) {
        setService(foundService);
        setError(null);
      } else {
        setError(t('serviceNotFound'));
      }
      setLoading(false);
    }, 800);

    // TODO: Replace with actual API call when backend is ready
    // await execute(
    //   () => api.services.getServiceById(id),
    //   {
    //     onSuccess: (response: any) => {
    //       setService(response.data || response);
    //     },
    //     onError: (error) => {
    //       setError(t('failedToLoadService'));
    //       console.error('Failed to load service:', error);
    //     }
    //   }
    // );
  }, [id, t]);

  // Book service
  const bookService = useCallback(async () => {
    if (!service) return;

    Alert.alert(
      t('confirmBooking'),
      t('confirmServiceBooking', { serviceName: service.name, price: formatPrice(service.price) }),
      [
        { text: t('cancel'), style: 'cancel' },
        {
          text: t('book'),
          style: 'default',
          onPress: async () => {
            await executeBooking(
              () => api.bookings.createBooking({
                type: 'GROOMING',
                serviceId: service.id,
                petId: '',
                date: new Date().toISOString().split('T')[0],
                time: '09:00',
                notes: ''
              }),
              {
                onSuccess: (response) => {
                  Alert.alert(
                    t('bookingSuccess'),
                    t('serviceBookedSuccessfully'),
                    [
                      {
                        text: t('ok'),
                        onPress: () => router.push('/(tabs)')
                      }
                    ]
                  );
                },
                onError: (error) => {
                  Alert.alert(t('bookingFailed'), t('failedToBookService'));
                  console.error('Failed to book service:', error);
                }
              }
            );
          }
        }
      ]
    );
  }, [service, executeBooking, router, t]);

  // Navigate back
  const goBack = useCallback(() => {
    router.back();
  }, [router]);

  // Refresh data
  const refresh = useCallback(async () => {
    await loadService();
  }, [loadService]);

  // Helper functions
  const getCategoryLabel = useCallback((category: string) => {
    switch (category) {
      case 'training':
        return t('training');
      case 'medical':
        return t('medical');
      case 'boarding':
        return t('boarding');
      case 'spa':
        return t('spa');
      default:
        return category;
    }
  }, [t]);

  const getCategoryIcon = useCallback((category: string) => {
    switch (category) {
      case 'training':
        return 'brain.head.profile';
      case 'medical':
        return 'cross.case.fill';
      case 'boarding':
        return 'house.fill';
      case 'spa':
        return 'star.fill';
      default:
        return 'tag.fill';
    }
  }, []);

  const getCategoryColor = useCallback((category: string) => {
    switch (category) {
      case 'training':
        return '#3B82F6'; // Blue
      case 'medical':
        return '#EF4444'; // Red
      case 'boarding':
        return '#10B981'; // Green
      case 'spa':
        return '#8B5CF6'; // Purple
      default:
        return '#6B7280'; // Gray
    }
  }, []);

  const formatPrice = useCallback((price: number) => {
    return `฿${price.toLocaleString()}`;
  }, []);

  const handleBookService = () => {
    if (!service) return;

    // Show purchase dialog for all services
    Alert.alert(
      t('purchaseService'),
      t('purchaseServiceConfirmation', { name: service.name, price: formatPrice(service.price) }),
      [
        { text: t('cancel'), style: 'cancel' },
        {
          text: t('purchase'),
          onPress: () => {
            // Simulate service purchase
            Alert.alert(
              t('purchaseSuccess'),
              t('servicePurchasedSuccessfully', { name: service.name }),
              [
                {
                  text: t('viewMyServices'),
                  onPress: () => router.push('/my-services' as any)
                },
                {
                  text: t('ok'),
                  style: 'default'
                }
              ]
            );
          },
        },
      ]
    );
  };

  const handleContactUs = () => {
    Alert.alert(
      t('contactUs'),
      t('contactUsForBooking'),
      [
        { text: t('cancel'), style: 'cancel' },
        {
          text: t('call'),
          onPress: () => {
            // Handle phone call
            console.log('Call for booking');
          },
        },
      ]
    );
  };

  // Load service on mount
  useEffect(() => {
    loadService();
  }, [loadService]);

  return {
    service,
    loading,
    bookingLoading,
    error,
    loadService,
    bookService,
    goBack,
    refresh,
    getCategoryLabel,
    getCategoryIcon,
    getCategoryColor,
    formatPrice,
    handleBookService,
    handleContactUs,
    t,
    router
  };
}