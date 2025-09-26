import { useLanguage } from '@/src/contexts/LanguageContext';
import { Pet } from '@/src/data/types';
import { PetCard } from '@/src/features/pets';
import { CollapsibleHeader } from '@/src/shared/components';
import { Colors, Spacing, Typography } from '@/src/shared/constants/theme';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { IconSymbol } from '@/src/shared/components/ui/icon-symbol';
import { BorderRadius, Shadows } from '@/src/shared/constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';

const mockPets: Pet[] = [
  {
    id: '1',
    name: 'Buddy',
    type: 'dog',
    breed: 'Golden Retriever',
    age: 3,
    weight: 25.5,
    imageUrl: 'https://images.unsplash.com/photo-1552053516-e694edc4ee9c?w=300&h=300&fit=crop',
    medicalHistory: [
      {
        id: '1',
        date: '2024-08-15',
        type: 'vaccination',
        description: 'Annual vaccination',
        veterinarian: 'Dr. Sarah Johnson',
        notes: 'All vaccinations up to date'
      }
    ],
    allergies: ['chicken', 'soy'],
    congenitalDiseases: ['Hip Dysplasia'],
    attendingVeterinarian: {
      name: 'Dr. Sarah Johnson',
      phone: '+66-2-555-0123'
    },
    lastSeen: '2024-09-15',
    nextAppointment: {
      date: '2024-10-15',
      time: '10:00 AM',
      type: 'Regular Checkup',
      veterinarian: 'Dr. Sarah Johnson',
    }
  },
  {
    id: '2',
    name: 'Whiskers',
    type: 'cat',
    breed: 'Persian',
    age: 2,
    weight: 4.2,
    imageUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=300&h=300&fit=crop',
    medicalHistory: [
      {
        id: '2',
        date: '2024-09-01',
        type: 'checkup',
        description: 'Routine health examination',
        veterinarian: 'Dr. Michael Chen',
        notes: 'Healthy weight, good dental health'
      }
    ],
    allergies: [],
    congenitalDiseases: [],
    attendingVeterinarian: {
      name: 'Dr. Michael Chen',
      phone: '+66-2-555-0456'
    },
    lastSeen: '2024-09-01',
  },
  {
    id: '3',
    name: 'Max',
    type: 'dog',
    breed: 'Labrador',
    age: 1,
    weight: 18.0,
    imageUrl: 'https://images.unsplash.com/photo-1551717743-49959800b1f6?w=300&h=300&fit=crop',
    medicalHistory: [],
    allergies: ['peanuts'],
    congenitalDiseases: [],
    lastSeen: '2024-08-20',
    nextAppointment: {
      date: '2024-11-10',
      time: '3:00 PM',
      type: 'Puppy Vaccination',
      veterinarian: 'Dr. Emily White',
    }
  },
  {
    id: '4',
    name: 'Luna',
    type: 'cat',
    breed: 'Siamese',
    age: 5,
    weight: 3.8,
    imageUrl: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=300&h=300&fit=crop',
    medicalHistory: [
      {
        id: '4',
        date: '2024-07-10',
        type: 'treatment',
        description: 'Dental cleaning',
        veterinarian: 'Dr. Robert Lee',
        notes: 'Good dental health maintained'
      }
    ],
    allergies: [],
    congenitalDiseases: [],
    attendingVeterinarian: {
      name: 'Dr. Robert Lee',
      phone: '+66-2-555-0789'
    },
    lastSeen: '2024-07-10',
  },
];

export default function PetsScreen() {
  const router = useRouter();
  const { t } = useLanguage();
  const [pets, setPets] = useState<Pet[]>(mockPets);

  const handleAddPet = () => {
    router.push('/add-pet');
  };

  const handlePetPress = (pet: Pet) => {
    // Navigate to pet detail screen
    console.log('View pet details:', pet.name);
  };

  const handleRemovePet = (petId: string, petName: string) => {
    Alert.alert(
      t('removePet'),
      t('removePetConfirm', {name: petName}),
      [
        {
          text: t('cancel'),
          style: 'cancel',
        },
        {
          text: t('remove'),
          style: 'destructive',
          onPress: () => {
            setPets(prev => prev.filter(pet => pet.id !== petId));
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <CollapsibleHeader
        title={t('myPets')}
      >
        <View style={styles.addButtonContainer}>
          <TouchableOpacity style={styles.addButton} onPress={handleAddPet}>
            <View style={styles.addButtonContent}>
              <View style={styles.addButtonIconContainer}>
                <IconSymbol name="plus.circle.fill" size={24} color={Colors.light.textLight} />
              </View>
              <View style={styles.addButtonTextContainer}>
                <Text style={styles.addButtonTitle}>{t('addNewPet')}</Text>
                <Text style={styles.addButtonSubtitle}>{t('registerNewFamily')}</Text>
              </View>
              <View style={styles.addButtonArrow}>
                <IconSymbol name="arrow.right" size={20} color={Colors.light.textLight} />
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {pets.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>{t('noPetsYet')}</Text>
            <Text style={styles.emptySubtext}>{t('addFirstPet')}</Text>
          </View>
        ) : (
          <View style={styles.petsList}>
            {pets.map(item => (
              <PetCard
                key={item.id}
                pet={item}
                onPress={() => handlePetPress(item)}
                onRemove={() => handleRemovePet(item.id, item.name)}
              />
            ))}
            <View style={{ height: Spacing.xxxl }} />
          </View>
        )}
      </CollapsibleHeader>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  addButtonContainer: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
    backgroundColor: Colors.light.background,
  },
  addButton: {
    backgroundColor: Colors.light.primary,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    elevation: 4,
    shadowColor: Colors.light.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    ...Shadows.medium,
  },
  addButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  addButtonIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.light.textLight + '20',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonTextContainer: {
    flex: 1,
    marginLeft: Spacing.md,
    marginRight: Spacing.sm,
  },
  addButtonTitle: {
    ...Typography.body,
    color: Colors.light.textLight,
    fontWeight: '700',
    fontSize: 16,
    letterSpacing: 0.3,
  },
  addButtonSubtitle: {
    ...Typography.caption,
    color: Colors.light.textLight + 'CC',
    marginTop: 2,
    fontSize: 12,
  },
  addButtonArrow: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.light.textLight + '20',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.xxxl,
  },
  emptyText: {
    ...Typography.h3,
    color: Colors.light.text,
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },
  emptySubtext: {
    ...Typography.body,
    color: Colors.light.textSecondary,
    textAlign: 'center',
  },
  petsList: {
    paddingTop: Spacing.md,
  },
});