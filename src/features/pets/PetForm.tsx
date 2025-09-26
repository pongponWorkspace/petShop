import { Pet } from '@/src/data/types';
import { Input } from '@/src/shared/components';
import React, { useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';

interface PetFormProps {
  pet?: Pet;
  onSubmit: (petData: Partial<Pet>) => void;
  onCancel: () => void;
}

export const PetForm: React.FC<PetFormProps> = ({ pet, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: pet?.name || '',
    type: pet?.type || 'dog' as const,
    breed: pet?.breed || '',
    age: pet?.age?.toString() || '',
    weight: pet?.weight?.toString() || '',
    allergies: pet?.allergies?.join(', ') || '',
  });

  const handleSubmit = () => {
    const petData: Partial<Pet> = {
      ...formData,
      age: parseInt(formData.age) || 0,
      weight: parseFloat(formData.weight) || 0,
      allergies: formData.allergies.split(',').map(a => a.trim()).filter(Boolean),
    };
    onSubmit(petData);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{pet ? 'Edit Pet' : 'Add New Pet'}</Text>
      
      <Input
        label="Pet Name"
        value={formData.name}
        onChangeText={(text) => setFormData({ ...formData, name: text })}
        placeholder="Enter pet name"
      />

      <Input
        label="Breed"
        value={formData.breed}
        onChangeText={(text) => setFormData({ ...formData, breed: text })}
        placeholder="Enter breed"
      />

      <Input
        label="Age (years)"
        value={formData.age}
        onChangeText={(text) => setFormData({ ...formData, age: text })}
        placeholder="Enter age"
        keyboardType="numeric"
      />

      <Input
        label="Weight (kg)"
        value={formData.weight}
        onChangeText={(text) => setFormData({ ...formData, weight: text })}
        placeholder="Enter weight"
        keyboardType="numeric"
      />

      <Input
        label="Allergies (comma separated)"
        value={formData.allergies}
        onChangeText={(text) => setFormData({ ...formData, allergies: text })}
        placeholder="e.g., chicken, pollen"
        multiline
      />

      <View style={styles.buttonContainer}>
        <Button
          title="Cancel"
          onPress={onCancel}
          variant="outline"
          style={styles.button}
        />
        <Button
          title={pet ? 'Update' : 'Add Pet'}
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  button: {
    flex: 0.48,
  },
});