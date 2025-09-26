import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  ActivityIndicator,
  Image,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { useLanguage } from '@/src/contexts/LanguageContext';
import { IconSymbol } from '@/src/shared/components/ui/icon-symbol';
import { Colors } from '@/src/shared/constants/theme';

import { Card } from '@/src/shared/components';
import { usePetHospitalController } from './pet-hospital-controller';
import { petHospitalStyles as styles } from './pet-hospital-style';

export default function PetHospitalScreen() {
  const { t } = useLanguage();
  const controller = usePetHospitalController();
  const { state, actions, helpers } = controller;

  // Loading state
  if (state.loading && (!state.specialists || state.specialists.length === 0)) {
    return (
      <View style={styles.container}>
        <StatusBar style="dark" backgroundColor={Colors.light.surface} />

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={actions.goBack}>
            <IconSymbol name="chevron.left" size={24} color={Colors.light.text} />
            <Text style={styles.backText}>{t('back')}</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{t('petHospital')}</Text>
          <View style={styles.placeholder} />
        </View>

        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.light.primary} />
          <Text style={styles.loadingText}>{t('loadingSpecialists')}</Text>
        </View>
      </View>
    );
  }

  // Error state
  if (state.error && (!state.specialists || state.specialists.length === 0)) {
    return (
      <View style={styles.container}>
        <StatusBar style="dark" backgroundColor={Colors.light.surface} />

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={actions.goBack}>
            <IconSymbol name="chevron.left" size={24} color={Colors.light.text} />
            <Text style={styles.backText}>{t('back')}</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{t('petHospital')}</Text>
          <View style={styles.placeholder} />
        </View>

        <View style={styles.errorContainer}>
          <IconSymbol name="exclamationmark.triangle" size={48} color={Colors.light.error} />
          <Text style={styles.errorTitle}>{t('error')}</Text>
          <Text style={styles.errorText}>{state.error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={actions.loadSpecialists}>
            <Text style={styles.retryButtonText}>{t('retry')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // Empty state
  if (!state.loading && (!state.specialists || state.specialists.length === 0)) {
    return (
      <View style={styles.container}>
        <StatusBar style="dark" backgroundColor={Colors.light.surface} />

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={actions.goBack}>
            <IconSymbol name="chevron.left" size={24} color={Colors.light.text} />
            <Text style={styles.backText}>{t('back')}</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{t('petHospital')}</Text>
          <View style={styles.placeholder} />
        </View>

        <View style={styles.emptyContainer}>
          <IconSymbol
            name="heart.slash"
            size={64}
            color={Colors.light.textTertiary}
            style={styles.emptyIcon}
          />
          <Text style={styles.emptyTitle}>{t('noSpecialistsAvailable')}</Text>
          <Text style={styles.emptyText}>{t('noSpecialistsDescription')}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark" backgroundColor={Colors.light.surface} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={actions.goBack}>
          <IconSymbol name="chevron.left" size={24} color={Colors.light.text} />
          <Text style={styles.backText}>{t('back')}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('petHospital')}</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={state.loading}
            onRefresh={actions.refresh}
            tintColor={Colors.light.primary}
          />
        }
      >
        {/* Introduction Section */}
        <View style={styles.introSection}>
          <Card style={styles.introCard}>
            <View style={styles.introHeader}>
              <IconSymbol
                name="cross.case.fill"
                size={32}
                color={Colors.light.primary}
                style={styles.introIcon}
              />
              <Text style={styles.introTitle}>{t('professionalVeterinaryCare')}</Text>
            </View>
            <Text style={styles.introDescription}>
              {t('petHospitalDescription')}
            </Text>
          </Card>
        </View>

        {/* Specialists Section */}
        <View style={styles.specialistsSection}>
          <Text style={styles.sectionTitle}>{t('availableSpecialists')}</Text>

          {(state.specialists || []).map((specialist) => (
            <TouchableOpacity
              key={specialist.id}
              style={styles.specialistCard}
              onPress={() => actions.handleSpecialistSelect(specialist.id)}
              activeOpacity={0.7}
            >
              {/* Specialist Image */}
              {specialist.imageUrl ? (
                <Image
                  source={{ uri: specialist.imageUrl }}
                  style={styles.specialistImage}
                />
              ) : (
                <View style={styles.specialistImagePlaceholder}>
                  <IconSymbol
                    name="photo"
                    size={48}
                    color={Colors.light.textTertiary}
                  />
                </View>
              )}

              {/* Specialist Content */}
              <View style={styles.specialistContent}>
                <View style={styles.specialistHeader}>
                  <View style={[
                    styles.specialistIconContainer,
                    { backgroundColor: helpers.getSpecialistColor(specialist.id) + '20' }
                  ]}>
                    <IconSymbol
                      name={helpers.getSpecialistIcon(specialist.id) as any}
                      size={24}
                      color={helpers.getSpecialistColor(specialist.id)}
                    />
                  </View>
                  <View style={styles.specialistInfo}>
                    <Text style={styles.specialistName}>{specialist.name}</Text>
                    <Text style={styles.specialistDescription}>
                      {specialist.description}
                    </Text>
                  </View>
                </View>

                {/* Services */}
                {specialist.services && specialist.services.length > 0 && (
                  <View style={styles.servicesContainer}>
                    <Text style={styles.servicesTitle}>{t('services')}:</Text>
                    <View style={styles.servicesList}>
                      {specialist.services.map((service, index) => (
                        <View key={index} style={styles.serviceTag}>
                          <Text style={styles.serviceTagText}>{service}</Text>
                        </View>
                      ))}
                    </View>
                  </View>
                )}

                {/* Book Button */}
                <View style={styles.bookButtonContainer}>
                  <TouchableOpacity
                    style={styles.bookButton}
                    onPress={() => actions.handleSpecialistSelect(specialist.id)}
                  >
                    <Text style={styles.bookButtonText}>{t('bookAppointment')}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}