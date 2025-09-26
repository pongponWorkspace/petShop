import { Button, Card, CollapsibleHeader, LanguageSelector } from '@/src/shared/components';

import { useLanguage } from '@/src/contexts/LanguageContext';
import { LoyaltyPoints } from '@/src/data/types';
import { LoyaltyCard } from '@/src/features/loyalty';
import { usePoints } from '@/src/pointsService';
import { Colors, Spacing, Typography } from '@/src/shared/constants/theme';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen() {
  const { pointsData } = usePoints();
  const { t } = useLanguage();
  const router = useRouter();

  // Convert points data to LoyaltyPoints format for compatibility
  const loyaltyPoints: LoyaltyPoints = {
    userId: '1',
    totalPoints: pointsData.totalPoints,
    availablePoints: pointsData.totalPoints,
    transactions: [],
  };

  const menuItems = [
    { id: 'bookings', title: t('myBookings'), subtitle: t('myBookingsSubtitle') },
    { id: 'coupons', title: t('myCouponsTitle'), subtitle: t('myCouponsSubtitle') },
    { id: 'notifications', title: t('notifications'), subtitle: t('notificationsSubtitle') },
    { id: 'settings', title: t('settings'), subtitle: t('settingsSubtitle') },
    { id: 'help', title: t('helpSupport'), subtitle: t('helpSupportSubtitle') },
    { id: 'about', title: t('aboutPetShop'), subtitle: t('aboutPetShopSubtitle') },
  ];

  const handleMenuPress = (itemId: string) => {
    if (itemId === 'coupons') {
      router.push('/my-coupons');
    } else if (itemId === 'bookings') {
      router.push('/booking-history');
    } else {
      console.log('Menu item pressed:', itemId);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <CollapsibleHeader
        title={t('profile')}
        scrollViewProps={{
          showsVerticalScrollIndicator: false,
          contentContainerStyle: { paddingBottom: Spacing.xxxl }
        }}
      >
        <LoyaltyCard loyaltyPoints={loyaltyPoints} />

        <LanguageSelector style={styles.languageSection} />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('menu')}</Text>
          {menuItems.map(item => (
            <TouchableOpacity
              key={item.id}
              onPress={() => handleMenuPress(item.id)}
            >
              <Card style={styles.menuItem}>
                <View style={styles.menuContent}>
                  <View style={styles.menuText}>
                    <Text style={styles.menuTitle}>{item.title}</Text>
                    <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
                  </View>
                  <Text style={styles.arrow}>›</Text>
                </View>
              </Card>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.footer}>
          <Button
            title={t('signOut')}
            onPress={() => console.log('Sign out')}
            variant="outline"
            style={styles.signOutButton}
          />
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
    marginBottom: Spacing.xxl,
  },
  sectionTitle: {
    ...Typography.h4,
    color: Colors.light.text,
    marginBottom: Spacing.lg,
    paddingHorizontal: Spacing.xl,
  },
  quickActions: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.lg,
    gap: Spacing.md,
  },
  quickActionButton: {
    flex: 1,
  },
  menuItem: {
    marginHorizontal: Spacing.lg,
    marginVertical: Spacing.xs,
  },
  menuContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  menuText: {
    flex: 1,
  },
  menuTitle: {
    ...Typography.body,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: Spacing.xs,
  },
  menuSubtitle: {
    ...Typography.bodySmall,
    color: Colors.light.textSecondary,
    fontWeight: '500',
  },
  arrow: {
    ...Typography.h3,
    color: Colors.light.text,
    fontWeight: '300',
  },
  footer: {
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.xxxl,
  },
  signOutButton: {
    alignSelf: 'stretch',
  },
  languageSection: {
    backgroundColor: Colors.light.surface,
    marginHorizontal: Spacing.lg,
    marginVertical: Spacing.md,
    borderRadius: 12,
  },
});