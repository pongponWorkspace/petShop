import { useLanguage } from '@/src/contexts/LanguageContext';
import { IconSymbol } from '@/src/shared/components/ui/icon-symbol';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Typography } from '../constants/theme';
import { AllCategories, useCategoryUtils } from '../utils/categoryUtils';

interface CategoryBadgeProps {
  category: AllCategories | string;
  size?: 'small' | 'medium' | 'large';
  showIcon?: boolean;
  showLabel?: boolean;
}

export const CategoryBadge: React.FC<CategoryBadgeProps> = ({
  category,
  size = 'medium',
  showIcon = true,
  showLabel = true,
}) => {
  const { t } = useLanguage();
  const categoryUtils = useCategoryUtils(t);

  const sizeStyles = {
    small: styles.small,
    medium: styles.medium,
    large: styles.large,
  };

  const iconSizes = {
    small: 12,
    medium: 16,
    large: 20,
  };

  const backgroundColor = categoryUtils.getCategoryBackgroundColor(category);
  const color = categoryUtils.getCategoryColor(category);

  return (
    <View style={[
      styles.badge,
      sizeStyles[size],
      { backgroundColor }
    ]}>
      {showIcon && (
        <IconSymbol
          name={categoryUtils.getCategoryIcon(category) as any}
          size={iconSizes[size]}
          color={color}
        />
      )}
      {showLabel && (
        <Text style={[
          styles.label,
          size === 'small' && styles.labelSmall,
          size === 'large' && styles.labelLarge,
          { color }
        ]}>
          {categoryUtils.getCategoryLabel(category)}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  small: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  medium: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  large: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  label: {
    ...Typography.caption,
    fontWeight: '600',
    marginLeft: 4,
  },
  labelSmall: {
    fontSize: 10,
    marginLeft: 3,
  },
  labelLarge: {
    fontSize: 14,
    marginLeft: 6,
  },
});