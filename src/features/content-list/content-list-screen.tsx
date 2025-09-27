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

import { getCouponStatusStyle, getServiceStatusStyle, getStatusText } from '@/src/data/mock';
import { Coupon, NewsItem, UserService } from '@/src/data/types/common';
import { EducationalContent } from '../article-detail';
import { useContentListController } from './content-list-controller';
import { contentListStyles as styles } from './content-list-style';

export default function ContentListScreen() {
  const { t } = useLanguage();
  const controller = useContentListController();
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
          <Text style={styles.headerTitle}>{helpers.getContentTitle()}</Text>
          <View style={styles.placeholder} />
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.light.primary} />
          <Text style={styles.loadingText}>{t('loading')}</Text>
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
          <Text style={styles.headerTitle}>{helpers.getContentTitle()}</Text>
          <View style={styles.placeholder} />
        </View>
        <View style={styles.errorContainer}>
          <IconSymbol name="exclamationmark.triangle" size={48} color={Colors.light.error} />
          <Text style={styles.errorTitle}>{t('error')}</Text>
          <Text style={styles.errorText}>{state.error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={actions.loadContent}>
            <Text style={styles.retryButtonText}>{t('retry')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const filteredItems = helpers.getFilteredItems();

  const renderArticleCard = (item: EducationalContent) => (
    <TouchableOpacity
      key={item.id}
      style={styles.articleCard}
      onPress={() => actions.handleItemPress(item)}
    >
      <Image source={{ uri: item.imageUrl }} style={styles.articleImage} />
      <View style={styles.articleContent}>
        <Text style={styles.articleTitle}>{item.title}</Text>
        <View style={styles.articleMeta}>
          <View style={styles.categoryTag}>
            <Text style={styles.categoryTagText}>
              {helpers.getFilterLabel(item.category)}
            </Text>
          </View>
        </View>
        <Text style={styles.articleDescription} numberOfLines={3}>
          {item.description}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderNewsCard = (item: NewsItem) => (
    <TouchableOpacity
      key={item.id}
      style={styles.newsCard}
      onPress={() => actions.handleItemPress(item)}
    >
      <Image source={{ uri: item.imageUrl }} style={styles.newsImage} />
      <View style={styles.newsType}>
        <Text style={styles.newsTypeText}>{item.type}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderCouponCard = (item: Coupon) => {
    const statusStyle = getCouponStatusStyle(item.status, Colors) || {
      backgroundColor: Colors.light.textSecondary + '20',
      color: Colors.light.textSecondary
    };

    return (
      <TouchableOpacity
        key={item.id}
        style={[styles.couponCard, { borderLeftColor: statusStyle.color }]}
        onPress={() => actions.handleItemPress(item)}
      >
        <View style={styles.couponHeader}>
          <IconSymbol
            name={item.icon as any}
            size={24}
            color={statusStyle.color}
            style={styles.couponIcon}
          />
          <View style={styles.couponTitleContainer}>
            <Text style={styles.couponTitle}>{item.title}</Text>
            <Text style={styles.couponExpiry}>{t('expiresOn')} {item.expiryDate}</Text>
          </View>
        </View>
        <Text style={styles.couponDescription} numberOfLines={2}>
          {item.description}
        </Text>
        <View style={[styles.couponStatus, { backgroundColor: statusStyle.backgroundColor }]}>
          <Text style={[styles.couponStatusText, { color: statusStyle.color }]}>
            {getStatusText(item.status, t)}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderServiceCard = (item: UserService) => {
    const statusStyle = getServiceStatusStyle(item.status, Colors) || {
      backgroundColor: Colors.light.textSecondary + '20',
      color: Colors.light.textSecondary
    };

    return (
      <TouchableOpacity
        key={item.id}
        style={styles.serviceCard}
        onPress={() => actions.handleItemPress(item)}
      >
        <View style={styles.serviceHeader}>
          <Text style={styles.serviceTitle}>{item.serviceName}</Text>
          <Text style={styles.serviceDate}>{item.purchaseDate}</Text>
        </View>
        <Text style={styles.serviceDescription} numberOfLines={2}>
          {item.description}
        </Text>
        <View style={styles.serviceFooter}>
          <View style={[styles.couponStatus, { backgroundColor: statusStyle.backgroundColor }]}>
            <Text style={[styles.couponStatusText, { color: statusStyle.color }]}>
              {getStatusText(item.status, t)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderContent = () => {
    if (filteredItems.length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <IconSymbol name="doc.text" size={48} color={Colors.light.textTertiary} />
          <Text style={styles.emptyTitle}>{t('noContentFound')}</Text>
          <Text style={styles.emptyText}>{helpers.getEmptyMessage()}</Text>
        </View>
      );
    }

    // Use 2-column layout for news, single column for others
    if (state.contentType === 'news') {
      const pairs = [];
      for (let i = 0; i < filteredItems.length; i += 2) {
        pairs.push(filteredItems.slice(i, i + 2));
      }
      return pairs.map((pair, index) => (
        <View key={index} style={styles.newsRow}>
          {pair.map((item) => renderNewsCard(item as NewsItem))}
        </View>
      ));
    }

    return filteredItems?.map((item) => {
      switch (state.contentType) {
        case 'articles':
          return renderArticleCard(item as EducationalContent);
        case 'coupons':
          return renderCouponCard(item as Coupon);
        case 'services':
          return renderServiceCard(item as UserService);
        default:
          return renderArticleCard(item as EducationalContent);
      }
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={actions.goBack}>
          <IconSymbol name="chevron.left" size={24} color={Colors.light.text} />
          <Text style={styles.backText}>{t('back')}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{helpers.getContentTitle()}</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Filter Tabs - Hidden for news */}
      {state.contentType !== 'news' && (
        <View style={styles.filterSection}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterScrollContent}
          >
            {helpers.getAvailableFilters().map((filter) => (
              <TouchableOpacity
                key={filter}
                style={[
                  styles.filterButton,
                  state.selectedFilter === filter && styles.filterButtonActive
                ]}
                onPress={() => actions.setSelectedFilter(filter)}
              >
                <Text style={[
                  styles.filterButtonText,
                  state.selectedFilter === filter && styles.filterButtonTextActive
                ]}>
                  {helpers.getFilterLabel(filter)}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Content List */}
        <View style={styles.contentContainer}>
          {renderContent()}
        </View>
      </ScrollView>
    </View>
  );
}