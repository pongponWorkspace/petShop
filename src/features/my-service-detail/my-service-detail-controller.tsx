
import { useLanguage } from "@/src/contexts/LanguageContext";
import { mockUserServicesNew as mockUserServices } from "@/src/data/mock";
import { UserService } from "@/src/data/types";
import { ServiceStatus } from "@/src/data/types/common";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

export function useMyServiceDetailController(id: string) {
  const router = useRouter();
  const { t } = useLanguage();

  const [loading, setLoading] = useState(true);
  const [service, setService] = useState<UserService | null>(null);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const foundService = mockUserServices.find(s => s.id === id);
      setService(foundService || null);
      setLoading(false);
    }, 1000);
  }, [id]);

  const handleUseService = () => {
    Alert.alert(
      t('useService'),
      t('confirmUseService'),
      [
        { text: t('cancel'), style: 'cancel' },
        {
          text: t('confirm'),
          onPress: () => {
            // Update service status to used
            if (service) {
              setService({
                ...service,
                status: 'used'
              });
              Alert.alert(t('serviceUsed'), t('serviceUsedMessage'));
            }
          }
        }
      ]
    );
  };

  const handleBookAgain = () => {
    router.push('/services' as any);
  };

  const getStatusText = (status: ServiceStatus) => {
    switch (status) {
      case ServiceStatus.READY_TO_USE:
        return t('readyToUse');
      case ServiceStatus.USED:
        return t('used');
      case ServiceStatus.EXPIRED:
        return t('expired');
      default:
        return status;
    }
  };

  const getServiceIcon = (serviceName?: string) => {
    if (!serviceName) return 'gift.fill';
    const name = serviceName.toLowerCase();
    if (name.includes('grooming')) return 'star.fill';
    if (name.includes('boarding')) return 'house.fill';
    if (name.includes('health')) return 'heart.fill';
    if (name.includes('training')) return 'book.fill';
    if (name.includes('spa')) return 'sparkles';
    return 'gift.fill';
  };

  const getServiceBenefits = (serviceName?: string) => {
    if (!serviceName) return [t('professionalService')];
    const name = serviceName.toLowerCase();
    if (name.includes('grooming')) {
      return [
        t('fullBodyWash'),
        t('nailTrimming'),
        t('earCleaning'),
        t('brushing'),
        t('drying'),
      ];
    }
    if (name.includes('boarding')) {
      return [
        t('24hourSupervision'),
        t('comfortableAccommodation'),
        t('dailyExercise'),
        t('feedingService'),
        t('playTime'),
      ];
    }
    if (name.includes('health')) {
      return [
        t('comprehensiveExam'),
        t('vaccinations'),
        t('healthReport'),
        t('followUpConsultation'),
        t('medicationIfNeeded'),
      ];
    }
    return [
      t('professionalService'),
      t('qualifiedStaff'),
      t('safeEnvironment'),
      t('followUpSupport'),
    ];
  };
  
  return {
    router,
    loading,
    service,
    handleUseService,
    handleBookAgain,
    getStatusText,
    getServiceIcon,
    getServiceBenefits,
    t,
  };
}