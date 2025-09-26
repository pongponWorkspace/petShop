import { useLanguage } from '@/src/contexts/LanguageContext';
import { mockAvailableServices } from '@/src/data/mock';
import { ServiceCard } from '@/src/features/booking';
import { CollapsibleHeader } from '@/src/shared/components';
import { BorderRadius, Colors, Spacing, Typography } from '@/src/shared/constants/theme';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ServicesScreen() {
  const router = useRouter();
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const services = mockAvailableServices;
  const filteredServices = selectedCategory === 'all'
    ? services
    : services.filter(service => service.category === selectedCategory);

  const categories = [
    { id: 'all', name: t('allServices') },
    { id: 'boarding', name: t('boarding') },
    { id: 'training', name: t('training') },
    { id: 'spa', name: t('spa') },
  ];

  const categoriesComponent = (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.categoriesContainer}
    >
      {categories.map(category => (
        <TouchableOpacity
          key={category.id}
          style={[
            styles.categoryButton,
            selectedCategory === category.id && styles.selectedCategory
          ]}
          onPress={() => setSelectedCategory(category.id)}
        >
          <Text style={[
            styles.categoryText,
            selectedCategory === category.id && styles.selectedCategoryText
          ]}>
            {category.name}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <CollapsibleHeader
        title={t('petServices')}
        stickyComponent={categoriesComponent}
      >
        <View style={styles.servicesList}>
          {filteredServices.map(item => (
            <ServiceCard
              key={item.id}
              service={item}
              onPress={() => router.push({
                pathname: '/service-detail' as any,
                params: { id: item.id }
              } as any)}
            />
          ))}
          <View style={{ height: Spacing.xxxl }} />
        </View>
      </CollapsibleHeader>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  categoriesContainer: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
  },
  categoryButton: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    backgroundColor: Colors.light.background,
    borderRadius: BorderRadius.xxl,
    marginRight: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  selectedCategory: {
    backgroundColor: Colors.light.primary,
    borderColor: Colors.light.primary,
  },
  categoryText: {
    ...Typography.bodySmall,
    color: Colors.light.textSecondary,
    fontWeight: '500',
  },
  selectedCategoryText: {
    color: Colors.light.textLight,
  },
  servicesList: {
    paddingTop: Spacing.lg,
  },
});