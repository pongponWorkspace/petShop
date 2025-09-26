import { useLanguage } from '@/src/contexts/LanguageContext';
import { mockUserServicesNew as mockUserServices, getServiceStatusStyle } from '@/src/data/mock';
import { UserService } from '@/src/data/types';
import { ServiceStatus } from '@/src/data/types/common';
import { Card } from '@/src/shared/components';
import { BorderRadius, Colors, Spacing, Typography } from '@/src/shared/constants/theme';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Section from './Section';

interface ServicesSectionProps {
  // Component to display user's purchased services on home screen
}

export default function ServicesSection({}: ServicesSectionProps) {
  const router = useRouter();
  const { t } = useLanguage();
  const [services, setServices] = useState<UserService[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = () => {
    // Simulate API call delay
    setTimeout(() => {
      setServices(mockUserServices.slice(0, 5)); // Show max 5 services on home
      setLoading(false);
    }, 500);
  };

  const getStatusText = (status: ServiceStatus) => {
    switch (status) {
      case ServiceStatus.READY_TO_USE:
        return t('readyToUse');
      case ServiceStatus.USED:
        return t('used');
      case ServiceStatus.EXPIRED:
        return t('expired');
      default:
        return status;
    }
  };

  const handleServicePress = (service: UserService) => {
    router.push(`/my-service-detail?id=${service.id}` as any);
  };

  const handleViewAllPress = () => {
    router.push('/my-services' as any);
  };

  if (loading) {
    return (
      <Section>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color={Colors.light.primary} />
          <Text style={styles.loadingText}>{t('loading')}</Text>
        </View>
      </Section>
    );
  }

  if (services.length === 0) {
    return (
      <Section>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>{t('noServicesAvailable')}</Text>
        </View>
      </Section>
    );
  }

  return (
    <Section>
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {services.map((service) => (
        <TouchableOpacity
          key={service.id}
          onPress={() => handleServicePress(service)}
        >
          <Card style={styles.serviceCard}>
            <Image
              source={{ uri: service.imageUrl }}
              style={styles.serviceImage}
            />
            <View style={styles.serviceContentWrapper}>
              <View style={styles.serviceContent}>
                <Text style={styles.serviceTitle} numberOfLines={2}>
                  {service.serviceName}
                </Text>
                <Text style={styles.serviceDate}>
                  {t('purchased')}: {service.purchaseDate}
                </Text>
              </View>
              <View style={[
                styles.serviceStatus,
                { backgroundColor: getServiceStatusStyle(service.status as ServiceStatus, Colors)?.backgroundColor || Colors.light.textSecondary + '20' }
              ]}>
                <Text style={[
                  styles.serviceStatusText,
                  { color: getServiceStatusStyle(service.status as ServiceStatus, Colors)?.color || Colors.light.textSecondary }
                ]}>
                  {getStatusText(service.status as ServiceStatus)}
                </Text>
              </View>
            </View>
          </Card>
        </TouchableOpacity>
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
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.xl,
    paddingHorizontal: Spacing.lg,
  },
  loadingText: {
    ...Typography.body,
    color: Colors.light.textSecondary,
    marginLeft: Spacing.sm,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.xl,
    paddingHorizontal: Spacing.lg,
  },
  emptyText: {
    ...Typography.body,
    color: Colors.light.textSecondary,
    textAlign: 'center',
  },
  serviceCard: {
    width: 200,
    minHeight: 180,
    height: '100%',
    maxHeight: 220,
    marginRight: Spacing.md,
    overflow: 'hidden',
    padding: 0,
  },
  serviceImage: {
    width: '100%',
    height: 100,
    resizeMode: 'cover',
  },
  serviceContentWrapper: {
    flex: 1,
    justifyContent: 'space-between',
    padding: Spacing.md,
    paddingTop: Spacing.lg,
  },
  serviceContent: {
    flex: 1,
    justifyContent: 'space-between'
  },
  serviceTitle: {
    ...Typography.bodySmall,
    color: Colors.light.text,
    fontWeight: '600',
    lineHeight: Typography.bodySmall.lineHeight * 1.1,
  },
  serviceDate: {
    ...Typography.caption,
    color: Colors.light.textSecondary,
    fontSize: 10,
  },
  serviceStatus: {
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.sm,
    alignSelf: 'flex-start',
    marginTop: Spacing.sm,
  },
  serviceStatusText: {
    ...Typography.caption,
    fontWeight: '600',
    fontSize: 10,
  },
});