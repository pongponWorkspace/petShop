import { useLanguage } from '@/src/contexts/LanguageContext';
import { IconSymbol } from '@/src/shared/components/ui/icon-symbol';
import { Colors } from '@/src/shared/constants/theme';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { hospitalMainScreenStyles as styles } from '../styles/HospitalMainScreen.styles';

export default function HospitalMainScreen() {
  const router = useRouter();
  const { t } = useLanguage();

  const handleHospitalTypeSelect = (hospitalType: 'specialist' | 'general') => {
    router.push(`/hospital-booking?hospitalType=${hospitalType}` as any);
  };

  return (
   <View style={styles.container}>
        <StatusBar style="dark" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <IconSymbol name="chevron.left" size={24} color={Colors.light.text} />
          <Text style={styles.backText}>{t('back')}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('petHospital')}</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Content */}
      <View style={styles.content}>
        <View style={styles.introSection}>
          <IconSymbol name="stethoscope" size={32} color={Colors.light.info} />
          <Text style={styles.introTitle}>{t('chooseHospitalType')}</Text>
          <Text style={styles.introDescription}>
            {t('selectHospitalForPet')}
          </Text>
        </View>

        <View style={styles.hospitalContainer}>
          {/* Specialist Hospital */}
          <TouchableOpacity
            style={styles.hospitalCard}
            onPress={() => handleHospitalTypeSelect('specialist')}
            activeOpacity={0.8}
          >
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop' }}
              style={styles.hospitalImage}
            />
            <View style={styles.hospitalOverlay}>
              <IconSymbol name="person.crop.circle.badge.plus" size={24} color={Colors.light.surface} />
              <Text style={styles.hospitalText}>{t('specialistHospital')}</Text>
              <Text style={styles.hospitalSubText}>{t('specialistHospitalDesc')}</Text>
            </View>
          </TouchableOpacity>

          {/* General Hospital */}
          <TouchableOpacity
            style={styles.hospitalCard}
            onPress={() => handleHospitalTypeSelect('general')}
            activeOpacity={0.8}
          >
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?q=80&w=1886&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Dhttps://images.unsplash.com/photo-1450778869180-41d0601e046e?q=80&w=1886&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }}
              style={styles.hospitalImage}
            />
            <View style={styles.hospitalOverlay}>
              <IconSymbol name="heart.fill" size={24} color={Colors.light.surface} />
              <Text style={styles.hospitalText}>{t('generalHospital')}</Text>
              <Text style={styles.hospitalSubText}>{t('generalHospitalDesc')}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}