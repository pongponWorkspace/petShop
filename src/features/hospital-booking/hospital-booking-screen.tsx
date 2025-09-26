import DateTimePicker from '@react-native-community/datetimepicker';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  ActivityIndicator,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useLanguage } from '@/src/contexts/LanguageContext';
import { IconSymbol } from '@/src/shared/components/ui/icon-symbol';
import { Colors } from '@/src/shared/constants/theme';

import { Button, Card } from '@/src/shared/components';
import { useHospitalBookingController } from './hospital-booking-controller';
import { hospitalBookingStyles as styles } from './hospital-booking-style';

export default function HospitalBookingScreen() {
  const { t } = useLanguage();
  const controller = useHospitalBookingController();
  const { state, actions, helpers } = controller;

  // Loading state
  if (state.loading && !state.specialist) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <StatusBar style="dark" />

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={actions.goBack}>
            <IconSymbol name="chevron.left" size={24} color={Colors.light.text} />
            <Text style={styles.backText}>{t('back')}</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{t('bookAppointment')}</Text>
          <View style={styles.placeholder} />
        </View>

        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.light.primary} />
          <Text style={styles.loadingText}>{t('loadingAppointmentData')}</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Error state
  if (state.error || !state.specialist) {
    return (
      <View style={styles.container}>
        <StatusBar style="dark" backgroundColor={Colors.light.surface} />

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={actions.goBack}>
            <IconSymbol name="chevron.left" size={24} color={Colors.light.text} />
            <Text style={styles.backText}>{t('back')}</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{t('bookAppointment')}</Text>
          <View style={styles.placeholder} />
        </View>

        <View style={styles.errorContainer}>
          <IconSymbol name="exclamationmark.triangle" size={48} color={Colors.light.error} />
          <Text style={styles.errorTitle}>{t('error')}</Text>
          <Text style={styles.errorText}>
            {state.error || t('specialistNotFound')}
          </Text>
          <TouchableOpacity style={styles.retryButton} onPress={actions.loadSpecialist}>
            <Text style={styles.retryButtonText}>{t('retry')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const { specialist } = state;

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={actions.goBack}>
          <IconSymbol name="chevron.left" size={24} color={Colors.light.text} />
          <Text style={styles.backText}>{t('back')}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>{t('bookAppointment')}</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Specialist Info */}
        <Card style={styles.specialistInfo}>
          <View style={styles.specialistHeader}>
            <IconSymbol name="heart.fill" size={24} color={Colors.light.error} />
            <View style={styles.specialistDetails}>
              <Text style={styles.specialistName}>{specialist.name}</Text>
              <Text style={styles.specialistDescription}>{specialist.description}</Text>
            </View>
          </View>
        </Card>

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

          {/* Appointment Reason */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>{t('appointmentReason')}</Text>
            <TextInput
              style={styles.textInput}
              value={state.appointmentReason}
              onChangeText={actions.setAppointmentReason}
              placeholder={t('appointmentReasonPlaceholder')}
              placeholderTextColor={Colors.light.textTertiary}
              multiline
              numberOfLines={2}
            />
          </View>

          {/* Initial Symptoms */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>{t('initialSymptoms')}</Text>
            <TextInput
              style={styles.textInput}
              value={state.initialSymptoms}
              onChangeText={actions.setInitialSymptoms}
              placeholder={t('symptomsPlaceholder')}
              placeholderTextColor={Colors.light.textTertiary}
              multiline
              numberOfLines={3}
            />
          </View>

          {/* Request Veterinarian */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>{t('requestSpecificVet')}</Text>
            <TextInput
              style={styles.textInput}
              value={state.requestVeterinarian}
              onChangeText={actions.setRequestVeterinarian}
              placeholder={t('vetNamePlaceholder')}
              placeholderTextColor={Colors.light.textTertiary}
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
            title={state.bookingLoading ? t('bookingInProgress') : t('bookAppointment')}
            onPress={actions.handleBookAppointment}
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