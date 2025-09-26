import { useLanguage } from '@/src/contexts/LanguageContext';
import { Booking, mockBookings } from '@/src/data/mock';
import { Card } from '@/src/shared/components';
import { IconSymbol } from '@/src/shared/components/ui/icon-symbol';
import { BorderRadius, Colors, Spacing, Typography } from '@/src/shared/constants/theme';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Section from './Section';

interface BookingSectionProps {
  bookings?: Booking[];
}

export default function BookingSection({ bookings = mockBookings || [] }: BookingSectionProps) {
  const router = useRouter();
  const { t } = useLanguage();
  const getBookingIcon = (type: Booking['type']) => {
    switch (type) {
      case 'hospital':
        return 'heart.fill';
      case 'grooming':
        return 'star.fill';
      case 'boarding':
        return 'house.fill';
    }
  };

  const getBookingColor = (type: Booking['type']) => {
    switch (type) {
      case 'hospital':
        return Colors.light.error;
      case 'grooming':
        return Colors.light.warning;
      case 'boarding':
        return Colors.light.info;
    }
  };

  const getBookingTypeText = (type: Booking['type']) => {
    switch (type) {
      case 'hospital':
        return t('petHospital');
      case 'grooming':
        return t('grooming');
      case 'boarding':
        return t('petBoarding');
    }
  };

  const formatDateTime = (date: string, time: string) => {
    return `${date}, ${time}`;
  };

  return (
    <Section>
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {(bookings || []).map((booking) => (
        <Card key={booking.id} style={styles.bookingCard}>
          <View style={styles.bookingHeader}>
            <IconSymbol
              name={getBookingIcon(booking.type) as any}
              size={16}
              color={getBookingColor(booking.type)}
            />
            <Text style={[styles.bookingType, { color: getBookingColor(booking.type) }]}>
              {getBookingTypeText(booking.type)}
            </Text>
          </View>
          <Text style={styles.bookingSpecialist}>
            {booking.specialist || booking.service}
          </Text>
          <Text style={styles.bookingPet}>
            {t('pet')}: {booking.petName} ({booking.petBreed})
          </Text>
          <View style={styles.bookingDateTime}>
            <IconSymbol name="calendar" size={12} color={Colors.light.textSecondary} />
            <Text style={styles.bookingDate}>
              {formatDateTime(booking.date, booking.time)}
            </Text>
          </View>
          <View style={styles.bookingStatus}>
            <Text style={styles.bookingStatusText}>
              {booking.status === 'confirmed' ? t('confirmed') : t('upcoming')}
            </Text>
          </View>
        </Card>
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
  bookingCard: {
    width: 220,
    height: 160,
    marginRight: Spacing.md,
    backgroundColor: Colors.light.surface,
    padding: Spacing.md,
    justifyContent: 'space-between',
  },
  bookingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    marginBottom: Spacing.xs,
  },
  bookingType: {
    ...Typography.caption,
    fontWeight: '600',
  },
  bookingSpecialist: {
    ...Typography.bodySmall,
    color: Colors.light.text,
    fontWeight: '600',
    marginBottom: 4,
  },
  bookingPet: {
    ...Typography.caption,
    color: Colors.light.textSecondary,
    marginBottom: Spacing.sm,
  },
  bookingDateTime: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: Spacing.sm,
  },
  bookingDate: {
    ...Typography.caption,
    color: Colors.light.textSecondary,
    fontSize: 10,
  },
  bookingStatus: {
    alignSelf: 'flex-start',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    backgroundColor: Colors.light.success + '20',
    borderRadius: BorderRadius.sm,
  },
  bookingStatusText: {
    ...Typography.caption,
    color: Colors.light.success,
    fontWeight: '600',
    fontSize: 10,
  },
});