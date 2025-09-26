import { Language, useLanguage } from '@/src/contexts/LanguageContext';
import { IconSymbol } from '@/src/shared/components/ui/icon-symbol';
import { BorderRadius, Colors, Spacing, Typography } from '@/src/shared/constants/theme';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface LanguageSelectorProps {
  style?: any;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ style }) => {
  const { language, setLanguage, t } = useLanguage();

  const handleLanguageChange = async (newLanguage: Language) => {
    await setLanguage(newLanguage);
  };

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.title}>{t('language')}</Text>
      <View style={styles.optionsContainer}>
        <TouchableOpacity
          style={[
            styles.option,
            language === 'en' && styles.selectedOption
          ]}
          onPress={() => handleLanguageChange('en')}
        >
          <Text style={[
            styles.optionText,
            language === 'en' && styles.selectedOptionText
          ]}>
            {t('english')}
          </Text>
          {language === 'en' && (
            <IconSymbol
              name="checkmark"
              size={16}
              color={Colors.light.primary}
            />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.option,
            language === 'th' && styles.selectedOption
          ]}
          onPress={() => handleLanguageChange('th')}
        >
          <Text style={[
            styles.optionText,
            language === 'th' && styles.selectedOptionText
          ]}>
            {t('thai')}
          </Text>
          {language === 'th' && (
            <IconSymbol
              name="checkmark"
              size={16}
              color={Colors.light.primary}
            />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: Spacing.lg,
  },
  title: {
    ...Typography.h4,
    color: Colors.light.text,
    marginBottom: Spacing.md,
    fontWeight: '600',
  },
  optionsContainer: {
    gap: Spacing.sm,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.md,
    backgroundColor: Colors.light.surface,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  selectedOption: {
    backgroundColor: Colors.light.primary + '10',
    borderColor: Colors.light.primary,
  },
  optionText: {
    ...Typography.body,
    color: Colors.light.text,
    fontWeight: '500',
  },
  selectedOptionText: {
    color: Colors.light.primary,
    fontWeight: '600',
  },
});