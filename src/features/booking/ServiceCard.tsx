import { Card } from '@/src/shared/components';
import { BorderRadius, Colors, Layout, Spacing, Typography } from '@/src/shared/constants/theme';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Service } from '../service-detail';

interface ServiceCardProps {
  service: Service;
  onPress?: () => void;
  compact?: boolean;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ 
  service, 
  onPress,
  compact = false 
}) => {
  return (
    <Card 
      onPress={onPress}
      style={compact ? styles.compactCard : styles.card}
      padding="md"
    >
      <Image 
        source={{ uri: service.imageUrl || 'https://via.placeholder.com/300x160?text=Service' }} 
        style={compact ? styles.compactImage : styles.image}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <Text style={compact ? styles.compactName : styles.name} numberOfLines={compact ? 1 : 2}>
          {service.name}
        </Text>
        <Text style={compact ? styles.compactDescription : styles.description} numberOfLines={compact ? 1 : 2}>
          {service.description}
        </Text>
        <View style={styles.footer}>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>฿{service.price.toLocaleString()}</Text>
          </View>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: Spacing.lg,
    marginVertical: Spacing.sm,
    maxWidth: Layout.cardMaxWidth,
  },
  compactCard: {
    marginHorizontal: 0,
    width: Math.min(280, Layout.screenWidth * 0.75),
  },
  image: {
    width: '100%',
    height: 140,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.md,
    backgroundColor: Colors.light.surfaceSecondary,
  },
  compactImage: {
    width: '100%',
    height: 100,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.md,
    backgroundColor: Colors.light.surfaceSecondary,
  },
  content: {
    flex: 1,
  },
  name: {
    ...Typography.h5,
    color: Colors.light.text,
    marginBottom: Spacing.sm,
  },
  compactName: {
    ...Typography.body,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: Spacing.sm,
  },
  description: {
    ...Typography.bodySmall,
    color: Colors.light.textSecondary,
    marginBottom: Spacing.md,
    lineHeight: Typography.bodySmall.lineHeight * 1.3,
  },
  compactDescription: {
    ...Typography.caption,
    color: Colors.light.textSecondary,
    marginBottom: Spacing.sm,
    lineHeight: Typography.caption.lineHeight * 1.3,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  priceContainer: {
    flex: 1,
  },
  priceLabel: {
    ...Typography.caption,
    color: Colors.light.textTertiary,
    marginBottom: 2,
  },
  price: {
    ...Typography.h5,
    color: Colors.light.primary,
    fontWeight: 'bold',
  },
  durationContainer: {
    backgroundColor: Colors.light.surfaceSecondary,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
  },
  duration: {
    ...Typography.caption,
    color: Colors.light.textSecondary,
    fontWeight: '500',
  },
});