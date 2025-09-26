import { Colors, Spacing, Typography } from '@/src/shared/constants/theme';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface SectionHeaderProps {
  title: string;
  showViewAll?: boolean;
  viewAllRoute?: string;
  onViewAllPress?: () => void;
}

export default function SectionHeader({
  title,
  showViewAll = true,
  viewAllRoute,
  onViewAllPress
}: SectionHeaderProps) {
  const router = useRouter();

  const handleViewAllPress = () => {
    if (onViewAllPress) {
      onViewAllPress();
    } else if (viewAllRoute) {
      router.push(viewAllRoute as any);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {showViewAll && (
        <TouchableOpacity onPress={handleViewAllPress}>
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
  },
  title: {
    ...Typography.h4,
    color: Colors.light.text,
  },
  viewAll: {
    ...Typography.bodySmall,
    color: Colors.light.primary,
    fontWeight: '600',
  },
});