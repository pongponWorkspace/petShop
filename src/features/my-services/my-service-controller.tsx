import { useLanguage } from "@/src/contexts/LanguageContext";
import { mockUserServicesNew as mockUserServices } from "@/src/data/mock";
import { UserService } from "@/src/data/types";
import { ServiceStatus } from "@/src/data/types/common";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";

export function useMyServiceController() {
  const router = useRouter();
  const { t } = useLanguage();

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [services, setServices] = useState<UserService[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const filters = ['all', 'ready_to_use', 'used', 'expired'];

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = () => {
    // Simulate API call
    setTimeout(() => {
      setServices(mockUserServices);
      setLoading(false);
      setRefreshing(false);
    }, 1000);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    loadServices();
  };

  const filteredServices = selectedFilter === 'all'
    ? services
    : services.filter(service => service.status === selectedFilter);

  const handleServicePress = (service: UserService) => {
    router.push(`/my-service-detail?id=${service.id}` as any);
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
    if (name.includes('boarding')) return 'house.fill';
    if (name.includes('health')) return 'heart.fill';
    if (name.includes('training')) return 'book.fill';
    if (name.includes('spa')) return 'sparkles';
    return 'gift.fill';
  };
  return {
    loading,
    refreshing,
    filteredServices,
    selectedFilter,
    setSelectedFilter,
    filters,
    handleRefresh,
    handleServicePress,
    getStatusText,
    getServiceIcon,
    t,
    router
  };
}