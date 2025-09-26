import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  ActivityIndicator,
  Image,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import { getServiceStatusStyle } from '@/src/data/mock';
import { ServiceStatus } from '@/src/data/types/common';
import { IconSymbol } from '@/src/shared/components/ui/icon-symbol';
import { Colors } from '@/src/shared/constants/theme';
import { useMyServiceController } from './my-service-controller';
import { myServiceStyles } from './my-service-style';

export default function MyServicesScreen() {
  const styles = myServiceStyles;
  const {
    loading,
    refreshing,
    filteredServices,
    selectedFilter,
    setSelectedFilter,
    filters,
    handleRefresh,
    handleServicePress,
    getStatusText,
    getServiceIcon,
    t,
    router
  } = useMyServiceController();

  if (loading) {
    return (
      <View style={styles.container}>
        <StatusBar style="dark" />
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <IconSymbol name="chevron.left" size={24} color={Colors.light.text} />
            <Text style={styles.backText}>{t('back')}</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{t('myServices')}</Text>
          <View style={styles.placeholder} />
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.light.primary} />
          <Text style={styles.loadingText}>{t('loadingServices')}</Text>
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
        <Text style={styles.headerTitle}>{t('myServices')}</Text>
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
                  {filter === 'all' ? t('all') : getStatusText(filter as ServiceStatus)}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Services List */}
        <View style={styles.servicesSection}>
          {filteredServices.length === 0 ? (
            <View style={styles.emptyContainer}>
              <IconSymbol name="gift" size={48} color={Colors.light.textTertiary} />
              <Text style={styles.emptyTitle}>{t('noServices')}</Text>
              <Text style={styles.emptyDescription}>{t('noServicesDescription')}</Text>
            </View>
          ) : (
            filteredServices?.map((service) => (
              <TouchableOpacity
                key={service.id}
                style={styles.serviceCard}
                onPress={() => handleServicePress(service)}
              >
                <Image source={{ uri: service.imageUrl }} style={styles.serviceImage} />
                <View style={styles.serviceContent}>
                  <View style={styles.serviceHeader}>
                    <View style={styles.serviceIconContainer}>
                      <IconSymbol
                        name={getServiceIcon(service.serviceName) as any}
                        size={20}
                        color={Colors.light.primary}
                      />
                    </View>
                    <View style={[
                      styles.statusBadge,
                      { backgroundColor: getServiceStatusStyle(service.status as ServiceStatus, Colors)?.backgroundColor || Colors.light.textSecondary + '20' }
                    ]}>
                      <Text style={[
                        styles.statusText,
                        { color: getServiceStatusStyle(service.status as ServiceStatus, Colors)?.color || Colors.light.textSecondary }
                      ]}>
                        {getStatusText(service.status as ServiceStatus)}
                      </Text>
                    </View>
                  </View>

                  <Text style={styles.serviceTitle}>{service.serviceName}</Text>

                  <View style={styles.serviceDates}>
                    <View style={styles.dateInfo}>
                      <Text style={styles.dateLabel}>{t('purchased')}</Text>
                      <Text style={styles.dateValue}>{service.purchaseDate}</Text>
                    </View>
                    {service.expiryDate && (
                      <View style={styles.dateInfo}>
                        <Text style={styles.dateLabel}>{t('expires')}</Text>
                        <Text style={styles.dateValue}>{service.expiryDate}</Text>
                      </View>
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
}