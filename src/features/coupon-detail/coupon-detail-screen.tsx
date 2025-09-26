import { useLanguage } from '@/src/contexts/LanguageContext';
import { IconSymbol } from '@/src/shared/components/ui/icon-symbol';
import { Colors } from '@/src/shared/constants/theme';
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
import { useCouponDetailController } from './coupon-detail-controller';
import { couponDetailStyles as styles } from './coupon-detail-style';

export default function CouponDetailScreen() {
  const { t } = useLanguage();
  const controller = useCouponDetailController();
  const { state, actions, helpers } = controller;

  // Loading state
  if (state.loading && !state.coupon) {
    return (
      <View style={styles.container}>
        <StatusBar style="dark" backgroundColor={Colors.light.surface} />

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={actions.goBack}>
            <IconSymbol name="chevron.left" size={24} color={Colors.light.text} />
            <Text style={styles.backText}>{t('back')}</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{t('couponDetail')}</Text>
          <View style={styles.placeholder} />
        </View>

        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.light.primary} />
          <Text style={styles.loadingText}>{t('loadingCouponDetail')}</Text>
        </View>
      </View>
    );
  }

  // Error state
  if (state.error || !state.coupon) {
    return (
      <View style={styles.container}>
        <StatusBar style="dark" backgroundColor={Colors.light.surface} />

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={actions.goBack}>
            <IconSymbol name="chevron.left" size={24} color={Colors.light.text} />
            <Text style={styles.backText}>{t('back')}</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{t('couponDetail')}</Text>
          <View style={styles.placeholder} />
        </View>

        <View style={styles.errorContainer}>
          <IconSymbol name="exclamationmark.triangle" size={48} color={Colors.light.error} />
          <Text style={styles.errorTitle}>{t('error')}</Text>
          <Text style={styles.errorText}>
            {state.error || t('couponNotFound')}
          </Text>
          <TouchableOpacity style={styles.retryButton} onPress={actions.loadCouponDetail}>
            <Text style={styles.retryButtonText}>{t('retry')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const { coupon } = state;
  const isUsable = helpers.isUsable();
  const isExpired = helpers.isExpired();

  return (
    <View style={styles.container}>
      <StatusBar style="dark" backgroundColor={Colors.light.surface} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={actions.goBack}>
          <IconSymbol name="chevron.left" size={24} color={Colors.light.text} />
          <Text style={styles.backText}>{t('back')}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('couponDetail')}</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Content */}
      <ScrollView
        style={styles.scrollContainer}
        refreshControl={
          <RefreshControl
            refreshing={state.loading}
            onRefresh={actions.refresh}
            tintColor={Colors.light.primary}
          />
        }
      >
        <View style={styles.contentContainer}>
          {/* Coupon Card */}
          <View style={styles.couponCard}>
            {/* Header with Category and Status */}
            <View style={styles.couponHeader}>
              <View style={styles.categoryContainer}>
                <View style={styles.categoryBadge}>
                  <IconSymbol
                    name={helpers.getCategoryIcon(coupon.color) as any}
                    size={16}
                    color={helpers.getCategoryColor(coupon.color)}
                  />
                </View>
              </View>
              <View style={[
                styles.statusBadge,
                { backgroundColor: helpers.getCouponStatusStyle(coupon.status).backgroundColor }
              ]}>
                <Text style={[
                  styles.statusText,
                  { color: helpers.getCouponStatusStyle(coupon.status).color }
                ]}>
                  {helpers.getStatusText(coupon.status)}
                </Text>
              </View>
            </View>

            {/* Coupon Image */}
            <View style={styles.imageContainer}>
              {coupon.imageUrl ? (
                <Image source={{ uri: coupon.imageUrl }} style={styles.couponImage} />
              ) : (
                <View style={styles.imagePlaceholder}>
                  <IconSymbol name="photo" size={48} color={Colors.light.textTertiary} />
                  <Text style={styles.imagePlaceholderText}>{t('noImage')}</Text>
                </View>
              )}
            </View>

            {/* Coupon Content */}
            <View style={styles.couponContent}>
              <Text style={styles.couponTitle}>{coupon.title}</Text>
              <Text style={styles.couponDescription}>{coupon.description}</Text>

              {/* Discount Information */}
              {coupon.discountValue && (
                <View style={styles.discountContainer}>
                  <View style={styles.discountRow}>
                    <IconSymbol name="star.fill" size={16} color={Colors.light.warning} />
                    <Text style={styles.discountLabel}>{t('discount')}</Text>
                  </View>
                  <Text style={styles.discountValue}>
                    {coupon.discountType === 'PERCENTAGE'
                      ? `${coupon.discountValue}%`
                      : `฿${coupon.discountValue}`
                    }
                  </Text>
                  <Text style={styles.discountSubtext}>
                    {coupon.discountType === 'PERCENTAGE'
                      ? t('percentageDiscount')
                      : t('fixedDiscount')
                    }
                  </Text>
                </View>
              )}

              {/* Dates Information */}
              <View style={styles.datesContainer}>
                <View style={styles.dateRow}>
                  <IconSymbol name="calendar" size={14} color={Colors.light.textSecondary} />
                  <Text style={styles.dateLabel}>{t('purchasedOn')}:</Text>
                  <Text style={styles.dateValue}>
                    {helpers.formatDate(coupon.purchaseDate || '')}
                  </Text>
                </View>
                <View style={styles.dateRow}>
                  <IconSymbol name="clock" size={14} color={Colors.light.textSecondary} />
                  <Text style={styles.dateLabel}>{t('expiresOn')}:</Text>
                  <Text style={[
                    styles.dateValue,
                    isExpired && styles.expiryWarning
                  ]}>
                    {helpers.formatDate(coupon.expiryDate)}
                  </Text>
                </View>
              </View>

              {/* Terms and Conditions */}
              {coupon.terms && (
                <View style={styles.termsContainer}>
                  <Text style={styles.termsTitle}>{t('termsAndConditions')}</Text>
                  <Text style={styles.termsText}>{coupon.terms}</Text>
                </View>
              )}

              {/* Action Button or Status */}
              {isUsable ? (
                <View style={styles.actionButtonContainer}>
                  <TouchableOpacity
                    style={[
                      styles.useCouponButton,
                      state.usingCoupon && styles.useCouponButtonDisabled
                    ]}
                    onPress={actions.useCoupon}
                    disabled={state.usingCoupon}
                  >
                    {state.usingCoupon ? (
                      <View style={styles.buttonLoadingContainer}>
                        <ActivityIndicator size="small" color={Colors.light.textLight} />
                        <Text style={styles.buttonLoadingText}>{t('usingCoupon')}</Text>
                      </View>
                    ) : (
                      <Text style={styles.useCouponButtonText}>{t('useCoupon')}</Text>
                    )}
                  </TouchableOpacity>
                </View>
              ) : coupon.status.toUpperCase() === 'USED' ? (
                <View style={styles.usedContainer}>
                  <IconSymbol
                    name="checkmark.circle.fill"
                    size={32}
                    color={Colors.light.textSecondary}
                    style={styles.stateIcon}
                  />
                  <Text style={[styles.stateTitle, styles.usedText]}>
                    {t('couponUsed')}
                  </Text>
                  <Text style={[styles.stateDescription, styles.usedText]}>
                    {t('couponUsedDescription')}
                  </Text>
                </View>
              ) : (
                <View style={styles.expiredContainer}>
                  <IconSymbol
                    name="clock.badge.xmark"
                    size={32}
                    color={Colors.light.error}
                    style={styles.stateIcon}
                  />
                  <Text style={[styles.stateTitle, styles.expiredText]}>
                    {t('couponExpired')}
                  </Text>
                  <Text style={[styles.stateDescription, styles.expiredText]}>
                    {t('couponExpiredDescription')}
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}