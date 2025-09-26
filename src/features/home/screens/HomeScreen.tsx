import React from 'react';
import { ScrollView, View } from 'react-native';
import { commonStyles } from '@/src/shared/styles/commonStyles';
import { homeScreenStyles } from '../styles/HomeScreen.styles';

// Import components
import QuickActions from '../components/QuickActions';
import NewsCarousel from '../components/NewsCarousel';
import EducationalContent from '../components/EducationalContent';
import CouponSection from '../components/CouponSection';
import BookingSection from '../components/BookingSection';
import ServicesSection from '../components/ServicesSection';

export default function HomeScreen() {
  return (
    <View style={[commonStyles.container, homeScreenStyles.container]}>
      <ScrollView
        style={commonStyles.scrollView}
        contentContainerStyle={commonStyles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <QuickActions />
        <NewsCarousel />
        <EducationalContent />
        <CouponSection />
        <BookingSection />
        <ServicesSection />
      </ScrollView>
    </View>
  );
}