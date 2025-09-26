import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { IconSymbol } from '@/src/shared/components/ui/icon-symbol';
import { Colors } from '@/src/shared/constants/theme';
import { useLanguage } from '@/src/contexts/LanguageContext';

import { FormData, useAddPetController } from './add-pet-controller';
import { addPetStyles as styles } from './add-pet-style';

export default function AddPetScreen() {
  const { t } = useLanguage();
  const controller = useAddPetController();
  const { state, actions, helpers, refs } = controller;

  const renderInput = (
    field: keyof FormData,
    label: string,
    required: boolean = false,
    multiline: boolean = false,
    keyboardType: 'default' | 'numeric' | 'phone-pad' = 'default',
    placeholder?: string,
    helpText?: string
  ) => {
    return (
      <View style={styles.inputGroup}>
        <Text style={[styles.label, required && styles.requiredLabel]}>
          {label} {required && '*'}
        </Text>
        <TextInput
          ref={(ref) => { if (ref) refs.inputRefs.current[field] = ref; }}
          style={[styles.input, multiline && styles.textArea]}
          value={state.formData[field]}
          onChangeText={(value) => actions.updateFormData(field, value)}
          placeholder={placeholder}
          placeholderTextColor={Colors.light.textTertiary}
          multiline={multiline}
          numberOfLines={multiline ? 3 : 1}
          keyboardType={keyboardType}
          returnKeyType="next"
          onSubmitEditing={() => {
            // Focus next input logic could be added here
          }}
        />
        {helpText && <Text style={styles.helpText}>{helpText}</Text>}
      </View>
    );
  };

  const renderPetTypeSelector = () => {
    const petTypes: { value: 'dog' | 'cat' | 'other'; label: string; icon: string }[] = [
      { value: 'dog', label: t('dog'), icon: 'pawprint.fill' },
      { value: 'cat', label: t('cat'), icon: 'pawprint.fill' },
      { value: 'other', label: t('other'), icon: 'questionmark.circle' },
    ];

    return (
      <View style={styles.inputGroup}>
        <Text style={styles.label}>{t('petType')} *</Text>
        <View style={styles.petTypeContainer}>
          {petTypes.map((type) => (
            <TouchableOpacity
              key={type.value}
              style={[
                styles.petTypeOption,
                state.formData.type === type.value && styles.petTypeOptionSelected
              ]}
              onPress={() => actions.updateFormData('type', type.value)}
            >
              <IconSymbol
                name={type.icon as any}
                size={24}
                color={state.formData.type === type.value ? Colors.light.primary : Colors.light.textSecondary}
                style={styles.petTypeIcon}
              />
              <Text style={[
                styles.petTypeText,
                state.formData.type === type.value && styles.petTypeTextSelected
              ]}>
                {type.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  const renderAllFields = () => {
    return (
      <>
        {/* Basic Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('basicInformation')}</Text>
          {renderInput('name', t('petName'), true, false, 'default', t('enterPetName'))}
          {renderPetTypeSelector()}
          {renderInput('breed', t('breed'), true, false, 'default', t('enterBreed'))}
        </View>

        {/* Physical Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('physicalDetails')}</Text>
          {renderInput('age', t('age'), true, false, 'numeric', t('enterAge'), t('ageInYears'))}
          {renderInput('weight', t('weight'), true, false, 'numeric', t('enterWeight'), t('weightInKg'))}
        </View>

        {/* Medical Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('medicalInformation')}</Text>
          {renderInput('allergies', t('allergies'), false, true, 'default', t('enterAllergies'), t('separateWithCommas'))}
          {renderInput('congenitalDiseases', t('congenitalDiseases'), false, true, 'default', t('enterCongenitalDiseases'), t('separateWithCommas'))}
          {renderInput('attendingVeterinarianName', t('attendingVeterinarianName'), false, false, 'default', t('enterVetName'))}
          {renderInput('attendingVeterinarianPhone', t('attendingVeterinarianPhone'), false, false, 'phone-pad', t('enterVetPhone'))}
        </View>
      </>
    );
  };

  const renderButtons = () => {
    return (
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.submitButton,
            (!helpers.isFormValid() || state.loading) && styles.submitButtonDisabled
          ]}
          onPress={actions.handleSubmit}
          disabled={!helpers.isFormValid() || state.loading}
        >
          {state.loading ? (
            <ActivityIndicator size="small" color={Colors.light.textLight} />
          ) : (
            <Text style={[
              styles.submitButtonText,
              (!helpers.isFormValid() || state.loading) && styles.submitButtonTextDisabled
            ]}>
              {t('addPet')}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" backgroundColor={Colors.light.surface} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={actions.goBack}>
          <IconSymbol name="chevron.left" size={24} color={Colors.light.text} />
          <Text style={styles.backText}>{t('back')}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('addNewPet')}</Text>
        <View style={styles.placeholder} />
      </View>

      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          ref={refs.scrollViewRef}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Form Title */}
          <View style={styles.formHeader}>
            <Text style={styles.formTitle}>{t('petInformation')}</Text>
            <Text style={styles.formSubtitle}>{t('fillAllRequiredFields')}</Text>
          </View>

          {/* Error Display */}
          {state.error && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorTitle}>{t('error')}</Text>
              <Text style={styles.errorMessage}>{state.error}</Text>
            </View>
          )}

          {/* All Form Fields */}
          {renderAllFields()}
        </ScrollView>

        {/* Navigation Buttons */}
        {renderButtons()}
      </KeyboardAvoidingView>
    </View>
  );
}