
import { useLanguage } from "@/src/contexts/LanguageContext";
import { usePoints } from "@/src/pointsService";
import { Colors } from "@/src/shared/constants/theme";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert } from "react-native";


interface Reward {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  points: number;
  category: 'service' | 'product' | 'special';
  available: boolean;
  imageUrl: string;
  validityDays: number;
  terms: string[];
}

const getRewardData = (t: (key: string) => string): Reward[] => [
  {
    id: '1',
    title: t('freeBasicGrooming'),
    description: t('freeBasicGroomingDesc'),
    fullDescription: t('freeBasicGroomingFull'),
    points: 500,
    category: 'service',
    available: true,
    imageUrl: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=300&fit=crop',
    validityDays: 90,
    terms: [
      t('validFor90Days'),
      t('advanceBookingRequired'),
      t('nonTransferable'),
      t('cancellation24Hours'),
    ],
  },
  {
    id: '2',
    title: t('discountPremiumFood'),
    description: t('discountPremiumFoodDesc'),
    fullDescription: t('discountPremiumFoodFull'),
    points: 250,
    category: 'product',
    available: true,
    imageUrl: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=400&h=300&fit=crop',
    validityDays: 30,
    terms: [
      t('validFor30Days'),
      t('cannotCombineOffers'),
      t('inStoreOnly'),
      t('limitOnePerCustomer'),
    ],
  },
  {
    id: '3',
    title: t('freeHealthCheckup'),
    description: t('freeHealthCheckupDesc'),
    fullDescription: t('freeHealthCheckupFull'),
    points: 800,
    category: 'service',
    available: true,
    imageUrl: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=400&h=300&fit=crop',
    validityDays: 120,
    terms: [
      t('validFor120Days'),
      t('advanceBookingRequired'),
      t('includesBasicExam'),
      t('medicationNotIncluded'),
    ],
  },
  {
    id: '4',
    title: t('petTrainingSession'),
    description: t('petTrainingSessionDesc'),
    fullDescription: t('petTrainingSessionFull'),
    points: 600,
    category: 'service',
    available: false,
    imageUrl: 'https://images.unsplash.com/photo-1554456854-55a089fd4cb2?w=400&h=300&fit=crop',
    validityDays: 60,
    terms: [
      t('validFor60Days'),
      t('sessionDuration1Hour'),
      t('advanceBookingRequired'),
      t('ownerParticipationRequired'),
    ],
  },
  {
    id: '5',
    title: t('premiumToyBundle'),
    description: t('premiumToyBundleDesc'),
    fullDescription: t('premiumToyBundleFull'),
    points: 300,
    category: 'product',
    available: true,
    imageUrl: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=300&fit=crop',
    validityDays: 45,
    terms: [
      t('validFor45Days'),
      t('includes5Toys'),
      t('inStorePickupOnly'),
      t('limitOnePerPet'),
    ],
  },
  {
    id: '6',
    title: t('vipSpaPackage'),
    description: t('vipSpaPackageDesc'),
    fullDescription: t('vipSpaPackageFull'),
    points: 1200,
    category: 'special',
    available: true,
    imageUrl: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop',
    validityDays: 180,
    terms: [
      t('validFor180Days'),
      t('includes4HourSession'),
      t('advanceBooking48Hours'),
      t('premiumServicePackage'),
    ],
  },
];

export function useRewardDetailController(id: string) {
  const router = useRouter();
  const { t } = useLanguage();
  const { pointsData, redeemPoints } = usePoints();

  const [loading, setLoading] = useState(true);
  const [reward, setReward] = useState<Reward | null>(null);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const foundReward = getRewardData(t).find(r => r.id === id);
      setReward(foundReward || null);
      setLoading(false);
    }, 800);
  }, [id, t]);

  const getCategoryIcon = (category: Reward['category']) => {
    switch (category) {
      case 'service':
        return 'calendar';
      case 'product':
        return 'bag.fill';
      case 'special':
        return 'star.fill';
    }
  };

  const getCategoryColor = (category: Reward['category']) => {
    switch (category) {
      case 'service':
        return Colors.light.primary;
      case 'product':
        return Colors.light.secondary;
      case 'special':
        return Colors.light.warning;
    }
  };

  const getCategoryLabel = (category: Reward['category']) => {
    switch (category) {
      case 'service':
        return t('service');
      case 'product':
        return t('product');
      case 'special':
        return t('special');
    }
  };

  const canRedeem = (points: number) => points <= pointsData.totalPoints;

  const handleRedeem = () => {
    if (!reward || !canRedeem(reward.points) || !reward.available) return;

    Alert.alert(
      t('redeemReward'),
      t('redeemConfirmation', { title: reward.title, points: reward.points }),
      [
        { text: t('cancel'), style: 'cancel' },
        {
          text: t('redeem'),
          onPress: () => {
            const success = redeemPoints(reward.points, reward.title);
            if (success) {
              Alert.alert(
                t('success'),
                t('redeemSuccess', { title: reward.title }),
                [{ text: t('ok'), onPress: () => router.back() }]
              );
            } else {
              Alert.alert(t('error'), t('redeemError'));
            }
          },
        },
      ]
    );
  };
  return {
    loading,
    reward,
    getCategoryIcon,
    getCategoryColor,
    getCategoryLabel,
    canRedeem,
    handleRedeem,
    userPoints: pointsData.totalPoints,
    t,
    router,
  };
}