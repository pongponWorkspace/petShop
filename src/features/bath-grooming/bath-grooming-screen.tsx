import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Button } from '@/src/shared/components';
import dayjs from 'dayjs';

import { useLanguage } from '@/src/contexts/LanguageContext';
import { IconSymbol } from '@/src/shared/components/ui/icon-symbol';
import { Colors } from '@/src/shared/constants/theme';

import type { GroomingService } from './bath-grooming-controller';
import { Pet } from '@/src/data/types';
import { useBathGroomingController } from './bath-grooming-controller';
import { bathGroomingStyles as styles } from './bath-grooming-style';

export default function BathGroomingScreen() {
  const { t } = useLanguage();
  const controller = useBathGroomingController();
  const { state, actions, helpers } = controller;

  // Loading state
  if (state.loading) {
    return (
      <View style={styles.container}>
        <StatusBar style="dark" />
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={actions.goBack}>
            <IconSymbol name="chevron.left" size={24} color={Colors.light.text} />
            <Text style={styles.backText}>{t('back')}</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{t('bathGrooming')}</Text>
          <View style={styles.placeholder} />
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.light.primary} />
          <Text style={styles.loadingText}>{t('loadingServices')}</Text>
        </View>
      </View>
    );
  }

  // Error state
  if (state.error) {
    return (
      <View style={styles.container}>
        <StatusBar style="dark" />
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={actions.goBack}>
            <IconSymbol name="chevron.left" size={24} color={Colors.light.text} />
            <Text style={styles.backText}>{t('back')}</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{t('bathGrooming')}</Text>
          <View style={styles.placeholder} />
        </View>
        <View style={styles.errorContainer}>
          <IconSymbol name="exclamationmark.triangle" size={48} color={Colors.light.error} />
          <Text style={styles.errorTitle}>{t('error')}</Text>
          <Text style={styles.errorText}>{state.error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={actions.loadServices}>
            <Text style={styles.retryButtonText}>{t('retry')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const filteredServices = helpers.getFilteredServices();

  const renderServicesView = () => (
    <>
      {/* Category Tabs */}
      <View style={styles.categorySection}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryScrollContent}
        >
          {helpers.getAvailableCategories().map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                state.selectedCategory === category && styles.categoryButtonActive
              ]}
              onPress={() => actions.setSelectedCategory(category)}
            >
              <Text style={[
                styles.categoryButtonText,
                state.selectedCategory === category && styles.categoryButtonTextActive
              ]}>
                {helpers.getCategoryLabel(category)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Services List */}
        <View style={styles.servicesContainer}>
          {filteredServices.length === 0 ? (
            <View style={styles.emptyContainer}>
              <IconSymbol name="scissors" size={48} color={Colors.light.textTertiary} />
              <Text style={styles.emptyTitle}>{t('noServicesFound')}</Text>
              <Text style={styles.emptyText}>
                {t('noServicesInThisCategory')}
              </Text>
            </View>
          ) : (
            filteredServices.map((service: GroomingService) => (
              <View
                key={service.id}
                style={[
                  styles.serviceCard,
                  !service.available && styles.unavailableServiceCard
                ]}
              >
                <Image source={{ uri: service.imageUrl }} style={styles.serviceImage} />
                <View style={styles.serviceContent}>
                  <View style={styles.serviceHeader}>
                    <View style={styles.serviceTitleContainer}>
                      <Text style={styles.serviceName}>{service.name}</Text>
                      <Text style={styles.serviceDescription}>{service.description}</Text>
                    </View>
                    <View style={styles.priceContainer}>
                      <Text style={styles.servicePrice}>{helpers.formatPrice(service.price)}</Text>
                      <Text style={styles.serviceDuration}>{service.duration}</Text>
                    </View>
                  </View>

                  <View style={styles.serviceFooter}>
                    <View style={styles.categoryTag}>
                      <Text style={styles.categoryTagText}>
                        {helpers.getCategoryLabel(service.category)}
                      </Text>
                    </View>
                    <View style={[
                      styles.availabilityBadge,
                      service.available ? styles.availableBadge : styles.unavailableBadge
                    ]}>
                      <Text style={[
                        styles.availabilityText,
                        service.available ? styles.availableText : styles.unavailableText
                      ]}>
                        {service.available ? t('available') : t('unavailable')}
                      </Text>
                    </View>
                  </View>

                  <TouchableOpacity
                    style={[
                      styles.bookButton,
                      !service.available && styles.bookButtonDisabled
                    ]}
                    onPress={() => actions.handleServiceBook(service)}
                    disabled={!service.available || state.bookingLoading}
                  >
                    <Text style={styles.bookButtonText}>
                      {state.bookingLoading ? t('booking') : service.available ? t('bookNow') : t('unavailable')}
                    </Text>
                  </TouchableOpacity>
                </View>

                {!service.available && (
                  <View style={styles.unavailableOverlay}>
                    <Text style={styles.unavailableText2}>{t('currentlyUnavailable')}</Text>
                  </View>
                )}
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </>
  );

  const renderBookingView = () => {
    if (!state.selectedService) return null;

    return (
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Service Summary */}
        <View style={styles.bookingSection}>
          <Text style={styles.sectionTitle}>{t('selectedService')}</Text>
          <View style={styles.selectedServiceCard}>
            <Image source={{ uri: state.selectedService.imageUrl }} style={styles.selectedServiceImage} />
            <View style={styles.selectedServiceInfo}>
              <Text style={styles.selectedServiceName}>{state.selectedService.name}</Text>
              <Text style={styles.selectedServicePrice}>{helpers.formatPrice(state.selectedService.price)}</Text>
              <Text style={styles.selectedServiceDuration}>{state.selectedService.duration}</Text>
            </View>
          </View>
        </View>

        {/* Date Selection */}
        <View style={styles.bookingSection}>
          <Text style={styles.sectionTitle}>{t('selectDate')}</Text>
          <DateTimePicker
            value={state.selectedDate ? dayjs(state.selectedDate).toDate() : dayjs().toDate()}
            mode="date"
            minimumDate={dayjs().toDate()}
            onChange={(event, selectedDate) => {
              if (selectedDate) {
                actions.setSelectedDate(dayjs(selectedDate).format('YYYY-MM-DD'));
              }
            }}
            style={styles.datePicker}
          />
          {state.selectedDate && (
            <Text style={styles.selectedDateText}>
              {t('selectedDate')}: {helpers.formatDate(state.selectedDate)}
            </Text>
          )}
        </View>

        {/* Time Selection */}
        <View style={styles.bookingSection}>
          <Text style={styles.sectionTitle}>{t('selectTime')}</Text>
          <FlatList
            data={helpers.getAvailableTimeSlots()}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item}
            renderItem={({ item: time }) => (
              <TouchableOpacity
                style={[
                  styles.timeSlot,
                  state.selectedTime === time && styles.selectedTimeSlot
                ]}
                onPress={() => actions.setSelectedTime(time)}
              >
                <Text style={[
                  styles.timeSlotText,
                  state.selectedTime === time && styles.selectedTimeSlotText
                ]}>
                  {time}
                </Text>
              </TouchableOpacity>
            )}
            contentContainerStyle={styles.timeSlotsContainer}
          />
        </View>

        {/* Pet Selection */}
        <View style={styles.bookingSection}>
          <Text style={styles.sectionTitle}>{t('selectPets')}</Text>
          <Text style={styles.sectionSubtitle}>{t('selectPetsForGrooming')}</Text>
          {state.availablePets.map((pet: Pet) => (
            <TouchableOpacity
              key={pet.id}
              style={[
                styles.petOption,
                state.selectedPets.some(p => p.id === pet.id) && styles.selectedPetOption
              ]}
              onPress={() => actions.togglePetSelection(pet)}
            >
              <View style={styles.petInfo}>
                <View style={styles.petIcon}>
                  <IconSymbol
                    name={pet.type === 'dog' ? 'pawprint.fill' : 'pawprint.fill'}
                    size={20}
                    color={state.selectedPets.some(p => p.id === pet.id) ? Colors.light.primary : Colors.light.textSecondary}
                  />
                </View>
                <View style={styles.petDetails}>
                  <Text style={styles.petName}>{pet.name}</Text>
                  <Text style={styles.petBreed}>{pet.breed} • {pet.age} {t('years')}</Text>
                </View>
              </View>
              <View style={[
                styles.checkbox,
                state.selectedPets.some(p => p.id === pet.id) && styles.checkedBox
              ]}>
                {state.selectedPets.some(p => p.id === pet.id) && (
                  <IconSymbol name="checkmark" size={16} color={Colors.light.textLight} />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Total Price */}
        {state.selectedPets.length > 0 && (
          <View style={styles.bookingSection}>
            <View style={styles.totalPriceContainer}>
              <Text style={styles.totalPriceLabel}>{t('totalPrice')}</Text>
              <Text style={styles.totalPriceValue}>{helpers.formatPrice(helpers.getTotalPrice())}</Text>
            </View>
            <Text style={styles.priceBreakdown}>
              {helpers.formatPrice(state.selectedService.price)} × {state.selectedPets.length} {t('pets')}
            </Text>
          </View>
        )}

        {/* Confirm Button */}
        <View style={styles.confirmButtonContainer}>
          <Button
            title={state.bookingLoading ? t('booking') : t('confirmBooking')}
            onPress={actions.confirmBooking}
            disabled={!helpers.isBookingValid() || state.bookingLoading}
            style={[
              styles.confirmButton,
              (!helpers.isBookingValid() || state.bookingLoading) && styles.confirmButtonDisabled
            ]}
          />
        </View>
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={state.step === 'booking' ? actions.backToServices : actions.goBack}
        >
          <IconSymbol name="chevron.left" size={24} color={Colors.light.text} />
          <Text style={styles.backText}>{t('back')}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {state.step === 'booking' ? t('bookGrooming') : t('bathGrooming')}
        </Text>
        <View style={styles.placeholder} />
      </View>

      {state.step === 'services' ? renderServicesView() : renderBookingView()}
    </View>
  );
}