import React, { useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { Colors, Spacing, Typography } from '../constants/theme';

interface CollapsibleHeaderProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  stickyComponent?: React.ReactNode;
  scrollViewProps?: any;
}

export const CollapsibleHeader: React.FC<CollapsibleHeaderProps> = ({
  title,
  subtitle,
  children,
  stickyComponent,
  scrollViewProps = {},
}) => {
  const scrollY = useRef(new Animated.Value(0)).current;
  
  const HEADER_HEIGHT = 80;
  const HEADER_MIN_HEIGHT = 1;
  
  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: [HEADER_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: 'clamp',
  });
  
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, (HEADER_HEIGHT - HEADER_MIN_HEIGHT) / 2, HEADER_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: [1, 0.2, 0],
    extrapolate: 'clamp',
  });
  
  const separatorOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      {/* Fixed header container */}
      <Animated.View style={[styles.headerContainer, { height: headerHeight }]}>
        <Animated.View style={[styles.headerContent, { opacity: headerOpacity }]}>
          <Text style={styles.title} numberOfLines={1}>{title}</Text>
          {subtitle && <Text style={styles.subtitle} numberOfLines={1}>{subtitle}</Text>}
        </Animated.View>

        {/* Separator line that becomes visible when collapsed */}
        <Animated.View style={[styles.separator, { opacity: separatorOpacity }]} />
      </Animated.View>
      
      {/* Sticky component (like category tabs) */}
      {stickyComponent && (
        <View style={styles.stickyContainer}>
          {stickyComponent}
        </View>
      )}
      
      {/* Scrollable content */}
      <Animated.ScrollView
        {...scrollViewProps}
        style={styles.scrollView}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        {children}
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  headerContainer: {
    backgroundColor: Colors.light.background,
    justifyContent: 'flex-end',
    zIndex: 1000,
  },
  headerContent: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.lg,
  },
  title: {
    ...Typography.h2,
    color: Colors.light.text,
    marginBottom: 2,
  },
  subtitle: {
    ...Typography.body,
    color: Colors.light.textSecondary,
  },
  separator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: Colors.light.border,
    shadowColor: Colors.light.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  stickyContainer: {
    backgroundColor: Colors.light.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
    zIndex: 999,
  },
  scrollView: {
    flex: 1,
  },
});