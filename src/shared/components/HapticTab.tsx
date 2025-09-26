import { TouchableOpacity } from 'react-native';
import * as Haptics from 'expo-haptics';
import React from 'react';
import type { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';

export function HapticTab({ children, onPress, ...otherProps }: BottomTabBarButtonProps) {
  const handlePress = (event: any) => {
    // Trigger haptic feedback
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    // Call the original onPress handler
    onPress?.(event);
  };

  return (
    <TouchableOpacity onPress={handlePress} {...otherProps}>
      {children}
    </TouchableOpacity>
  );
}