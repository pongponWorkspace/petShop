import React from 'react';
import { Pressable, StyleSheet, View, ViewStyle } from 'react-native';
import { BorderRadius, Colors, Layout, Shadows, Spacing } from '../constants/theme';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  padding?: keyof typeof Spacing;
  variant?: 'elevated' | 'outlined' | 'filled';
  onPress?: () => void;
  disabled?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  style,
  padding = 'lg',
  variant = 'elevated',
  onPress,
  disabled = false,
}) => {
  const cardContent = (
    <View style={[
      styles.card,
      styles[variant],
      { padding: Spacing[padding] },
      disabled && styles.disabled,
      style,
    ]}>
      {children}
    </View>
  );

  if (onPress) {
    return (
      <Pressable
        style={({ pressed }) => [
          pressed && !disabled && styles.pressed,
        ]}
        onPress={onPress}
        disabled={disabled}
        android_ripple={{
          color: Colors.light.border,
          borderless: false,
        }}
      >
        {cardContent}
      </Pressable>
    );
  }

  return cardContent;
};

const styles = StyleSheet.create({
  card: {
    borderRadius: BorderRadius.lg,
    marginVertical: Spacing.xs,
    maxWidth: Layout.cardMaxWidth,
    overflow: 'hidden',
  },
  
  // Variants
  elevated: {
    backgroundColor: Colors.light.surface,
    ...Shadows.small,
  },
  outlined: {
    backgroundColor: Colors.light.surface,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  filled: {
    backgroundColor: Colors.light.surfaceSecondary,
  },
  
  // States
  disabled: {
    opacity: 0.6,
  },
  pressed: {
    opacity: 0.95,
    transform: [{ scale: 0.99 }],
  },
});