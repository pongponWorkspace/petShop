import { StyleSheet } from 'react-native';
import { Colors, Spacing } from '@/src/shared/constants/theme';

export const homeScreenStyles = StyleSheet.create({
  container: {
    // Additional specific styles for home screen can go here
    backgroundColor: Colors.light.background,
  },

  // Any home-specific layout styles
  contentWrapper: {
    paddingHorizontal: Spacing.lg,
  },
});