import { mockQuickActions, QuickAction } from '@/src/data/mock';
import { IconSymbol } from '@/src/shared/components/ui/icon-symbol';
import { BorderRadius, Colors, Layout, Shadows, Spacing, Typography } from '@/src/shared/constants/theme';
import { useRouter } from 'expo-router';
import React from 'react';
import { Alert, Linking, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface QuickActionsProps {
  actions?: QuickAction[];
}

export default function QuickActions({ actions = mockQuickActions }: QuickActionsProps) {
  const router = useRouter();

  const getIconColor = (color: string) => {
    switch (color) {
      case 'error': return Colors.light.error;
      case 'info': return Colors.light.info;
      case 'warning': return Colors.light.warning;
      case 'secondary': return Colors.light.secondary;
      default: return Colors.light.primary;
    }
  };

  const openShopApp = async () => {
    try {
      const lazadaAppUrl = 'https://s.lazada.co.th';
      const canOpen = await Linking.canOpenURL(lazadaAppUrl);

      if (canOpen) {
        await Linking.openURL(lazadaAppUrl);
      } else {
        Alert.alert(
          'Lazada App Not Found',
          'Would you like to download the Lazada app or visit the website?',
          [
            {
              text: 'Download App',
              onPress: () => {
                const storeUrl = Platform.OS === 'ios'
                  ? 'https://apps.apple.com/app/lazada'
                  : 'https://play.google.com/store/apps/details?id=com.lazada.ph';
                Linking.openURL(storeUrl);
              }
            },
            {
              text: 'Open Website',
              onPress: () => {
                Linking.openURL('https://lazada.com');
              }
            },
            {
              text: 'Cancel',
              style: 'cancel'
            }
          ]
        );
      }
    } catch (error) {
      console.error('Error opening Lazada:', error);
      Alert.alert('Error', 'Unable to open Lazada. Please try again later.');
    }
  };

  const handleActionPress = (action: QuickAction) => {
    if (action.route === 'external') {
      openShopApp();
    } else {
      router.push(action.route as any);
    }
  };

  return (
    <View style={styles.container}>
      {actions.map((action) => (
        <TouchableOpacity
          key={action.id}
          style={styles.actionCard}
          onPress={() => handleActionPress(action)}
        >
          <IconSymbol
            name={action.icon as any}
            size={24}
            color={getIconColor(action.color)}
            style={styles.actionIcon}
          />
          <Text style={styles.actionTitle}>{action.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.xxl,
    gap: Spacing.md,
    paddingTop: Spacing.lg
  },
  actionCard: {
    flex: 1,
    minWidth: (Layout.screenWidth - (Spacing.lg * 2) - (Spacing.md * 3)) / 4,
    backgroundColor: Colors.light.surface,
    borderRadius: BorderRadius.lg,
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.sm,
    alignItems: 'center',
    ...Shadows.small,
  },
  actionIcon: {
    marginBottom: Spacing.sm,
  },
  actionTitle: {
    ...Typography.caption,
    fontWeight: '600',
    color: Colors.light.text,
    textAlign: 'center',
    lineHeight: Typography.caption.lineHeight,
  },
});