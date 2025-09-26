import { notificationService } from '@/src/NotificationService';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface NotificationBadgeProps {
  style?: object;
}

export const NotificationBadge: React.FC<NotificationBadgeProps> = ({ style }) => {
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const updateCount = () => {
      setUnreadCount(notificationService.getUnreadCount());
    };

    updateCount();
    const unsubscribe = notificationService.subscribe(updateCount);

    return unsubscribe;
  }, []);

  if (unreadCount === 0) {
    return null;
  }

  return (
    <View style={[styles.badge, style]}>
      <Text style={styles.badgeText}>
        {unreadCount > 99 ? '99+' : unreadCount.toString()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    backgroundColor: '#FF6B6B',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
    position: 'absolute',
    top: -8,
    right: -8,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
});