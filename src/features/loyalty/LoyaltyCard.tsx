import { useLanguage } from '@/src/contexts/LanguageContext';
import { LoyaltyPoints } from '@/src/data/types';
import { IconSymbol } from '@/src/shared/components/ui/icon-symbol';
import { BorderRadius, Colors, Shadows, Spacing, Typography } from '@/src/shared/constants/theme';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface LoyaltyCardProps {
  loyaltyPoints: LoyaltyPoints;
}

export const LoyaltyCard: React.FC<LoyaltyCardProps> = ({ loyaltyPoints }) => {
  const { t } = useLanguage();
  const progressPercentage = (loyaltyPoints.availablePoints / loyaltyPoints.totalPoints) * 100;

  return (
    <View style={styles.cardContainer}>
      <View style={styles.card}>
        {/* Background gradient overlay */}
        <View style={styles.gradientOverlay} />

        {/* Header section */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.iconContainer}>
              <IconSymbol name="star.fill" size={24} color={Colors.light.warning} />
            </View>
            <View>
              <Text style={styles.title}>{t('PetShopPoints')}</Text>
              <Text style={styles.subtitle}>{t('loyaltyRewards')}</Text>
            </View>
          </View>
          <View style={styles.badgeContainer}>
            <Text style={styles.badgeText}>{t('member')}</Text>
          </View>
        </View>

        {/* Main points display */}
        <View style={styles.pointsSection}>
          <View style={styles.pointsMain}>
            <Text style={styles.availablePoints}>
              {loyaltyPoints.availablePoints.toLocaleString()}
            </Text>
            <Text style={styles.pointsLabel}>{t('availablePoints')}</Text>
          </View>

          {/* Progress indicator */}
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${Math.min(progressPercentage, 100)}%` }
                ]}
              />
            </View>
            <Text style={styles.progressText}>
              {t('earnedTotal', { points: loyaltyPoints.totalPoints.toLocaleString() })}
            </Text>
          </View>
        </View>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  card: {
    backgroundColor: Colors.light.primary,
    borderRadius: BorderRadius.xxl,
    padding: Spacing.xl,
    position: 'relative',
    overflow: 'hidden',
    ...Shadows.large,
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: BorderRadius.xxl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.xl,
    zIndex: 1,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  title: {
    ...Typography.h4,
    fontWeight: 'bold',
    color: Colors.light.textLight,
    marginBottom: 2,
  },
  subtitle: {
    ...Typography.bodySmall,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '500',
  },
  badgeContainer: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  badgeText: {
    ...Typography.caption,
    color: Colors.light.textLight,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  pointsSection: {
    marginBottom: Spacing.xl,
    zIndex: 1,
  },
  pointsMain: {
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  availablePoints: {
    fontSize: 48,
    fontWeight: '800',
    color: Colors.light.textLight,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    marginBottom: Spacing.xs,
  },
  pointsLabel: {
    ...Typography.body,
    color: 'rgba(255,255,255,0.9)',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  progressContainer: {
    alignItems: 'center',
  },
  progressBar: {
    width: '100%',
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 3,
    marginBottom: Spacing.sm,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.light.warning,
    borderRadius: 3,
  },
  progressText: {
    ...Typography.bodySmall,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '500',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: Spacing.lg,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.2)',
    zIndex: 1,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  statDivider: {
    width: 1,
    height: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginHorizontal: Spacing.md,
  },
  statText: {
    ...Typography.bodySmall,
    color: Colors.light.textLight,
    fontWeight: '500',
    marginLeft: Spacing.xs,
  },
});