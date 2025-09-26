import { useLanguage } from '@/src/contexts/LanguageContext';
import { Coupon, getCouponStatusStyle, getStatusText, mockCoupons } from '@/src/data/mock';
import { Card } from '@/src/shared/components';
import { IconSymbol } from '@/src/shared/components/ui/icon-symbol';
import { Colors, Spacing, Typography } from '@/src/shared/constants/theme';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Section from './Section';

interface CouponSectionProps {
  coupons?: Coupon[];
}

export default function CouponSection({ coupons = mockCoupons }: CouponSectionProps) {
  const router = useRouter();
  const { t } = useLanguage();

  const getIconColor = (color: string) => {
    switch (color) {
      case 'warning': return Colors.light.warning;
      case 'secondary': return Colors.light.secondary;
      case 'error': return Colors.light.error;
      default: return Colors.light.primary;
    }
  };

  const handleCouponPress = (coupon: Coupon) => {
    router.push(`/coupon-detail?id=${coupon.id}`);
  };

  const handleViewAllPress = () => {
    router.push('/my-coupons' as any);
  };

  return (
    <Section>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
      {coupons.map((coupon) => (
        <TouchableOpacity
          key={coupon.id}
          onPress={() => handleCouponPress(coupon)}
        >
          <Card style={styles.couponCard}>
            <View style={styles.couponContent}>
              <View style={styles.couponHeader}>
                <IconSymbol
                  name={coupon.icon as any}
                  size={16}
                  color={getIconColor(coupon.color)}
                />
                <Text style={styles.couponTitle} numberOfLines={2}>
                  {coupon.title}
                </Text>
              </View>
              <Text style={styles.couponDescription} numberOfLines={3}>
                {coupon.description}
              </Text>
              <Text style={styles.couponExpiry}>{t('expiresOn')} {coupon.expiryDate}</Text>
            </View>
            <View style={[
              styles.statusBadge,
              { backgroundColor: getCouponStatusStyle(coupon.status, Colors)?.backgroundColor || Colors.light.textSecondary + '20' }
            ]}>
              <Text style={[
                styles.statusText,
                { color: getCouponStatusStyle(coupon.status, Colors)?.color || Colors.light.textSecondary }
              ]}>
                {getStatusText(coupon.status)}
              </Text>
            </View>
          </Card>
        </TouchableOpacity>
      ))}
      </ScrollView>
    </Section>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: Spacing.lg,
    paddingRight: Spacing.lg,
  },
  couponCard: {
    width: 220,
    height: 180,
    marginRight: Spacing.md,
    backgroundColor: Colors.light.primaryLight,
    padding: 0,
    justifyContent: 'space-between',
  },
  couponContent: {
    flex: 1,
    padding: Spacing.lg,
    paddingBottom: Spacing.md,
  },
  couponHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.xs,
    marginBottom: Spacing.sm,
  },
  couponTitle: {
    ...Typography.bodySmall,
    color: Colors.light.primary,
    fontWeight: '600',
    flex: 1,
    lineHeight: Typography.bodySmall.lineHeight * 1.1,
  },
  couponDescription: {
    ...Typography.caption,
    color: Colors.light.textSecondary,
    marginBottom: Spacing.sm,
    lineHeight: Typography.caption.lineHeight * 1.3,
    flex: 1,
  },
  couponExpiry: {
    ...Typography.caption,
    color: Colors.light.textTertiary,
    fontSize: 10,
  },
  statusBadge: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: 0,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusText: {
    ...Typography.caption,
    fontWeight: '600',
    fontSize: 11,
  },
});