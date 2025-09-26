import { useLanguage } from '@/src/contexts/LanguageContext';
import { Pet } from '@/src/data/types';
import { Card } from '@/src/shared/components';
import { IconSymbol } from '@/src/shared/components/ui/icon-symbol';
import { BorderRadius, Colors, Layout, Spacing, Typography } from '@/src/shared/constants/theme';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface PetCardProps {
  pet: Pet;
  onPress?: () => void;
  onRemove?: () => void;
  compact?: boolean;
}

export const PetCard: React.FC<PetCardProps> = ({ pet, onPress, onRemove, compact = false }) => {
  const { t } = useLanguage();
  const getPetTypeEmoji = (type: string) => {
    switch (type) {
      case 'dog': return '🐕';
      case 'cat': return '🐱';
      default: return '🐾';
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return t('na');
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (compact) {
    return (
      <Card
        onPress={onPress}
        style={{ ...styles.card, ...styles.compactCard }}
        padding="md"
      >
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: pet.imageUrl || `https://via.placeholder.com/80x80?text=${getPetTypeEmoji(pet.type)}` }}
              style={styles.image}
              resizeMode="cover"
            />
            <View style={styles.typeBadge}>
              <Text style={styles.typeEmoji}>{getPetTypeEmoji(pet.type)}</Text>
            </View>
          </View>

          <View style={styles.info}>
            <Text style={styles.name} numberOfLines={1}>{pet.name}</Text>
            <Text style={styles.breed} numberOfLines={1}>{pet.breed}</Text>
            <Text style={styles.details}>{t('yearsOld', {age: pet.age})} • {t('weightKg', {weight: pet.weight})}</Text>
          </View>
        </View>
      </Card>
    );
  }

  return (
    <Card
      onPress={onPress}
      style={styles.card}
      padding="lg"
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: pet.imageUrl || `https://via.placeholder.com/100x100?text=${getPetTypeEmoji(pet.type)}` }}
            style={styles.detailImage}
            resizeMode="cover"
          />
          <View style={styles.typeBadge}>
            <Text style={styles.typeEmoji}>{getPetTypeEmoji(pet.type)}</Text>
          </View>
        </View>

        <View style={styles.headerInfo}>
          <Text style={styles.name}>{pet.name}</Text>
          <Text style={styles.breed}>{pet.breed}</Text>
          <Text style={styles.details}>{t('yearsOld', {age: pet.age})} • {t('weightKg', {weight: pet.weight})}</Text>
        </View>

        {onRemove && (
          <TouchableOpacity style={styles.removeButton} onPress={onRemove}>
            <IconSymbol name="trash" size={20} color={Colors.light.error} />
          </TouchableOpacity>
        )}
      </View>

      {/* Medical Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('medicalInformation')}</Text>

        {/* Attending Veterinarian */}
        {pet.attendingVeterinarian && (
          <View style={styles.infoRow}>
            <IconSymbol name="person.fill" size={16} color={Colors.light.primary} />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>{t('attendingVeterinarian')}</Text>
              <Text style={styles.infoText}>{pet.attendingVeterinarian.name}</Text>
            </View>
          </View>
        )}

        {/* Last Seen */}
        <View style={styles.infoRow}>
          <IconSymbol name="calendar" size={16} color={Colors.light.info} />
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>{t('lastSeen')}</Text>
            <Text style={styles.infoText}>{formatDate(pet.lastSeen)}</Text>
          </View>
        </View>

        {/* Next Appointment */}
        {pet.nextAppointment && (
          <View style={styles.infoRow}>
            <IconSymbol name="clock.fill" size={16} color={Colors.light.warning} />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>{t('nextAppointment')}</Text>
              <Text style={styles.infoText}>{formatDate(pet.nextAppointment.date)} {t('at')} {pet.nextAppointment.time}</Text>
            </View>
          </View>
        )}
      </View>

      {/* Health Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('healthInformation')}</Text>

        {/* Congenital Diseases */}
        <View style={styles.infoRow}>
          <IconSymbol name="heart.fill" size={16} color={Colors.light.error} />
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>{t('congenitalDiseases')}</Text>
            <Text style={styles.infoText}>
              {pet.congenitalDiseases.length > 0 ? pet.congenitalDiseases.join(', ') : t('none')}
            </Text>
          </View>
        </View>

        {/* Allergies */}
        <View style={styles.infoRow}>
          <IconSymbol name="exclamationmark.triangle.fill" size={16} color={Colors.light.warning} />
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>{t('allergies')}</Text>
            <Text style={styles.infoText}>
              {pet.allergies.length > 0 ? pet.allergies.join(', ') : t('none')}
            </Text>
          </View>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: Spacing.lg,
    marginVertical: Spacing.sm,
    maxWidth: Layout.cardMaxWidth,
  },
  compactCard: {
    marginHorizontal: 0,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  imageContainer: {
    position: 'relative',
    marginRight: Spacing.lg,
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: BorderRadius.round,
    backgroundColor: Colors.light.surfaceSecondary,
  },
  detailImage: {
    width: 80,
    height: 80,
    borderRadius: BorderRadius.round,
    backgroundColor: Colors.light.surfaceSecondary,
  },
  typeBadge: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.light.surface,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.light.background,
  },
  typeEmoji: {
    fontSize: 12,
  },
  info: {
    flex: 1,
    minWidth: 0, // Prevents text overflow
  },
  headerInfo: {
    flex: 1,
    minWidth: 0,
  },
  name: {
    ...Typography.h5,
    color: Colors.light.text,
    marginBottom: 2,
  },
  breed: {
    ...Typography.bodySmall,
    color: Colors.light.textSecondary,
    marginBottom: 4,
  },
  details: {
    ...Typography.caption,
    color: Colors.light.textTertiary,
    marginBottom: 4,
  },
  section: {
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    ...Typography.h5,
    color: Colors.light.text,
    fontWeight: '600',
    marginBottom: Spacing.md,
    fontSize: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: Spacing.md,
  },
  infoContent: {
    flex: 1,
    marginLeft: Spacing.sm,
  },
  infoLabel: {
    ...Typography.caption,
    color: Colors.light.textSecondary,
    fontWeight: '500',
    marginBottom: 2,
  },
  infoText: {
    ...Typography.bodySmall,
    color: Colors.light.text,
    fontWeight: '500',
    marginBottom: 2,
  },
  infoSubtext: {
    ...Typography.caption,
    color: Colors.light.textSecondary,
  },
  actions: {
    marginLeft: Spacing.md,
    alignItems: 'center',
  },
  statusIndicator: {
    alignItems: 'center',
  },
  healthStatus: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.light.success,
  },
  removeButton: {
    padding: Spacing.xs,
    borderRadius: BorderRadius.sm,
    backgroundColor: '#FEE2E2',
    alignSelf: 'flex-start',
  },
});