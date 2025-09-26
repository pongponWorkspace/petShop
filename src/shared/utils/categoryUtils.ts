import { Colors } from '../constants/theme';

// Category types for type safety
export type ArticleCategory = 'health' | 'training' | 'nutrition' | 'grooming';
export type ServiceCategory = 'medical' | 'grooming' | 'boarding' | 'spa' | 'training';
export type SpecialistCategory = 'general' | 'specialist' | 'emergency' | 'preventive' | 'veterinary';
export type ProductCategory = 'food' | 'toys' | 'accessories' | 'medicine';

export type AllCategories = ArticleCategory | ServiceCategory | SpecialistCategory | ProductCategory;

/**
 * Get localized category label
 * Reusable across all features
 */
export const getCategoryLabel = (category: string, t: (key: string) => string): string => {
  switch (category) {
    // Article categories
    case 'health':
      return t('health');
    case 'training':
      return t('training');
    case 'nutrition':
      return t('nutrition');
    case 'grooming':
      return t('grooming');

    // Service categories
    case 'medical':
      return t('medical');
    case 'boarding':
      return t('boarding');
    case 'spa':
      return t('spa');

    // Specialist categories
    case 'general':
      return t('general');
    case 'specialist':
      return t('specialist');
    case 'emergency':
      return t('emergency');
    case 'preventive':
      return t('preventive');
    case 'veterinary':
      return t('veterinary');

    // Product categories
    case 'food':
      return t('food');
    case 'toys':
      return t('toys');
    case 'accessories':
      return t('accessories');
    case 'medicine':
      return t('medicine');

    default:
      return category;
  }
};

/**
 * Get category icon (SF Symbols)
 * Reusable across all features
 */
export const getCategoryIcon = (category: string): string => {
  switch (category) {
    // Article categories
    case 'health':
      return 'heart.fill';
    case 'training':
      return 'brain.head.profile';
    case 'nutrition':
      return 'leaf.fill';
    case 'grooming':
      return 'scissors';

    // Service categories
    case 'medical':
      return 'stethoscope';
    case 'boarding':
      return 'house.fill';
    case 'spa':
      return 'sparkles';

    // Specialist categories
    case 'general':
      return 'person.crop.circle.badge.checkmark';
    case 'specialist':
      return 'person.crop.circle.badge.plus';
    case 'emergency':
      return 'cross.case.fill';
    case 'preventive':
      return 'shield.checkered';
    case 'veterinary':
      return 'stethoscope';

    // Product categories
    case 'food':
      return 'bowl.fill';
    case 'toys':
      return 'tennis.racket';
    case 'accessories':
      return 'bag.fill';
    case 'medicine':
      return 'pills.fill';

    default:
      return 'questionmark.circle';
  }
};

/**
 * Get category color
 * Reusable across all features
 */
export const getCategoryColor = (category: string): string => {
  switch (category) {
    // Article categories
    case 'health':
      return Colors.light.error; // Red for health
    case 'training':
      return Colors.light.info; // Blue for training
    case 'nutrition':
      return '#28A745'; // Green for nutrition
    case 'grooming':
      return '#6F42C1'; // Purple for grooming

    // Service categories
    case 'medical':
      return Colors.light.error; // Red for medical
    case 'boarding':
      return '#FD7E14'; // Orange for boarding
    case 'spa':
      return '#E91E63'; // Pink for spa

    // Specialist categories
    case 'general':
      return Colors.light.primary; // Primary color for general
    case 'specialist':
      return Colors.light.secondary; // Secondary color for specialist
    case 'emergency':
      return Colors.light.error; // Red for emergency
    case 'preventive':
      return '#28A745'; // Green for preventive
    case 'veterinary':
      return Colors.light.info; // Blue for veterinary

    // Product categories
    case 'food':
      return '#FF9500'; // Orange for food
    case 'toys':
      return '#FF2D92'; // Pink for toys
    case 'accessories':
      return '#5856D6'; // Purple for accessories
    case 'medicine':
      return '#34C759'; // Green for medicine

    default:
      return Colors.light.textSecondary;
  }
};

/**
 * Get category background color (lighter version)
 * Reusable across all features
 */
export const getCategoryBackgroundColor = (category: string): string => {
  const baseColor = getCategoryColor(category);
  return baseColor + '20'; // Add 20% opacity
};

/**
 * Hook for category utilities
 * Use this in components for easy access
 */
export const useCategoryUtils = (t: (key: string) => string) => {
  return {
    getCategoryLabel: (category: string) => getCategoryLabel(category, t),
    getCategoryIcon,
    getCategoryColor,
    getCategoryBackgroundColor,
  };
};