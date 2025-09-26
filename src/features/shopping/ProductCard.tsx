import { useLanguage } from '@/src/contexts/LanguageContext';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Product } from '../../types';
import { Button, Card } from '../common';
import { BorderRadius, Colors, Layout, Spacing, Typography } from '../constants/theme';

interface ProductCardProps {
  product: Product;
  onPress?: () => void;
  onAddToCart?: () => void;
  compact?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onPress,
  onAddToCart,
  compact = false
}) => {
  const { t } = useLanguage();

  const getCategoryEmoji = (category: string) => {
    switch (category) {
      case 'food': return '🍖';
      case 'toys': return '🧸';
      case 'accessories': return '🎾';
      case 'medicine': return '💊';
      default: return '📦';
    }
  };

  return (
    <Card
      onPress={onPress}
      style={{
        ...styles.card,
        ...(compact ? styles.compactCard : {}),
      }}
      padding="md"
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: product.imageUrl || `https://via.placeholder.com/200x150?text=${getCategoryEmoji(product.category)}` }}
          style={{
            ...styles.image,
            ...(compact ? styles.compactImage : {}),
          }}
          resizeMode="cover"
        />
        {!product.inStock && (
          <View style={styles.outOfStockOverlay}>
            <Text style={styles.outOfStockText}>{t('outOfStock')}</Text>
          </View>
        )}
      </View>
      
      <View style={styles.content}>
        <Text style={{
          ...styles.name,
          ...(compact ? styles.compactName : {}),
        }} numberOfLines={2}>
          {product.name}
        </Text>
        <Text style={{
          ...styles.description,
          ...(compact ? styles.compactDescription : {}),
        }} numberOfLines={compact ? 1 : 2}>
          {product.description}
        </Text>
        
        
        <View style={styles.footer}>
          <Text style={styles.price}>฿{product.price.toLocaleString()}</Text>
          
          {product.inStock && onAddToCart && (
            <Button
              title={t('add')}
              onPress={onAddToCart}
              size="small"
              variant="outline"
              style={styles.addButton}
            />
          )}
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: Spacing.xs,
    maxWidth: (Layout.screenWidth - (Spacing.lg * 3)) / 2,
    minWidth: 160,
  },
  compactCard: {
    width: Math.min(200, Layout.screenWidth * 0.6),
    marginRight: Spacing.md,
  },
  imageContainer: {
    position: 'relative',
    marginBottom: Spacing.sm,
  },
  image: {
    width: '100%',
    height: 120,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.light.surfaceSecondary,
  },
  compactImage: {
    height: 100,
  },
  outOfStockOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  outOfStockText: {
    ...Typography.bodySmall,
    color: Colors.light.textLight,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
  name: {
    ...Typography.body,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: Spacing.xs,
  },
  compactName: {
    ...Typography.bodySmall,
  },
  description: {
    ...Typography.caption,
    color: Colors.light.textSecondary,
    marginBottom: Spacing.sm,
    lineHeight: Typography.caption.lineHeight * 1.3,
  },
  compactDescription: {
    marginBottom: Spacing.xs,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    ...Typography.h5,
    color: Colors.light.primary,
    fontWeight: 'bold',
    flex: 1,
  },
  addButton: {
    paddingHorizontal: Spacing.md,
    minWidth: 60,
  },
});