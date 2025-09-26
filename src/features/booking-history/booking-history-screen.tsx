import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import { useLanguage } from '@/src/contexts/LanguageContext';
import { BookingStatus } from '@/src/data/types/common';
import { IconSymbol } from '@/src/shared/components/ui/icon-symbol';
import { Colors } from '@/src/shared/constants/theme';
import { useBookingHistoryController } from './booking-history-controller';
import { bookingHistoryStyles } from './booking-history-style';

export default function BookingHistoryScreen() {
  const router = useRouter();
  const { 
    loading,
    refreshing,
    bookings: filteredBookings,
    selectedFilter,
    filters,
    setSelectedFilter,
    handleRefresh,
    getBookingStatusStyle,
    getBookingIcon,
    getBookingTypeLabel,
    getStatusText,
  } = useBookingHistoryController()
  const { t } = useLanguage();
  const styles = bookingHistoryStyles;

  if (loading) {
    return (
      <View style={styles.container}>
        <StatusBar style="dark" />
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <IconSymbol name="chevron.left" size={24} color={Colors.light.text} />
            <Text style={styles.backText}>{t('back')}</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{t('bookingHistory')}</Text>
          <View style={styles.placeholder} />
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.light.primary} />
          <Text style={styles.loadingText}>{t('loadingBookings')}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <IconSymbol name="chevron.left" size={24} color={Colors.light.text} />
          <Text style={styles.backText}>{t('back')}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('bookingHistory')}</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={Colors.light.primary}
          />
        }
      >
        {/* Filter Tabs */}
        <View style={styles.filterSection}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterScrollContent}
          >
            {filters.map((filter) => (
              <TouchableOpacity
                key={filter}
                style={[
                  styles.filterButton,
                  selectedFilter === filter && styles.filterButtonActive
                ]}
                onPress={() => setSelectedFilter(filter)}
              >
                <Text style={[
                  styles.filterButtonText,
                  selectedFilter === filter && styles.filterButtonTextActive
                ]}>
                  {getStatusText(filter as BookingStatus)}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Bookings List */}
        <View style={styles.bookingsSection}>
          {filteredBookings.length === 0 ? (
            <View style={styles.emptyContainer}>
              <IconSymbol name="calendar" size={48} color={Colors.light.textTertiary} />
              <Text style={styles.emptyTitle}>{t('noBookings')}</Text>
              <Text style={styles.emptyDescription}>{t('noBookingsDescription')}</Text>
            </View>
          ) : (
            filteredBookings.map((booking) => (
              <View
                key={booking.id}
                style={styles.bookingCard}
              >
                <View style={styles.bookingHeader}>
                  <View style={styles.bookingTypeContainer}>
                    <View style={styles.bookingIconContainer}>
                      <IconSymbol
                        name={getBookingIcon(booking.type) as any}
                        size={20}
                        color={Colors.light.primary}
                      />
                    </View>
                    <View style={styles.bookingTypeInfo}>
                      <Text style={styles.bookingType}>
                        {getBookingTypeLabel(booking.type)}
                      </Text>
                      <Text style={styles.bookingId}>{booking.bookingId}</Text>
                    </View>
                  </View>
                  <View style={[
                    styles.statusBadge,
                    { backgroundColor: getBookingStatusStyle(booking.status as BookingStatus)?.backgroundColor || Colors.light.textSecondary + '20' }
                  ]}>
                    <Text style={[
                      styles.statusText,
                      { color: getBookingStatusStyle(booking.status as BookingStatus)?.color || Colors.light.textSecondary }
                    ]}>
                      {getStatusText(booking.status as BookingStatus)}
                    </Text>
                  </View>
                </View>

                <View style={styles.bookingDetails}>
                  <View style={styles.serviceInfo}>
                    <Text style={styles.serviceName}>
                      {booking.specialist || booking.service}
                    </Text>
                    <View style={styles.petInfo}>
                      <IconSymbol name="pawprint.fill" size={14} color={Colors.light.textSecondary} />
                      <Text style={styles.petName}>
                        {booking.petName} ({booking.petBreed})
                      </Text>
                    </View>
                  </View>

                  <View style={styles.dateTimeInfo}>
                    <View style={styles.dateTimeRow}>
                      <IconSymbol name="calendar" size={14} color={Colors.light.textSecondary} />
                      <Text style={styles.dateTimeText}>{booking.date}</Text>
                    </View>
                    <View style={styles.dateTimeRow}>
                      <IconSymbol name="clock" size={14} color={Colors.light.textSecondary} />
                      <Text style={styles.dateTimeText}>{booking.time}</Text>
                    </View>
                  </View>
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
}
