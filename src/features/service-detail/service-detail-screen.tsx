import { useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import { Button } from '@/src/shared/components';
import { IconSymbol } from '@/src/shared/components/ui/icon-symbol';
import { Colors } from '@/src/shared/constants/theme';
import { useServiceDetailController } from './service-detail-controller';
import { serviceDetailStyles } from './service-detail-style';

export default function ServiceDetailScreen() {
  const styles = serviceDetailStyles;
  // const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { 
    service,
    loading,
    bookingLoading,
    error,
    loadService,
    bookService,
    goBack,
    refresh,
    getCategoryLabel,
    getCategoryIcon,
    getCategoryColor,
    formatPrice,
    handleBookService,
    handleContactUs,
    t,
    router
  } = useServiceDetailController(id);

  if (loading) {
    return (
      <View style={styles.container}>
        <StatusBar style="dark" />
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <IconSymbol name="chevron.left" size={24} color={Colors.light.text} />
            <Text style={styles.backText}>{t('back')}</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{t('serviceDetail')}</Text>
          <View style={styles.placeholder} />
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.light.primary} />
          <Text style={styles.loadingText}>{t('loadingServiceDetails')}</Text>
        </View>
      </View>
    );
  }

  if (!service) {
    return (
      <View style={styles.container}>
        <StatusBar style="dark" />
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <IconSymbol name="chevron.left" size={24} color={Colors.light.text} />
            <Text style={styles.backText}>{t('back')}</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{t('serviceDetail')}</Text>
          <View style={styles.placeholder} />
        </View>
        <View style={styles.errorContainer}>
          <IconSymbol name="exclamationmark.triangle" size={48} color={Colors.light.error} />
          <Text style={styles.errorTitle}>{t('error')}</Text>
          <Text style={styles.errorText}>{t('serviceNotFound')}</Text>
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
        <Text style={styles.headerTitle}>{t('serviceDetail')}</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Service Image */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: service.imageUrl }} style={styles.serviceImage} />
          <View style={styles.imageOverlay}>
            <View style={[
              styles.categoryBadge,
              { backgroundColor: getCategoryColor(service.category) + '20' }
            ]}>
              <IconSymbol
                name={getCategoryIcon(service.category) as any}
                size={16}
                color={getCategoryColor(service.category)}
              />
              <Text style={[
                styles.categoryText,
                { color: getCategoryColor(service.category) }
              ]}>
                {getCategoryLabel(service.category)}
              </Text>
            </View>
          </View>
        </View>

        {/* Service Info */}
        <View style={styles.serviceInfo}>
          <View style={styles.serviceHeader}>
            <View style={styles.serviceTitleContainer}>
              <Text style={styles.serviceTitle}>{service.name}</Text>
              <Text style={styles.serviceSubtitle}>{service.description}</Text>
            </View>
            <View style={styles.priceContainer}>
              <Text style={styles.priceValue}>฿{service.price}</Text>
              <Text style={styles.priceLabel}>{service.duration}</Text>
            </View>
          </View>

          {/* Full Description */}
          <View style={styles.descriptionSection}>
            <Text style={styles.sectionTitle}>{t('aboutThisService')}</Text>
            <Text style={styles.fullDescription}>{service.fullDescription}</Text>
          </View>

          {/* Service Features */}
          <View style={styles.featuresSection}>
            <Text style={styles.sectionTitle}>{t('serviceIncludes')}</Text>
            {service.features?.map((feature, index) => (
              <View key={index} style={styles.featureItem}>
                <IconSymbol name="checkmark.circle.fill" size={16} color={Colors.light.success} />
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
          </View>

          {/* Requirements */}
          <View style={styles.requirementsSection}>
            <Text style={styles.sectionTitle}>{t('requirements')}</Text>
            {service.requirements?.map((requirement, index) => (
              <View key={index} style={styles.requirementItem}>
                <IconSymbol name="info.circle.fill" size={16} color={Colors.light.info} />
                <Text style={styles.requirementText}>{requirement}</Text>
              </View>
            ))}
          </View>

          {/* Additional Information */}
          <View style={styles.additionalInfoSection}>
            <Text style={styles.sectionTitle}>{t('additionalInformation')}</Text>
            {service.additionalInfo?.map((info, index) => (
              <View key={index} style={styles.infoItem}>
                <Text style={styles.infoText}>• {info}</Text>
              </View>
            ))}
          </View>

          {/* Booking Process */}
          <View style={styles.bookingProcessSection}>
            <Text style={styles.sectionTitle}>{t('howToBook')}</Text>
            <View style={styles.stepItem}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>1</Text>
              </View>
              <Text style={styles.stepText}>{t('selectServiceAndTime')}</Text>
            </View>
            <View style={styles.stepItem}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>2</Text>
              </View>
              <Text style={styles.stepText}>{t('confirmBookingDetails')}</Text>
            </View>
            <View style={styles.stepItem}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>3</Text>
              </View>
              <Text style={styles.stepText}>{t('receiveConfirmationCall')}</Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          <Button
            title={t('bookNow')}
            onPress={handleBookService}
            style={styles.primaryButton}
          />
          <Button
            title={t('contactForBooking')}
            onPress={handleContactUs}
            style={styles.secondaryButton}
            textStyle={styles.secondaryButtonText}
          />
        </View>
      </ScrollView>
    </View>
  );
}
