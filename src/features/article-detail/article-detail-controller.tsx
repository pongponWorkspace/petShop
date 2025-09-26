import { useLanguage } from '@/src/contexts/LanguageContext';
import { api } from '@/src/services';
import { useApi } from '@/src/shared/hooks/useApi';
import { useCategoryUtils } from '@/src/shared/utils/categoryUtils';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';

export interface EducationalContent {
  id: string;
  title: string;
  description: string;
  category: 'health' | 'training' | 'nutrition' | 'grooming';
  author: string;
  imageUrl: string;
  fullContent?: string;
}

export interface ArticleDetailControllerState {
  article: EducationalContent | null;
  loading: boolean;
  error: string | null;
}

export interface ArticleDetailController {
  state: ArticleDetailControllerState;
  actions: {
    loadArticle: () => Promise<void>;
    goBack: () => void;
    refresh: () => Promise<void>;
  };
  helpers: {
    getCategoryLabel: (category: string) => string;
    getCategoryIcon: (category: string) => string;
    getCategoryColor: (category: string) => string;
  };
}

export function useArticleDetailController(): ArticleDetailController {
  const router = useRouter();
  const { t } = useLanguage();
  const { id } = useLocalSearchParams<{ id: string }>();

  const [article, setArticle] = useState<EducationalContent | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Category utilities
  const categoryUtils = useCategoryUtils(t);

  // API hook
  const { loading, execute } = useApi<EducationalContent>();

  // Load article
  const loadArticle = useCallback(async () => {
    if (!id) {
      setError(t('articleNotFound'));
      return;
    }

    setError(null);
    await execute(
      () => api.content.getArticleById(id),
      {
        onSuccess: (response: any) => {
          setArticle(response.data || response);
        },
        onError: (error) => {
          setError(t('failedToLoadArticle'));
          console.error('Failed to load article:', error);
        }
      }
    );
  }, [id, execute, t]);

  // Navigate back
  const goBack = useCallback(() => {
    router.back();
  }, [router]);

  // Refresh data
  const refresh = useCallback(async () => {
    await loadArticle();
  }, [loadArticle]);

  // Helper functions - using reusable category utils

  // Load article on mount
  useEffect(() => {
    loadArticle();
  }, [loadArticle]);

  return {
    state: {
      article,
      loading,
      error
    },
    actions: {
      loadArticle,
      goBack,
      refresh
    },
    helpers: {
      getCategoryLabel: categoryUtils.getCategoryLabel,
      getCategoryIcon: categoryUtils.getCategoryIcon,
      getCategoryColor: categoryUtils.getCategoryColor
    }
  };
}