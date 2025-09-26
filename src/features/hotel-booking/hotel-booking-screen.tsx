import { useLanguage } from '@/src/contexts/LanguageContext';
import DateTimePicker from '@react-native-community/datetimepicker';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  ActivityIndicator,
  Image,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

import { Button } from '@/src/shared/components';
import { IconSymbol } from '@/src/shared/components/ui/icon-symbol';
import { Colors } from '@/src/shared/constants/theme';
import { useHotelBookingController } from './hotel-booking-controller';
import { hotelBookingStyles as styles } from './hotel-booking-style';

export default function HotelBookingScreen() {
  const { t } = useLanguage();
  const controller = useHotelBookingController();
  const { state, actions, helpers } = controller;

  // Loading state
  if (state.loading && !state.room) {
    return (
      <View style={styles.container}>
        <StatusBar style="dark" />

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={actions.goBack}>
            <IconSymbol name="chevron.left" size={24} color={Colors.light.text} />
            <Text style={styles.backText}>{t('back')}</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{t('bookRoom')}</Text>
          <View style={styles.placeholder} />
        </View>

        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.light.primary} />
          <Text style={styles.loadingText}>{t('loadingRooms')}</Text>
        </View>
      </View>
    );
  }

  // Error state
  if (state.error || !state.room) {
    return (
      <View style={styles.container}>
        <StatusBar style="dark" />

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={actions.goBack}>
            <IconSymbol name="chevron.left" size={24} color={Colors.light.text} />
            <Text style={styles.backText}>{t('back')}</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{t('bookRoom')}</Text>
          <View style={styles.placeholder} />
        </View>

        <View style={styles.errorContainer}>
          <IconSymbol name="exclamationmark.triangle" size={48} color={Colors.light.error} />
          <Text style={styles.errorTitle}>{t('error')}</Text>
          <Text style={styles.errorText}>
            {state.error || t('roomNotFound')}
          </Text>
          <TouchableOpacity style={styles.retryButton} onPress={actions.loadRoom}>
            <Text style={styles.retryButtonText}>{t('retry')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const { room } = state;

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={actions.goBack}>
          <IconSymbol name="chevron.left" size={24} color={Colors.light.text} />
          <Text style={styles.backText}>{t('back')}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>{t('bookRoom')}</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Room Info */}
        <View style={styles.roomInfo}>
          <Image source={{ uri: room.images[0] }} style={styles.roomImage} />
          <View style={styles.roomDetails}>
            <View style={styles.roomHeader}>
              <Text style={styles.roomName}>{room.name}</Text>
              <View>
                <Text style={styles.roomPrice}>{helpers.formatPrice()}</Text>
                <Text style={styles.priceUnit}>/{t('night')}</Text>
              </View>
            </View>
            <Text style={styles.roomDescription}>{room.description}</Text>
          </View>
        </View>

        {/* Date Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('selectDate')}</Text>
          <View style={styles.datePickerWrapper}>
            <TouchableOpacity
              style={styles.datePickerButton}
              onPress={() => actions.setShowDatePicker(!state.showDatePicker)}
            >
              <View style={styles.datePickerContent}>
                <IconSymbol name="calendar" size={20} color={Colors.light.primary} />
                <Text style={styles.datePickerText}>
                  {helpers.formatSelectedDate()}
                </Text>
                <IconSymbol name="chevron.right" size={16} color={Colors.light.textSecondary} />
              </View>
            </TouchableOpacity>

            {state.showDatePicker && Platform.OS === 'ios' && (
              <View style={styles.datePickerDropdown}>
                <DateTimePicker
                  value={state.selectedDate}
                  mode="date"
                  display="spinner"
                  onChange={actions.handleDateChange}
                  minimumDate={new Date(Date.now() + 24 * 60 * 60 * 1000)} // Tomorrow
                  maximumDate={new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)} // 14 days from now
                  style={styles.datePickerSpinner}
                  themeVariant="light"
                />
                <View style={styles.datePickerActions}>
                  <TouchableOpacity
                    style={styles.datePickerDoneButton}
                    onPress={() => actions.setShowDatePicker(false)}
                  >
                    <Text style={styles.datePickerDoneText}>{t('done')}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {state.showDatePicker && Platform.OS === 'android' && (
              <DateTimePicker
                value={state.selectedDate}
                mode="date"
                display="default"
                onChange={actions.handleDateChange}
                minimumDate={new Date(Date.now() + 24 * 60 * 60 * 1000)} // Tomorrow
                maximumDate={new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)} // 14 days from now
              />
            )}
          </View>
        </View>

        {/* Time Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('selectTime')}</Text>
          <View style={styles.timeGrid}>
            {helpers.getAvailableTimeSlots().map((timeSlot) => (
              <TouchableOpacity
                key={timeSlot.id}
                style={[
                  styles.timeCard,
                  !timeSlot.available && styles.unavailableTimeCard,
                  state.selectedTime === timeSlot.id && styles.selectedTimeCard
                ]}
                onPress={() => timeSlot.available && actions.handleTimeSelect(timeSlot.id)}
                disabled={!timeSlot.available}
              >
                <Text style={[
                  styles.timeText,
                  !timeSlot.available && styles.unavailableTimeText,
                  state.selectedTime === timeSlot.id && styles.selectedTimeText
                ]}>
                  {timeSlot.time}
                </Text>
                {!timeSlot.available && (
                  <Text style={styles.unavailableLabel}>{t('booked')}</Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Pet Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('selectPet')}</Text>
          {state.petsLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="small" color={Colors.light.primary} />
              <Text style={styles.loadingText}>{t('loadingPets')}</Text>
            </View>
          ) : (
            state.pets.map((pet) => (
              <TouchableOpacity
                key={pet.id}
                style={[
                  styles.petCard,
                  state.selectedPet?.id === pet.id && styles.selectedPetCard
                ]}
                onPress={() => actions.handlePetSelect(pet)}
              >
                <View style={styles.petInfo}>
                  <View style={styles.petAvatar}>
                    <Text style={styles.petInitial}>{pet.name.charAt(0)}</Text>
                  </View>
                  <View style={styles.petDetails}>
                    <Text style={styles.petName}>{pet.name}</Text>
                    <Text style={styles.petBreed}>{pet.breed} • {pet.age} {t('yearsOld')}</Text>
                    <Text style={styles.petWeight}>{pet.weight}kg</Text>
                  </View>
                </View>
                {state.selectedPet?.id === pet.id && (
                  <IconSymbol name="checkmark.circle.fill" size={24} color={Colors.light.success} />
                )}
              </TouchableOpacity>
            ))
          )}
        </View>

        {/* Additional Information (Optional) */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('additionalInfoOptional')}</Text>

          {/* Special Requests */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>{t('specialRequests')}</Text>
            <TextInput
              style={styles.textInput}
              value={state.appointmentReason}
              onChangeText={actions.setAppointmentReason}
              placeholder={t('specialRequestsPlaceholder')}
              placeholderTextColor={Colors.light.textTertiary}
              multiline
              numberOfLines={2}
            />
          </View>

          {/* Notes */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>{t('additionalNotes')}</Text>
            <TextInput
              style={[styles.textInput, styles.notesInput]}
              value={state.notes}
              onChangeText={actions.setNotes}
              placeholder={t('additionalNotesPlaceholder')}
              placeholderTextColor={Colors.light.textTertiary}
              multiline
              numberOfLines={4}
            />
          </View>
        </View>

        {/* Book Button */}
        <View style={styles.bookingSection}>
          <Button
            title={state.bookingLoading ? t('bookingInProgress') : t('bookRoom')}
            onPress={actions.handleBookRoom}
            disabled={!helpers.isBookingValid() || state.bookingLoading}
            style={[
              styles.bookButton,
              (!helpers.isBookingValid() || state.bookingLoading) && styles.disabledButton
            ].filter(Boolean)}
          />
          <Text style={styles.warningText}>
            ⚠️ {t('bookingsCannotBeCancelled')}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}