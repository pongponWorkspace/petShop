import { useLanguage } from '@/src/contexts/LanguageContext';
import { Pet } from '@/src/data/types';
import { Button, Card, Input } from '@/src/shared/components';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Service } from '../service-detail';

interface BookingFormProps {
  service: Service;
  pets: Pet[];
  onSubmit: (bookingData: any) => void;
  onCancel: () => void;
}

export const BookingForm: React.FC<BookingFormProps> = ({
  service,
  pets,
  onSubmit,
  onCancel,
}) => {
  const { t } = useLanguage();
  const [selectedPets, setSelectedPets] = useState<string[]>([]);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [notes, setNotes] = useState('');

  const togglePetSelection = (petId: string) => {
    setSelectedPets(prev => 
      prev.includes(petId) 
        ? prev.filter(id => id !== petId)
        : [...prev, petId]
    );
  };

  const handleSubmit = () => {
    if (selectedPets.length === 0) {
      Alert.alert(t('error'), t('errorSelectPets'));
      return;
    }
    if (!date || !time) {
      Alert.alert(t('error'), t('errorSelectDateTime'));
      return;
    }

    const totalPrice = service.price * selectedPets.length;
    
    onSubmit({
      serviceId: service.id,
      petIds: selectedPets,
      date,
      time,
      notes,
      totalPrice,
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{t('book', {service: service.name})}</Text>

      <Card>
        <Text style={styles.sectionTitle}>{t('selectPetsLabel')}</Text>
        {pets.map(pet => (
          <TouchableOpacity
            key={pet.id}
            style={[
              styles.petItem,
              selectedPets.includes(pet.id) && styles.selectedPet
            ]}
            onPress={() => togglePetSelection(pet.id)}
          >
            <Text style={styles.petName}>{pet.name}</Text>
            <Text style={styles.petBreed}>{pet.breed}</Text>
          </TouchableOpacity>
        ))}
      </Card>

      <Input
        label={t('date')}
        value={date}
        onChangeText={setDate}
        placeholder={t('datePlaceholder')}
      />

      <Input
        label={t('time')}
        value={time}
        onChangeText={setTime}
        placeholder={t('timePlaceholder')}
      />

      <Input
        label={t('specialNotes')}
        value={notes}
        onChangeText={setNotes}
        placeholder={t('anySpecialRequirements')}
        multiline
        numberOfLines={3}
      />

      <Card>
        <Text style={styles.summary}>{t('bookingAndSummary')}</Text>
        <Text style={styles.serviceText}>{t('serviceLabel', {service: service.name})}</Text>
        <Text style={styles.petsText}>
          {t('petsSelected', {count: selectedPets.length})}
        </Text>
        <Text style={styles.totalPrice}>
          {t('total', {amount: service.price * selectedPets.length})}
        </Text>
      </Card>

      <View style={styles.buttonContainer}>
        <Button
          title={t('cancel')}
          onPress={onCancel}
          variant="outline"
          style={styles.button}
        />
        <Button
          title={t('bookNow')}
          onPress={handleSubmit}
          style={styles.button}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: '#333',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  petItem: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DDD',
    marginBottom: 8,
  },
  selectedPet: {
    backgroundColor: '#FFE6E6',
    borderColor: '#FF6B6B',
  },
  petName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  petBreed: {
    fontSize: 14,
    color: '#666',
  },
  summary: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  serviceText: {
    fontSize: 16,
    marginBottom: 4,
    color: '#333',
  },
  petsText: {
    fontSize: 16,
    marginBottom: 4,
    color: '#333',
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6B6B',
    marginTop: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  button: {
    flex: 0.48,
  },
});