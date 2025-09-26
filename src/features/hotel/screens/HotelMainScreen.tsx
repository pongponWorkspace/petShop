import { useLanguage } from '@/src/contexts/LanguageContext';
import { IconSymbol } from '@/src/shared/components/ui/icon-symbol';
import { Colors } from '@/src/shared/constants/theme';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { hotelMainScreenStyles as styles } from '../styles/HotelMainScreen.styles';

export default function HotelMainScreen() {
  console.log('HotelMainScreen')
  const router = useRouter();
  const { t } = useLanguage();

  const handleHotelSelect = (petType: 'dog' | 'cat') => {
    router.push(`/hotel-rooms?petType=${petType}` as any);
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
        <Text style={styles.headerTitle}>{t('petHotel')}</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Content */}
      <View style={styles.content}>
        <View style={styles.introSection}>
          <IconSymbol name="house.fill" size={32} color={Colors.light.info} />
          <Text style={styles.introTitle}>{t('choosePetType')}</Text>
          <Text style={styles.introDescription}>
            {t('selectHotelForPet')}
          </Text>
        </View>

        <View style={styles.hotelsContainer}>
          {/* Dog Hotel */}
          <TouchableOpacity
            style={styles.hotelCard}
            onPress={() => handleHotelSelect('dog')}
            activeOpacity={0.8}
          >
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1551717743-49959800b1f6?w=400&h=300&fit=crop' }}
              style={styles.hotelImage}
            />
            <View style={styles.hotelOverlay}>
              <Text style={styles.hotelText}>{t('dogHotel')}</Text>
            </View>
          </TouchableOpacity>

          {/* Cat Hotel */}
          <TouchableOpacity
            style={styles.hotelCard}
            onPress={() => handleHotelSelect('cat')}
            activeOpacity={0.8}
          >
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=300&fit=crop' }}
              style={styles.hotelImage}
            />
            <View style={styles.hotelOverlay}>
              <Text style={styles.hotelText}>{t('catHotel')}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}