import { useLanguage } from '@/src/contexts/LanguageContext';
import { mockEducationalContent } from '@/src/data/mock';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { EducationalContent } from '../article-detail';

export interface ArticlesState {
  loading: boolean;
  articles: EducationalContent[];
  selectedCategory: string;
  error: string | null;
}

export interface ArticlesActions {
  goBack: () => void;
  loadArticles: () => void;
  setSelectedCategory: (category: string) => void;
  handleArticlePress: (article: EducationalContent) => void;
}

export interface ArticlesHelpers {
  getFilteredArticles: () => EducationalContent[];
  getCategoryLabel: (category: string) => string;
  getAvailableCategories: () => string[];
}

export interface ArticlesController {
  state: ArticlesState;
  actions: ArticlesActions;
  helpers: ArticlesHelpers;
}

export function useArticlesController(): ArticlesController {
  const router = useRouter();
  const { t } = useLanguage();

  const [state, setState] = useState<ArticlesState>({
    loading: true,
    articles: [],
    selectedCategory: 'all',
    error: null,
  });

  const categories = ['all', 'health', 'training', 'nutrition', 'grooming'];

  const loadArticles = () => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    setTimeout(() => {
      setState(prev => ({
        ...prev,
        loading: false,
        articles: mockEducationalContent,
        error: null,
      }));
    }, 1000);
  };

  useEffect(() => {
    loadArticles();
  }, []);

  const actions: ArticlesActions = {
    goBack: () => {
      router.back();
    },

    loadArticles,

    setSelectedCategory: (category: string) => {
      setState(prev => ({ ...prev, selectedCategory: category }));
    },

    handleArticlePress: (article: EducationalContent) => {
      // Navigate to article detail or open external link
      console.log('Article pressed:', article.title);
      // You could implement navigation to article detail screen here
      // router.push(`/article-detail?id=${article.id}`);
    },
  };

  const helpers: ArticlesHelpers = {
    getFilteredArticles: () => {
      if (state.selectedCategory === 'all') {
        return state.articles;
      }
      return state.articles.filter(article =>
        article.category === state.selectedCategory
      );
    },

    getCategoryLabel: (category: string) => {
      switch (category) {
        case 'all':
          return t('all');
        case 'health':
          return t('health');
        case 'training':
          return t('training');
        case 'nutrition':
          return t('nutrition');
        case 'grooming':
          return t('grooming');
        default:
          return category;
      }
    },

    getAvailableCategories: () => {
      return categories;
    },
  };

  return {
    state,
    actions,
    helpers,
  };
}