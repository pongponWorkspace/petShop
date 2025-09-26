import { mockNewsItems } from '@/src/data/mock';
import { NewsItem } from '@/src/data/types/common';
import { BorderRadius, Colors, Shadows, Spacing } from '@/src/shared/constants/theme';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import ImageView from 'react-native-image-viewing';
import PagerView from 'react-native-pager-view';
import Section from './Section';

interface NewsCarouselProps {
  newsItems?: NewsItem[];
  autoScrollInterval?: number;
}

export default function NewsCarousel({
  newsItems = mockNewsItems,
  autoScrollInterval = 4000
}: NewsCarouselProps) {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageViewerVisible, setImageViewerVisible] = useState(false);
  const [imageViewerIndex, setImageViewerIndex] = useState(0);
  const pagerRef = useRef<PagerView>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % newsItems.length;
        pagerRef.current?.setPage(nextIndex);
        return nextIndex;
      });
    }, autoScrollInterval);

    return () => clearInterval(interval);
  }, [newsItems.length, autoScrollInterval]);

  const handleDotPress = (index: number) => {
    setCurrentIndex(index);
    pagerRef.current?.setPage(index);
  };

  const handleNewsPress = (index: number) => {
    setImageViewerIndex(index);
    setImageViewerVisible(true);
  };

  const handleViewAllPress = () => {
    router.push('/content-list?type=news' as any);
  };

  return (
    <Section>

    <View style={styles.container}>
      <PagerView
        ref={pagerRef}
        style={styles.pager}
        initialPage={0}
        onPageSelected={(e) => {
          setCurrentIndex(e.nativeEvent.position);
        }}
      >
        {newsItems.map((item, index) => (
          <View key={item.id} style={styles.page}>
            <TouchableOpacity
              style={styles.slide}
              onPress={() => handleNewsPress(index)}
            >
              <Image source={{ uri: item.imageUrl }} style={styles.image} />
            </TouchableOpacity>
          </View>
        ))}
      </PagerView>

      {/* Pagination dots */}
      <View style={styles.paginationContainer}>
        {newsItems.map((_, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.paginationDot,
              index === currentIndex && styles.paginationDotActive
            ]}
            onPress={() => handleDotPress(index)}
          />
        ))}
      </View>

      {/* Image Viewer Modal */}
      <ImageView
        images={newsItems.map(item => ({ uri: item.imageUrl }))}
        imageIndex={imageViewerIndex}
        visible={imageViewerVisible}
        onRequestClose={() => setImageViewerVisible(false)}
      />
    </View>
    </Section>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.md,
  },
  pager: {
    height: 180,
    marginHorizontal: Spacing.lg,
  },
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide: {
    width: '100%',
    height: '100%',
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    position: 'relative',
    ...Shadows.medium,
  },
  image: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Spacing.md,
    gap: Spacing.xs,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.light.border,
  },
  paginationDotActive: {
    backgroundColor: Colors.light.primary,
    width: 12,
    height: 8,
    borderRadius: 4,
  },
});