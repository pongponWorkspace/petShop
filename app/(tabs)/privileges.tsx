import { useLanguage } from '@/src/contexts/LanguageContext';
import { usePoints } from '@/src/pointsService';
import { Button, Card, CollapsibleHeader } from '@/src/shared/components';
import { IconSymbol } from '@/src/shared/components/ui/icon-symbol';
import { BorderRadius, Colors, Spacing, Typography } from '@/src/shared/constants/theme';
import { useRouter } from 'expo-router';
import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

enum CouponStatus {
  AVAILABLE = 'available',
  USED = 'used',
  EXPIRED = 'expired'
}

interface Reward {
  id: string;
  title: string;
  description: string;
  points: number;
  category: 'service' | 'product' | 'special';
  available: boolean;
}


const getRewardData = (t: (key: string) => string): Reward[] => [
  {
    id: '1',
    title: t('freeBasicGrooming'),
    description: t('freeBasicGroomingDesc'),
    points: 500,
    category: 'service',
    available: true,
  },
  {
    id: '2',
    title: t('discountPremiumFood'),
    description: t('discountPremiumFoodDesc'),
    points: 250,
    category: 'product',
    available: true,
  },
  {
    id: '3',
    title: t('freeHealthCheckup'),
    description: t('freeHealthCheckupDesc'),
    points: 800,
    category: 'service',
    available: true,
  },
  {
    id: '4',
    title: t('petTrainingSession'),
    description: t('petTrainingSessionDesc'),
    points: 600,
    category: 'service',
    available: false,
  },
  {
    id: '5',
    title: t('premiumToyBundle'),
    description: t('premiumToyBundleDesc'),
    points: 300,
    category: 'product',
    available: true,
  },
  {
    id: '6',
    title: t('vipSpaPackage'),
    description: t('vipSpaPackageDesc'),
    points: 1200,
    category: 'special',
    available: true,
  },
];


export default function PrivilegesScreen() {
  const { pointsData, redeemPoints } = usePoints();
  const router = useRouter();
  const { t } = useLanguage();


  const getCategoryIcon = (category: Reward['category']) => {
    switch (category) {
      case 'service':
        return 'calendar';
      case 'product':
        return 'bag.fill';
      case 'special':
        return 'star.fill';
    }
  };

  const getCategoryColor = (category: Reward['category']) => {
    switch (category) {
      case 'service':
        return Colors.light.primary;
      case 'product':
        return Colors.light.secondary;
      case 'special':
        return Colors.light.warning;
    }
  };

  const canRedeem = (points: number) => points <= pointsData.totalPoints;

  const handleRedeem = (reward: Reward) => {
    if (!canRedeem(reward.points) || !reward.available) return;

    Alert.alert(
      t('redeemReward'),
      t('redeemConfirmation', {title: reward.title, points: reward.points}),
      [
        { text: t('cancel'), style: 'cancel' },
        {
          text: t('redeem'),
          onPress: () => {
            const success = redeemPoints(reward.points, reward.title);
            if (success) {
              Alert.alert(t('success'), t('redeemSuccess', {title: reward.title}));
            } else {
              Alert.alert(t('error'), t('redeemError'));
            }
          },
        },
      ]
    );
  };


  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <CollapsibleHeader title={t('privilegesRewards')}>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('availableRewards')}</Text>
          {getRewardData(t).map((reward) => (
            <TouchableOpacity
              key={reward.id}
              onPress={() => router.push(`/reward-detail?id=${reward.id}`)}
              activeOpacity={0.7}
            >
              <Card style={styles.rewardCard}>
                <View style={styles.rewardHeader}>
                  <View style={styles.rewardIcon}>
                    <IconSymbol
                      name={getCategoryIcon(reward.category)}
                      size={20}
                      color={getCategoryColor(reward.category)}
                    />
                  </View>
                  <View style={styles.rewardInfo}>
                    <Text style={styles.rewardTitle}>{reward.title}</Text>
                    <Text style={styles.rewardDescription}>{reward.description}</Text>
                  </View>
                </View>

                <View style={styles.rewardFooter}>
                  <View style={styles.pointsRequired}>
                    <IconSymbol name="star.fill" size={16} color={Colors.light.warning} />
                    <Text style={styles.pointsText}>{t('pointsLabel', {points: reward.points})}</Text>
                  </View>

                  <Button
                    title={canRedeem(reward.points) && reward.available ? t('redeem') : t('insufficientPoints')}
                    onPress={() => handleRedeem(reward)}
                    disabled={!canRedeem(reward.points) || !reward.available}
                    size="small"
                    style={
                      !canRedeem(reward.points) || !reward.available
                        ? { ...styles.redeemButton, ...styles.disabledButton }
                        : styles.redeemButton
                    }
                  />
                </View>
              </Card>
            </TouchableOpacity>
          ))}
        </View>
      </CollapsibleHeader>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  section: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.xxl,
  },
  sectionTitle: {
    ...Typography.h4,
    color: Colors.light.text,
    marginBottom: Spacing.lg,
  },
  rewardCard: {
    marginBottom: Spacing.md,
    padding: Spacing.lg,
  },
  rewardHeader: {
    flexDirection: 'row',
    marginBottom: Spacing.md,
  },
  rewardIcon: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.light.surfaceSecondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  rewardInfo: {
    flex: 1,
  },
  rewardTitle: {
    ...Typography.h5,
    color: Colors.light.text,
    marginBottom: 2,
  },
  rewardDescription: {
    ...Typography.bodySmall,
    color: Colors.light.textSecondary,
    lineHeight: Typography.bodySmall.lineHeight * 1.2,
  },
  rewardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pointsRequired: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pointsText: {
    ...Typography.bodySmall,
    color: Colors.light.text,
    fontWeight: '600',
    marginLeft: Spacing.xs,
  },
  redeemButton: {
    paddingHorizontal: Spacing.lg,
  },
  disabledButton: {
    opacity: 0.5,
  },
  couponDates: {
    ...Typography.caption,
    color: Colors.light.textTertiary,
    marginTop: Spacing.xs,
  },
  statusBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
    backgroundColor: Colors.light.success + '20',
  },
  statusText: {
    ...Typography.caption,
    color: Colors.light.success,
    fontWeight: '600',
    fontSize: 10,
  },
  usedStatus: {
    color: Colors.light.textSecondary,
  },
  expiredStatus: {
    color: Colors.light.error,
  },
  couponCard: {
    marginBottom: Spacing.md,
    padding: 0,
    overflow: 'hidden',
  },
  couponCardContent: {
    flex: 1,
    padding: Spacing.lg,
  },
  couponStatusBadge: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  couponStatusText: {
    ...Typography.caption,
    fontWeight: '600',
    fontSize: 11,
  },
});