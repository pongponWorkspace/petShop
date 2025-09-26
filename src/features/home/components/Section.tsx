import { Spacing } from '@/src/shared/constants/theme';
import React from 'react';
import { StyleSheet, View } from 'react-native';

interface SectionProps {
  children: React.ReactNode;
  style?: any;
}

export default function Section({ children, style }: SectionProps) {
  return (
    <View style={[styles.container, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.xxl,
  },
});