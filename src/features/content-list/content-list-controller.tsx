import { useLanguage } from '@/src/contexts/LanguageContext';
import { mockCoupons, mockEducationalContent, mockNewsItems, mockUserServices } from '@/src/data/mock';
import { Coupon, UserService } from '@/src/data/types';
import { NewsItem } from '@/src/data/types/common';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { EducationalContent } from '../article-detail';

export type ContentType = 'articles' | 'news' | 'coupons' | 'services' | 'bookings';

export interface ContentListState {
  loading: boolean;
  contentType: ContentType;
  items: any[];
  error: string | null;
  selectedFilter: string;
}

export interface ContentListActions {
  goBack: () => void;
  loadContent: () => void;
  setSelectedFilter: (filter: string) => void;
  handleItemPress: (item: any) => void;
}

export interface ContentListHelpers {
  getFilteredItems: () => any[];
  getAvailableFilters: () => string[];
  getFilterLabel: (filter: string) => string;
  getContentTitle: () => string;
  getEmptyMessage: () => string;
}

export interface ContentListController {
  state: ContentListState;
  actions: ContentListActions;
  helpers: ContentListHelpers;
}

export function useContentListController(): ContentListController {
  const router = useRouter();
  const { type } = useLocalSearchParams<{ type: ContentType }>();
  const { t } = useLanguage();

  const [state, setState] = useState<ContentListState>({
    loading: true,
    contentType: (type as ContentType) || 'articles',
    items: [],
    error: null,
    selectedFilter: 'all',
  });

  const loadContent = () => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    setTimeout(() => {
      let items: any[] = [];

      switch (state.contentType) {
        case 'articles':
          items = mockEducationalContent;
          break;
        case 'news':
          items = mockNewsItems;
          break;
        case 'coupons':
          items = mockCoupons;
          break;
        case 'services':
          items = mockUserServices;
          break;
        case 'bookings':
          items = []; // Will be populated from booking mock data
          break;
        default:
          items = mockEducationalContent;
      }

      setState(prev => ({
        ...prev,
        loading: false,
        items,
        error: null,
      }));
    }, 1000);
  };

  useEffect(() => {
    setState(prev => ({ ...prev, contentType: (type as ContentType) || 'articles' }));
  }, [type]);

  useEffect(() => {
    loadContent();
  }, [state.contentType]);

  const actions: ContentListActions = {
    goBack: () => {
      router.back();
    },

    loadContent,

    setSelectedFilter: (filter: string) => {
      setState(prev => ({ ...prev, selectedFilter: filter }));
    },

    handleItemPress: (item: any) => {
      const { contentType } = state;

      switch (contentType) {
        case 'articles':
          router.push({
            pathname: '/article-detail' as any,
            params: { id: item.id }
          } as any);
          break;
        case 'news':
          // Navigate to news detail or just show image
          console.log('News item pressed:', item.title);
          break;
        case 'coupons':
          router.push({
            pathname: '/coupon-detail' as any,
            params: { id: item.id }
          } as any);
          break;
        case 'services':
          router.push({
            pathname: '/my-service-detail' as any,
            params: { id: item.id }
          } as any);
          break;
        case 'bookings':
          router.push({
            pathname: '/booking-history' as any,
            params: { id: item.id }
          } as any);
          break;
      }
    },
  };

  const helpers: ContentListHelpers = {
    getFilteredItems: () => {
      const { selectedFilter, items, contentType } = state;

      if (selectedFilter === 'all') {
        return items;
      }

      switch (contentType) {
        case 'articles':
          return items.filter((item: EducationalContent) => item.category === selectedFilter);
        case 'news':
          return items.filter((item: NewsItem) => item.type === selectedFilter);
        case 'coupons':
          return items.filter((item: Coupon) => item.status === selectedFilter);
        case 'services':
          return items.filter((item: UserService) => item.status === selectedFilter);
        default:
          return items;
      }
    },

    getAvailableFilters: () => {
      const { contentType } = state;

      switch (contentType) {
        case 'articles':
          return ['all', 'health', 'training', 'nutrition', 'grooming'];
        case 'news':
          return ['all', 'news', 'announcement'];
        case 'coupons':
          return ['all', 'available', 'used', 'expired'];
        case 'services':
          return ['all', 'ready_to_use', 'used', 'expired'];
        case 'bookings':
          return ['all', 'confirmed', 'upcoming', 'completed'];
        default:
          return ['all'];
      }
    },

    getFilterLabel: (filter: string) => {
      switch (filter) {
        // General
        case 'all':
          return t('all');

        // Articles
        case 'health':
          return t('health');
        case 'training':
          return t('training');
        case 'nutrition':
          return t('nutrition');
        case 'grooming':
          return t('grooming');

        // News
        case 'news':
          return t('news');
        case 'announcement':
          return t('announcement');

        // Coupons & Services
        case 'available':
          return t('available');
        case 'ready_to_use':
          return t('readyToUse');
        case 'used':
          return t('used');
        case 'expired':
          return t('expired');

        // Bookings
        case 'confirmed':
          return t('confirmed');
        case 'upcoming':
          return t('upcoming');
        case 'completed':
          return t('completed');

        default:
          return filter;
      }
    },

    getContentTitle: () => {
      const { contentType } = state;

      switch (contentType) {
        case 'articles':
          return t('allArticles');
        case 'news':
          return t('newsAndAnnouncements');
        case 'coupons':
          return t('allCoupons');
        case 'services':
          return t('myServices');
        case 'bookings':
          return t('myBookings');
        default:
          return t('content');
      }
    },

    getEmptyMessage: () => {
      const { contentType } = state;

      switch (contentType) {
        case 'articles':
          return t('noArticlesFound');
        case 'news':
          return t('noNewsFound');
        case 'coupons':
          return t('noCouponsFound');
        case 'services':
          return t('noServicesFound');
        case 'bookings':
          return t('noBookingsFound');
        default:
          return t('noContentFound');
      }
    },
  };

  return {
    state,
    actions,
    helpers,
  };
}