import { EducationalContent, mockEducationalContent } from '@/src/data/mock';
import { BorderRadius, Colors, Shadows, Spacing, Typography } from '@/src/shared/constants/theme';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Section from './Section';
;

interface EducationalContentProps {
  content?: EducationalContent[];
}

export default function EducationalContentSection({
  content = mockEducationalContent
}: EducationalContentProps) {
  const router = useRouter();

  const handleContentPress = (item: EducationalContent) => {
    router.push({
      pathname: '/article-detail' as any,
      params: { id: item.id }
    } as any);
  };

  return (
    <Section>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        {content.map(item => (
          <TouchableOpacity
            key={item.id}
            style={styles.card}
            onPress={() => handleContentPress(item)}
          >
            <Image source={{ uri: item.imageUrl }} style={styles.image} />
            <View style={styles.content}>
              <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
              <Text style={styles.description} numberOfLines={3}>{item.description}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </Section>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: Spacing.lg,
    paddingRight: Spacing.lg,
  },
  card: {
    width: 280,
    marginRight: Spacing.md,
    backgroundColor: Colors.light.surface,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    ...Shadows.medium,
  },
  image: {
    width: '100%',
    height: 140,
    resizeMode: 'cover',
  },
  content: {
    padding: Spacing.lg,
  },
  title: {
    ...Typography.h5,
    color: Colors.light.text,
    fontWeight: '600',
    marginBottom: Spacing.sm,
    lineHeight: Typography.h5.lineHeight * 1.2,
  },
  description: {
    ...Typography.bodySmall,
    color: Colors.light.textSecondary,
    lineHeight: Typography.bodySmall.lineHeight * 1.3,
  },
});