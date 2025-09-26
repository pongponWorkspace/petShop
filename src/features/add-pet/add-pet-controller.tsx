import { useLanguage } from '@/src/contexts/LanguageContext';
import { api } from '@/src/services';
import { useApi } from '@/src/shared/hooks/useApi';
import { useRouter } from 'expo-router';
import { useCallback, useRef, useState } from 'react';
import { Alert, Keyboard, TextInput } from 'react-native';

export interface FormData {
  name: string;
  type: 'dog' | 'cat' | 'other';
  breed: string;
  age: string;
  weight: string;
  allergies: string;
  congenitalDiseases: string;
  attendingVeterinarianName: string;
  attendingVeterinarianPhone: string;
}

export interface AddPetControllerState {
  formData: FormData;
  loading: boolean;
  error: string | null;
}

export interface AddPetController {
  state: AddPetControllerState;
  actions: {
    updateFormData: (field: keyof FormData, value: string) => void;
    handleSubmit: () => Promise<void>;
    goBack: () => void;
    focusInput: (field: keyof FormData) => void;
    scrollToTop: () => void;
  };
  helpers: {
    isFormValid: () => boolean;
    getPetTypeLabel: (type: string) => string;
  };
  refs: {
    scrollViewRef: React.RefObject<any>;
    inputRefs: React.MutableRefObject<{ [key in keyof FormData]?: TextInput }>;
  };
}

export function useAddPetController(): AddPetController {
  const router = useRouter();
  const { t } = useLanguage();
  const scrollViewRef = useRef<any>(null);
  const inputRefs = useRef<{ [key in keyof FormData]?: TextInput }>({});

  const [formData, setFormData] = useState<FormData>({
    name: '',
    type: 'dog',
    breed: '',
    age: '',
    weight: '',
    allergies: '',
    congenitalDiseases: '',
    attendingVeterinarianName: '',
    attendingVeterinarianPhone: '',
  });

  const [error, setError] = useState<string | null>(null);

  // API hook
  const { loading, execute } = useApi<any>();

  // Update form data
  const updateFormData = useCallback((field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setError(null);
  }, []);

  // Validation helpers
  const isFormValid = useCallback(() => {
    return formData.name.trim() !== '' &&
           formData.breed.trim() !== '' &&
           formData.age.trim() !== '' &&
           formData.weight.trim() !== '' &&
           !isNaN(Number(formData.age)) &&
           !isNaN(Number(formData.weight));
  }, [formData]);


  const goBack = useCallback(() => {
    router.back();
  }, [router]);

  // Helper functions
  const getPetTypeLabel = useCallback((type: string) => {
    switch (type) {
      case 'dog':
        return t('dog');
      case 'cat':
        return t('cat');
      case 'other':
        return t('other');
      default:
        return type;
    }
  }, [t]);


  const focusInput = useCallback((field: keyof FormData) => {
    inputRefs.current[field]?.focus();
  }, []);

  const scrollToTop = useCallback(() => {
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  }, []);

  // Submit form
  const handleSubmit = useCallback(async () => {
    if (!isFormValid()) {
      Alert.alert(t('validationError'), t('pleaseCompleteRequiredFields'));
      return;
    }

    const petData = {
      name: formData.name.trim(),
      type: formData.type,
      breed: formData.breed.trim(),
      age: parseInt(formData.age),
      weight: parseFloat(formData.weight),
      allergies: formData.allergies.trim().split(',').map(s => s.trim()).filter(s => s),
      congenitalDiseases: formData.congenitalDiseases.trim().split(',').map(s => s.trim()).filter(s => s),
      attendingVeterinarian: formData.attendingVeterinarianName.trim() ? {
        name: formData.attendingVeterinarianName.trim(),
        phone: formData.attendingVeterinarianPhone.trim()
      } : undefined,
      medicalHistory: [],
      imageUrl: undefined
    };

    await execute(
      () => api.pets.createPet(petData),
      {
        onSuccess: (response) => {
          Alert.alert(
            t('success'),
            t('petAddedSuccessfully'),
            [
              {
                text: t('ok'),
                onPress: () => router.push('/(tabs)/pets' as any)
              }
            ]
          );
        },
        onError: (error) => {
          setError(t('failedToAddPet'));
          console.error('Failed to add pet:', error);
        }
      }
    );
  }, [formData, isFormValid, execute, router, t]);

  return {
    state: {
      formData,
      loading,
      error
    },
    actions: {
      updateFormData,
      handleSubmit,
      goBack,
      focusInput,
      scrollToTop
    },
    helpers: {
      isFormValid,
      getPetTypeLabel
    },
    refs: {
      scrollViewRef,
      inputRefs
    }
  };
}