import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { useLanguage } from '@/src/contexts/LanguageContext';
import { IconSymbol } from '@/src/shared/components/ui/icon-symbol';
import { Colors } from '@/src/shared/constants/theme';

import { useArticlesController } from './articles-controller';
import { articlesStyles as styles } from './articles-style';

export default function ArticlesScreen() {
  const { t } = useLanguage();
  const controller = useArticlesController();
  const { state, actions, helpers } = controller;

  // Loading state
  if (state.loading) {
    return (
      <View style={styles.container}>
        <StatusBar style="dark" />
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={actions.goBack}>
            <IconSymbol name="chevron.left" size={24} color={Colors.light.text} />
            <Text style={styles.backText}>{t('back')}</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{t('articles')}</Text>
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
  if (state.error) {
    return (
      <View style={styles.container}>
        <StatusBar style="dark" />
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={actions.goBack}>
            <IconSymbol name="chevron.left" size={24} color={Colors.light.text} />
            <Text style={styles.backText}>{t('back')}</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{t('articles')}</Text>
          <View style={styles.placeholder} />
        </View>
        <View style={styles.errorContainer}>
          <IconSymbol name="exclamationmark.triangle" size={48} color={Colors.light.error} />
          <Text style={styles.errorTitle}>{t('error')}</Text>
          <Text style={styles.errorText}>{state.error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={actions.loadArticles}>
            <Text style={styles.retryButtonText}>{t('retry')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const filteredArticles = helpers.getFilteredArticles();

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={actions.goBack}>
          <IconSymbol name="chevron.left" size={24} color={Colors.light.text} />
          <Text style={styles.backText}>{t('back')}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('articles')}</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Category Tabs */}
      <View style={styles.categorySection}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryScrollContent}
        >
          {helpers.getAvailableCategories().map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                state.selectedCategory === category && styles.categoryButtonActive
              ]}
              onPress={() => actions.setSelectedCategory(category)}
            >
              <Text style={[
                styles.categoryButtonText,
                state.selectedCategory === category && styles.categoryButtonTextActive
              ]}>
                {helpers.getCategoryLabel(category)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Articles List */}
        <View style={styles.articlesContainer}>
          {filteredArticles.length === 0 ? (
            <View style={styles.emptyContainer}>
              <IconSymbol name="doc.text" size={48} color={Colors.light.textTertiary} />
              <Text style={styles.emptyTitle}>{t('noArticlesFound')}</Text>
              <Text style={styles.emptyText}>
                {t('noArticlesInThisCategory')}
              </Text>
            </View>
          ) : (
            filteredArticles.map((article) => (
              <TouchableOpacity
                key={article.id}
                style={styles.articleCard}
                onPress={() => actions.handleArticlePress(article)}
              >
                <Image source={{ uri: article.imageUrl }} style={styles.articleImage} />
                <View style={styles.articleContent}>
                  <View style={styles.articleHeader}>
                    <Text style={styles.articleTitle}>{article.title}</Text>
                    <View style={styles.articleMeta}>
                      <View style={styles.categoryTag}>
                        <Text style={styles.categoryTagText}>
                          {helpers.getCategoryLabel(article.category)}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <Text style={styles.articleDescription} numberOfLines={3}>
                    {article.description}
                  </Text>
                  <View style={styles.authorInfo}>
                    <Text style={styles.authorText}>
                      {t('by')} {article.author}
                    </Text>
                    <View style={styles.readMoreButton}>
                      <Text style={styles.readMoreText}>{t('readMore')}</Text>
                      <IconSymbol name="chevron.right" size={16} color={Colors.light.primary} />
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
}