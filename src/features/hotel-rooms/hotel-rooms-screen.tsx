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
  View
} from 'react-native';
import { useHotelRoomsController } from './hotel-rooms-controller';
import { hotelRoomsStyle } from './hotel-rooms-style';

export default function HotelRoomsScreen() {
  const styles = hotelRoomsStyle;
  const { 
    loading,
    hotel,
    rooms: filteredRooms,
    roomTypes,
    selectedRoomType,
    setSelectedRoomType,
    handleRoomSelect,
    getRoomTypeLabel,
    t,
    router
  } = useHotelRoomsController();

  if (loading) {
    return (
      <View style={styles.container}>
        <StatusBar style="dark" />
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <IconSymbol name="chevron.left" size={24} color={Colors.light.text} />
            <Text style={styles.backText}>{t('back')}</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{t('hotelRooms')}</Text>
          <View style={styles.placeholder} />
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.light.primary} />
          <Text style={styles.loadingText}>{t('loadingRooms')}</Text>
        </View>
      </View>
    );
  }

  if (!hotel) {
    return (
      <View style={styles.container}>
        <StatusBar style="dark" />
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <IconSymbol name="chevron.left" size={24} color={Colors.light.text} />
            <Text style={styles.backText}>{t('back')}</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{t('hotelRooms')}</Text>
          <View style={styles.placeholder} />
        </View>
        <View style={styles.errorContainer}>
          <IconSymbol name="exclamationmark.triangle" size={48} color={Colors.light.error} />
          <Text style={styles.errorTitle}>{t('error')}</Text>
          <Text style={styles.errorText}>{t('hotelNotFound')}</Text>
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
        <Text style={styles.headerTitle}>{t('hotelRooms')}</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Room Type Tabs */}
      <View style={styles.roomTypeSection}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.roomTypeScrollContent}
        >
          {roomTypes.map((roomType) => (
            <TouchableOpacity
              key={roomType}
              style={[
                styles.roomTypeButton,
                selectedRoomType === roomType && styles.roomTypeButtonActive
              ]}
              onPress={() => setSelectedRoomType(roomType)}
            >
              <Text style={[
                styles.roomTypeButtonText,
                selectedRoomType === roomType && styles.roomTypeButtonTextActive
              ]}>
                {getRoomTypeLabel(roomType)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Rooms List */}
        <View style={styles.roomsContainer}>
          {filteredRooms.map((room) => (
            <TouchableOpacity
              key={room.id}
              style={[styles.roomCard, !room.available && styles.unavailableRoom]}
              onPress={() => room.available && handleRoomSelect(room)}
              disabled={!room.available}
            >
              <Image source={{ uri: room.images[0] }} style={styles.roomImage} />
              <View style={styles.roomInfo}>
                <View style={styles.roomHeader}>
                  <Text style={styles.roomName}>{room.name}</Text>
                  <Text style={styles.roomPrice}>฿{room.price}/{t('night')}</Text>
                </View>
                <Text style={styles.roomDescription}>{room.description}</Text>
                <View style={styles.roomMeta}>
                  <Text style={styles.roomSize}>📐 {room.size}</Text>
                  <Text style={styles.roomCapacity}>🐾 {t('capacity')}: {room.capacity}</Text>
                </View>
                <View style={styles.amenitiesContainer}>
                  {room.amenities.slice(0, 3).map((amenity: string, index: number) => (
                    <View key={index} style={styles.amenityTag}>
                      <Text style={styles.amenityText}>{amenity}</Text>
                    </View>
                  ))}
                  {room.amenities.length > 3 && (
                    <Text style={styles.moreAmenities}>+{room.amenities.length - 3} {t('more')}</Text>
                  )}
                </View>
                {!room.available && (
                  <View style={styles.unavailableOverlay}>
                    <Text style={styles.unavailableText}>{t('unavailable')}</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
