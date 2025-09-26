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

import { getServiceStatusStyle } from '@/src/data/mock';
import { ServiceStatus } from '@/src/data/types/common';
import { useMyServiceDetailController } from './my-service-detail-controller';
import { myDetailServiceStyles } from './my-service-detail-style';

export default function MyServiceDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const styles = myDetailServiceStyles;
  const { 
    router,
    loading,
    service,
    handleUseService,
    handleBookAgain,
    getStatusText,
    getServiceIcon,
    getServiceBenefits,
    t,
  } = useMyServiceDetailController(id);

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
          <Image source={{ uri: service?.imageUrl || 'https://via.placeholder.com/400x200' }} style={styles.serviceImage} />
          <View style={styles.imageOverlay}>
            <View style={[
              styles.statusBadge,
              { backgroundColor: getServiceStatusStyle(service?.status as ServiceStatus, Colors)?.backgroundColor || Colors.light.textSecondary + '20' }
            ]}>
              <Text style={[
                styles.statusText,
                { color: getServiceStatusStyle(service?.status as ServiceStatus, Colors)?.color || Colors.light.textSecondary }
              ]}>
                {getStatusText(service?.status as ServiceStatus)}
              </Text>
            </View>
          </View>
        </View>

        {/* Service Info */}
        <View style={styles.serviceInfo}>
          <View style={styles.serviceHeader}>
            <View style={styles.serviceIconContainer}>
              <IconSymbol
                name={getServiceIcon(service?.serviceName) as any}
                size={32}
                color={Colors.light.primary}
              />
            </View>
            <View style={styles.serviceTitleContainer}>
              <Text style={styles.serviceTitle}>{service?.serviceName || t('unknownService')}</Text>
              <Text style={styles.serviceSubtitle}>{t('premiumService')}</Text>
            </View>
          </View>

          {/* Service Dates */}
          <View style={styles.serviceDatesCard}>
            <View style={styles.dateRow}>
              <View style={styles.dateInfo}>
                <IconSymbol name="calendar" size={16} color={Colors.light.textSecondary} />
                <Text style={styles.dateLabel}>{t('purchased')}</Text>
                <Text style={styles.dateValue}>{service?.purchaseDate || t('unknown')}</Text>
              </View>
              {service?.expiryDate && (
                <View style={styles.dateInfo}>
                  <IconSymbol name="clock" size={16} color={Colors.light.textSecondary} />
                  <Text style={styles.dateLabel}>{t('expires')}</Text>
                  <Text style={styles.dateValue}>{service.expiryDate}</Text>
                </View>
              )}
            </View>
          </View>

          {/* Service Benefits */}
          <View style={styles.benefitsSection}>
            <Text style={styles.sectionTitle}>{t('serviceIncludes')}</Text>
            {getServiceBenefits(service?.serviceName).map((benefit, index) => (
              <View key={index} style={styles.benefitItem}>
                <IconSymbol name="checkmark.circle.fill" size={16} color={Colors.light.success} />
                <Text style={styles.benefitText}>{benefit}</Text>
              </View>
            ))}
          </View>

          {/* Terms & Conditions */}
          <View style={styles.termsSection}>
            <Text style={styles.sectionTitle}>{t('termsConditions')}</Text>
            <View style={styles.termItem}>
              <Text style={styles.termText}>• {t('validFor90Days')}</Text>
            </View>
            <View style={styles.termItem}>
              <Text style={styles.termText}>• {t('nonTransferable')}</Text>
            </View>
            <View style={styles.termItem}>
              <Text style={styles.termText}>• {t('advanceBookingRequired')}</Text>
            </View>
            <View style={styles.termItem}>
              <Text style={styles.termText}>• {t('cancellation24Hours')}</Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          {service.status === ServiceStatus.READY_TO_USE ? (
            <>
              <Button
                title={t('useService')}
                onPress={handleUseService}
                style={styles.primaryButton}
              />
            </>
          ) : service.status === ServiceStatus.USED ? (
            <Button
              title={t('bookAgain')}
              onPress={handleBookAgain}
              style={styles.primaryButton}
            />
          ) : (
            <View style={styles.expiredContainer}>
              <Text style={styles.expiredText}>{t('serviceExpired')}</Text>
              <Button
                title={t('purchaseAgain')}
                onPress={handleBookAgain}
                style={styles.primaryButton}
              />
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
