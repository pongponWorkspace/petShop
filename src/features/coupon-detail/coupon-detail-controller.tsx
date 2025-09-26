import { useLanguage } from '@/src/contexts/LanguageContext';
import { mockCoupons } from '@/src/data/mock';
import { api, ApiCoupon } from '@/src/services';
import { useApi, useErrorModal } from '@/src/shared/hooks/useApi';
import { useCategoryUtils } from '@/src/shared/utils/categoryUtils';
import dayjs from 'dayjs';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';

export interface CouponDetailControllerState {
  coupon: ApiCoupon | null;
  loading: boolean;
  usingCoupon: boolean;
  error: string | null;
}

export interface CouponDetailController {
  state: CouponDetailControllerState;
  actions: {
    loadCouponDetail: () => Promise<void>;
    useCoupon: () => Promise<void>;
    goBack: () => void;
    refresh: () => Promise<void>;
  };
  helpers: {
    getCouponStatusStyle: (status: string) => { backgroundColor: string; color: string };
    getStatusText: (status: string) => string;
    getCategoryIcon: (color: string) => string;
    getCategoryColor: (color: string) => string;
    formatDate: (dateString: string) => string;
    isUsable: () => boolean;
    isExpired: () => boolean;
  };
}

export function useCouponDetailController(): CouponDetailController {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { t } = useLanguage();
  const { showSuccess, showError, showConfirm } = useErrorModal();

  // Category utilities
  const categoryUtils = useCategoryUtils(t);

  const [coupon, setCoupon] = useState<ApiCoupon | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { loading: detailLoading, execute: executeDetail } = useApi<ApiCoupon>();
  const { loading: useLoading, execute: executeUse } = useApi<ApiCoupon>();

  const loadCouponDetail = useCallback(async () => {
    if (!id) {
      setError('ไม่พบรหัสคูปอง');
      return;
    }

    setError(null);

    // Try to find coupon in mock data first (for development)
    const mockCoupon = mockCoupons.find(c => c.id === id);
    if (mockCoupon) {
      // Convert mock coupon status to API status format
      const convertStatusToApi = (status: string) => {
        switch (status) {
          case 'available': return 'AVAILABLE' as any;
          case 'used': return 'USED' as any;
          case 'expired': return 'EXPIRED' as any;
          default: return 'AVAILABLE' as any;
        }
      };

      // Convert mock coupon to API coupon format
      const apiCoupon: ApiCoupon = {
        id: mockCoupon.id,
        title: mockCoupon.title,
        description: mockCoupon.description,
        status: convertStatusToApi(mockCoupon.status),
        expiryDate: mockCoupon.expiryDate,
        color: mockCoupon.color || 'primary',
        icon: mockCoupon.icon || 'star.fill',
        imageUrl: mockCoupon.imageUrl,
        discountValue: mockCoupon.value,
        discountType: mockCoupon.value ? 'FIXED' : undefined,
        purchaseDate: '2024-09-01',
        terms: 'Valid for one use only. Cannot be combined with other offers. Non-transferable.'
      };
      setCoupon(apiCoupon);
      return;
    }

    // Fallback to API call if not found in mock data
    await executeDetail(
      () => api.coupons.getCouponById(id),
      {
        onSuccess: (response: any) => {
          setCoupon(response.data || response);
        },
        onError: (error) => {
          setError('ไม่สามารถโหลดข้อมูลคูปองได้');
          console.error('Failed to load coupon detail:', error);
        }
      }
    );
  }, [id, executeDetail]);

  const useCoupon = useCallback(async () => {
    if (!coupon) return;

    showConfirm(
      t('useCouponConfirm'),
      async () => {
        await executeUse(
          () => api.coupons.useCoupon(coupon.id),
          {
            onSuccess: (response: any) => {
              setCoupon(response.data || response);
              showSuccess(t('useCouponSuccess'));
            },
            onError: (error) => {
              console.error('Failed to use coupon:', error);
            }
          }
        );
      },
      {
        title: t('confirmUseCoupon'),
        confirmText: t('useCoupon'),
        cancelText: t('cancel')
      }
    );
  }, [coupon, executeUse, showSuccess, showConfirm, t]);

  const goBack = useCallback(() => {
    router.back();
  }, [router]);

  const refresh = useCallback(async () => {
    await loadCouponDetail();
  }, [loadCouponDetail]);

  // Helper functions
  const getCouponStatusStyle = useCallback((status: string) => {
    const Colors = {
      light: {
        success: '#10B981',
        textSecondary: '#6B7280',
        error: '#EF4444',
        warning: '#F59E0B',
        info: '#3B82F6'
      }
    };

    switch (status.toUpperCase()) {
      case 'AVAILABLE':
        return {
          backgroundColor: Colors.light.success + '20',
          color: Colors.light.success
        };
      case 'USED':
        return {
          backgroundColor: Colors.light.textSecondary + '20',
          color: Colors.light.textSecondary
        };
      case 'EXPIRED':
        return {
          backgroundColor: Colors.light.error + '20',
          color: Colors.light.error
        };
      default:
        return {
          backgroundColor: Colors.light.textSecondary + '20',
          color: Colors.light.textSecondary
        };
    }
  }, []);

  const getStatusText = useCallback((status: string) => {
    switch (status.toUpperCase()) {
      case 'AVAILABLE':
        return t('available');
      case 'USED':
        return t('used');
      case 'EXPIRED':
        return t('expired');
      default:
        return status;
    }
  }, [t]);

  const getCategoryIcon = useCallback((color: string) => {
    switch (color) {
      case 'warning':
        return 'star.fill';
      case 'secondary':
        return 'bag.fill';
      case 'error':
        return 'heart.fill';
      default:
        return 'star.fill';
    }
  }, []);

  const getCategoryColor = useCallback((color: string) => {
    const Colors = {
      light: {
        warning: '#F59E0B',
        secondary: '#6B7280',
        error: '#EF4444',
        primary: '#3B82F6'
      }
    };

    switch (color) {
      case 'warning':
        return Colors.light.warning;
      case 'secondary':
        return Colors.light.secondary;
      case 'error':
        return Colors.light.error;
      default:
        return Colors.light.primary;
    }
  }, []);

  const formatDate = useCallback((dateString: string) => {
    if (!dateString) return '';
    return dayjs(dateString).format('DD MMMM YYYY');
  }, []);

  const isUsable = useCallback(() => {
    if (!coupon) return false;

    const now = dayjs();
    const expiryDate = dayjs(coupon.expiryDate);
    const isStatusAvailable = coupon.status.toUpperCase() === 'AVAILABLE';
    const isNotExpired = now.isBefore(expiryDate);
    return isStatusAvailable && isNotExpired;
  }, [coupon]);

  const isExpired = useCallback(() => {
    if (!coupon) return false;

    const now = dayjs();
    const expiryDate = dayjs(coupon.expiryDate);
    return now.isAfter(expiryDate);
  }, [coupon]);

  // Load coupon detail on mount
  useEffect(() => {
    loadCouponDetail();
  }, [loadCouponDetail]);

  return {
    state: {
      coupon,
      loading: detailLoading,
      usingCoupon: useLoading,
      error
    },
    actions: {
      loadCouponDetail,
      useCoupon,
      goBack,
      refresh
    },
    helpers: {
      getCouponStatusStyle,
      getStatusText,
      getCategoryIcon,
      getCategoryColor,
      formatDate,
      isUsable,
      isExpired
    }
  };
}