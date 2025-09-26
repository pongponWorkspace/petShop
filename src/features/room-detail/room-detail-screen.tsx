import { useLanguage } from '@/src/contexts/LanguageContext';
import { Button } from '@/src/shared/components';
import { IconSymbol } from '@/src/shared/components/ui/icon-symbol';
import { Colors } from '@/src/shared/constants/theme';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ImageView from 'react-native-image-viewing';
import { useRoomDetailController } from './room-detail-controller';
import { roomDetailStyles as styles } from './room-detail-style';

export default function RoomDetailScreen() {
  const { t } = useLanguage();
  const controller = useRoomDetailController();
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
          <Text style={styles.headerTitle}>{t('roomDetails')}</Text>
          <View style={styles.placeholder} />
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.light.primary} />
          <Text style={styles.loadingText}>{t('loadingRooms')}</Text>
        </View>
      </View>
    );
  }

  // Error state
  if (state.error || !state.room) {
    return (
      <View style={styles.container}>
        <StatusBar style="dark" />
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={actions.goBack}>
            <IconSymbol name="chevron.left" size={24} color={Colors.light.text} />
            <Text style={styles.backText}>{t('back')}</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{t('roomDetails')}</Text>
          <View style={styles.placeholder} />
        </View>
        <View style={styles.errorContainer}>
          <IconSymbol name="exclamationmark.triangle" size={48} color={Colors.light.error} />
          <Text style={styles.errorTitle}>{t('error')}</Text>
          <Text style={styles.errorText}>
            {state.error || t('roomNotFound')}
          </Text>
          <TouchableOpacity style={styles.retryButton} onPress={actions.loadRoom}>
            <Text style={styles.retryButtonText}>{t('retry')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const { room } = state;
  const imageViewerImages = room.images.map(uri => ({ uri }));

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={actions.goBack}>
          <IconSymbol name="chevron.left" size={24} color={Colors.light.text} />
          <Text style={styles.backText}>{t('back')}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('roomDetails')}</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Image Gallery */}
        <View style={styles.imageGallery}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.imageScrollView}
          >
            {room.images.map((imageUri, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => actions.openImageViewer(index)}
                style={[styles.roomImage, index === 0 && styles.firstImage]}
              >
                <Image source={{ uri: imageUri }} style={styles.roomImage} />
              </TouchableOpacity>
            ))}
          </ScrollView>
          <View style={styles.imageIndicator}>
            <Text style={styles.imageIndicatorText}>
              {room.images.length} {t('photos')}
            </Text>
          </View>
        </View>

        {/* Room Info */}
        <View style={styles.roomInfoSection}>
          <View style={styles.roomHeader}>
            <View style={styles.roomTitleContainer}>
              <Text style={styles.roomName}>{room.name}</Text>
              <Text style={styles.roomDescription}>{room.description}</Text>
            </View>
            <View style={styles.priceContainer}>
              <Text style={styles.roomPrice}>{helpers.formatPrice()}</Text>
              <Text style={styles.priceUnit}>/{t('night')}</Text>
              <View style={[
                styles.availabilityBadge,
                room.available ? styles.availableBadge : styles.unavailableBadge
              ]}>
                <Text style={[
                  styles.availabilityText,
                  room.available ? styles.availableText : styles.unavailableText
                ]}>
                  {room.available ? t('available') : t('unavailable')}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Room Details */}
        <View style={styles.roomDetailsSection}>
          <Text style={styles.sectionTitle}>{t('roomDetails')}</Text>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>{t('roomSize')}</Text>
            <Text style={styles.detailValue}>{room.size}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>{t('petCapacity')}</Text>
            <Text style={styles.detailValue}>{room.capacity} {t('pets')}</Text>
          </View>

          <View style={[styles.detailRow, styles.lastDetailRow]}>
            <Text style={styles.detailLabel}>{t('roomType')}</Text>
            <Text style={styles.detailValue}>{room.type}</Text>
          </View>
        </View>

        {/* Amenities */}
        <View style={styles.amenitiesSection}>
          <Text style={styles.sectionTitle}>{t('amenities')}</Text>
          <View style={styles.amenitiesGrid}>
            {helpers.getAmenitiesDisplay().map((amenity, index) => (
              <View key={index} style={styles.amenityTag}>
                <Text style={styles.amenityText}>{amenity}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Book Button */}
        <View style={styles.bookingSection}>
          <Button
            title={room.available ? t('bookThisRoom') : t('roomUnavailable')}
            onPress={actions.handleBookRoom}
            disabled={!room.available}
            style={[
              styles.bookButton,
              !room.available && styles.disabledButton
            ]}
          />
        </View>
      </ScrollView>

      {/* Image Viewer */}
      <ImageView
        images={imageViewerImages}
        imageIndex={state.selectedImageIndex}
        visible={state.showImageViewer}
        onRequestClose={actions.closeImageViewer}
      />
    </View>
  );
}