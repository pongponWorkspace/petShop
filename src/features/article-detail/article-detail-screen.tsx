import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  ActivityIndicator,
  Image,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { useLanguage } from '@/src/contexts/LanguageContext';
import { IconSymbol } from '@/src/shared/components/ui/icon-symbol';
import { Colors } from '@/src/shared/constants/theme';

import { useArticleDetailController } from './article-detail-controller';
import { articleDetailStyles as styles } from './article-detail-style';

export default function ArticleDetailScreen() {
  const { t } = useLanguage();
  const controller = useArticleDetailController();
  const { state, actions, helpers } = controller;

  // Loading state
  if (state.loading && !state.article) {
    return (
      <View style={styles.container}>
        <StatusBar style="dark" backgroundColor={Colors.light.surface} />

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={actions.goBack}>
            <IconSymbol name="chevron.left" size={24} color={Colors.light.text} />
            <Text style={styles.backText}>{t('back')}</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{''}</Text>
          <View style={styles.placeholder} />
        </View>

        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.light.primary} />
          <Text style={styles.loadingText}>{t('loadingArticles')}</Text>
        </View>
      </View>
    );
  }

  // Error state
  if (state.error || !state.article) {
    return (
      <View style={styles.container}>
        <StatusBar style="dark" backgroundColor={Colors.light.surface} />

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={actions.goBack}>
            <IconSymbol name="chevron.left" size={24} color={Colors.light.text} />
            <Text style={styles.backText}>{t('back')}</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{''}</Text>
          <View style={styles.placeholder} />
        </View>

        <View style={styles.errorContainer}>
          <IconSymbol name="exclamationmark.triangle" size={48} color={Colors.light.error} />
          <Text style={styles.errorTitle}>{t('error')}</Text>
          <Text style={styles.errorText}>
            {state.error || t('articleNotFound')}
          </Text>
          <TouchableOpacity style={styles.retryButton} onPress={actions.loadArticle}>
            <Text style={styles.retryButtonText}>{t('retry')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const { article } = state;

  return (
    <View style={styles.container}>
      <StatusBar style="dark" backgroundColor={Colors.light.surface} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={actions.goBack}>
          <IconSymbol name="chevron.left" size={24} color={Colors.light.text} />
          <Text style={styles.backText}>{t('back')}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{article.title}</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={state.loading}
            onRefresh={actions.refresh}
            tintColor={Colors.light.primary}
          />
        }
      >
        {/* Article Image */}
        <View style={styles.imageContainer}>
          {article.imageUrl ? (
            <Image source={{ uri: article.imageUrl }} style={styles.articleImage} />
          ) : (
            <View style={styles.imagePlaceholder}>
              <IconSymbol name="photo" size={48} color={Colors.light.textTertiary} />
              <Text style={styles.imagePlaceholderText}>{t('noImage')}</Text>
            </View>
          )}
        </View>

        {/* Article Header */}
        <View style={styles.articleHeader}>
          {/* Category Badge */}
          <View style={styles.categoryContainer}>
            <View style={[
              styles.categoryBadge,
              { backgroundColor: helpers.getCategoryColor(article.category) + '20' }
            ]}>
              <IconSymbol
                name={helpers.getCategoryIcon(article.category) as any}
                size={16}
                color={helpers.getCategoryColor(article.category)}
                style={styles.categoryIcon}
              />
              <Text style={[
                styles.categoryText,
                { color: helpers.getCategoryColor(article.category) }
              ]}>
                {helpers.getCategoryLabel(article.category)}
              </Text>
            </View>
          </View>

          {/* Title and Description */}
          <Text style={styles.articleTitle}>{article.title}</Text>
          <Text style={styles.articleDescription}>{article.description}</Text>
        </View>

        {/* Article Content */}
        {article.fullContent && (
          <View style={styles.articleContent}>
            <Text style={styles.contentText}>{article.fullContent}</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}