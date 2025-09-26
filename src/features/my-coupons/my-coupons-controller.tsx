import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useLanguage } from '@/src/contexts/LanguageContext';
import { Coupon, getCouponStatusStyle, mockCoupons } from '@/src/data/mock';
import { Colors } from '@/src/shared/constants/theme';

type TabType = 'usable' | 'used';

export function useMyCouponsController() {
  const router = useRouter();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<TabType>('usable');
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadCoupons();
  }, []);

  const loadCoupons = () => {
    setTimeout(() => {
      setCoupons(mockCoupons);
      setLoading(false);
      setRefreshing(false);
    }, 800);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    loadCoupons();
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available':
        return t('available');
      case 'used':
        return t('used');
      case 'expired':
        return t('expired');
      default:
        return status;
    }
  };

  const usableCoupons = coupons.filter(coupon => coupon.status === 'available');
  const usedCoupons = coupons.filter(coupon => ['used', 'expired'].includes(coupon.status));

  const handleUseCoupon = (couponId: string) => {
    Alert.alert(
      t('useCoupon'),
      t('confirmUseCoupon'),
      [
        { text: t('cancel'), style: 'cancel' },
        {
          text: t('use'),
          onPress: () => {
            setCoupons(prevCoupons =>
              prevCoupons.map(coupon =>
                coupon.id === couponId ? { ...coupon, status: 'used' } : coupon
              )
            );
            Alert.alert(t('success'), t('couponUsedSuccessfully'));
          }
        }
      ]
    );
  };

  const handleCouponPress = (coupon: Coupon) => {
    router.push(`/coupon-detail?id=${coupon.id}`);
  };

  const handleBack = () => {
    router.back();
  };

  const getIconColor = (color: string) => {
    switch (color) {
      case 'warning': return Colors.light.warning;
      case 'secondary': return Colors.light.secondary;
      case 'error': return Colors.light.error;
      default: return Colors.light.primary;
    }
  };

  const currentCoupons = activeTab === 'usable' ? usableCoupons : usedCoupons;

  return {
    state: {
      activeTab,
      coupons,
      loading,
      refreshing,
      usableCoupons,
      usedCoupons,
      currentCoupons,
    },
    actions: {
      setActiveTab,
      handleRefresh,
      handleUseCoupon,
      handleCouponPress,
      handleBack,
    },
    helpers: {
      getStatusText,
      getCouponStatusStyle,
      getIconColor,
    },
    translations: {
      t,
    },
  };
}