import { useLanguage } from '@/src/contexts/LanguageContext';
import {
  BookingSection,
  CouponSection,
  EducationalContent,
  NewsCarousel,
  QuickActions,
  Section,
  SectionHeader,
  ServicesSection
} from '@/src/features/home/components';
import { CollapsibleHeader } from '@/src/shared/components';
import { Colors, Spacing } from '@/src/shared/constants/theme';
import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const { t } = useLanguage();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <CollapsibleHeader
        title={t('welcomeToPetShop')}
        scrollViewProps={{
          showsVerticalScrollIndicator: false,
          contentContainerStyle: { paddingBottom: Spacing.xxxl }
        }}
      >
        {/* Quick Actions */}
        <QuickActions />

        {/* News & Announcements */}
        <Section>
          <SectionHeader
            title={t('newsAndAnnouncements')}
            viewAllRoute={`/content-list?type=news&title=${encodeURIComponent(t('newsAndAnnouncements'))}`}
          />
          <NewsCarousel />
        </Section>

        {/* Pet Articles */}
        <Section>
          <SectionHeader
            title={t('petArticles')}
            viewAllRoute={`/content-list?type=articles&title=${encodeURIComponent(t('petArticles'))}`}
          />
          <EducationalContent />
        </Section>

        {/* My Coupons */}
        <Section>
          <SectionHeader
            title={t('myCoupons')}
            viewAllRoute="/my-coupons"
          />
          <CouponSection />
        </Section>

        {/* Current Bookings */}
        <Section>
          <SectionHeader
            title={t('currentBookings')}
            viewAllRoute="/booking-history"
          />
          <BookingSection />
        </Section>

        {/* My Services */}
        <Section>
          <SectionHeader
            title={t('myServices')}
            viewAllRoute="/my-services"
          />
          <ServicesSection />
        </Section>
      </CollapsibleHeader>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
});
