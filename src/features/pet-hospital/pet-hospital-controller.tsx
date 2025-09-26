import { useLanguage } from '@/src/contexts/LanguageContext';
import { api } from '@/src/services';
import { useApi } from '@/src/shared/hooks/useApi';
import { useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';

export interface Specialist {
  id: string;
  name: string;
  description: string;
  services: string[];
  imageUrl: string;
}

export interface PetHospitalControllerState {
  specialists: Specialist[];
  loading: boolean;
  error: string | null;
}

export interface PetHospitalController {
  state: PetHospitalControllerState;
  actions: {
    loadSpecialists: () => Promise<void>;
    handleSpecialistSelect: (specialistId: string) => void;
    goBack: () => void;
    refresh: () => Promise<void>;
  };
  helpers: {
    getSpecialistIcon: (specialistId: string) => string;
    getSpecialistColor: (specialistId: string) => string;
  };
}

export function usePetHospitalController(): PetHospitalController {
  const router = useRouter();
  const { t } = useLanguage();

  const [specialists, setSpecialists] = useState<Specialist[]>([]);
  const [error, setError] = useState<string | null>(null);

  // API hook
  const { loading, execute } = useApi<Specialist[]>();

  // Load specialists
  const loadSpecialists = useCallback(async () => {
    setError(null);
    await execute(
      () => api.hospital.getSpecialists(),
      {
        onSuccess: (response: any) => {
          setSpecialists(response.data || response || []);
        },
        onError: (error) => {
          setError(t('failedToLoadSpecialists'));
          console.error('Failed to load specialists:', error);
        }
      }
    );
  }, [execute, t]);

  // Handle specialist selection
  const handleSpecialistSelect = useCallback((specialistId: string) => {
    router.push(`/hospital-booking?specialistId=${specialistId}`);
  }, [router]);

  // Navigate back
  const goBack = useCallback(() => {
    router.back();
  }, [router]);

  // Refresh data
  const refresh = useCallback(async () => {
    await loadSpecialists();
  }, [loadSpecialists]);

  // Helper functions
  const getSpecialistIcon = useCallback((specialistId: string) => {
    switch (specialistId) {
      case '1':
        return 'heart.fill';
      case '2':
        return 'cross.case.fill';
      default:
        return 'stethoscope';
    }
  }, []);

  const getSpecialistColor = useCallback((specialistId: string) => {
    switch (specialistId) {
      case '1':
        return '#EF4444'; // Red
      case '2':
        return '#3B82F6'; // Blue
      default:
        return '#10B981'; // Green
    }
  }, []);

  // Load specialists on mount
  useEffect(() => {
    loadSpecialists();
  }, [loadSpecialists]);

  return {
    state: {
      specialists,
      loading,
      error
    },
    actions: {
      loadSpecialists,
      handleSpecialistSelect,
      goBack,
      refresh
    },
    helpers: {
      getSpecialistIcon,
      getSpecialistColor
    }
  };
}