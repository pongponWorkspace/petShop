import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { IconSymbol } from '@/src/shared/components/ui/icon-symbol';
import { Colors } from '@/src/shared/constants/theme';
import { Coupon, CouponStatus } from '@/src/data/mock';
import { useMyCouponsController } from './my-coupons-controller';
import { myCouponsStyles as styles } from './my-coupons-style';

export default function MyCouponsScreen() {
  const controller = useMyCouponsController();
  const { state, actions, helpers, translations } = controller;
  const { t } = translations;

  const renderCouponItem = ({ item: coupon }: { item: Coupon }) => {
    const isUsable = coupon.status === 'available';
    const statusStyle = helpers.getCouponStatusStyle(coupon.status, Colors);

    return (
      <TouchableOpacity
        style={[styles.couponCard, !isUsable && styles.usedCouponCard]}
        onPress={() => actions.handleCouponPress(coupon)}
      >
        <View style={styles.couponContent}>
          <View style={styles.couponHeader}>
            <View style={styles.couponImageContainer}>
              <View style={styles.couponImagePlaceholder}>
                <IconSymbol
                  name={coupon.icon as any}
                  size={24}
                  color={helpers.getIconColor(coupon.color)}
                />
              </View>
            </View>

            <View style={styles.couponInfo}>
              <Text style={styles.couponTitle} numberOfLines={2}>
                {coupon.title}
              </Text>
              <Text style={styles.couponDescription} numberOfLines={2}>
                {coupon.description}
              </Text>

              <View style={styles.couponMeta}>
                <Text style={styles.expiryText}>
                  {t('expiresOn')}: {coupon.expiryDate}
                </Text>
              </View>
            </View>

            <View style={styles.statusContainer}>
              <View style={[
                styles.statusBadge,
                { backgroundColor: statusStyle.backgroundColor }
              ]}>
                <Text style={[
                  styles.statusText,
                  { color: statusStyle.color }
                ]}>
                  {helpers.getStatusText(coupon.status)}
                </Text>
              </View>

              {isUsable && (
                <TouchableOpacity
                  style={styles.useButton}
                  onPress={() => actions.handleUseCoupon(coupon.id)}
                >
                  <Text style={styles.useButtonText}>{t('use')}</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" backgroundColor={Colors.light.surface} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={actions.handleBack}>
          <IconSymbol name="chevron.left" size={24} color={Colors.light.text} />
          <Text style={styles.backText}>{t('back')}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('myCoupons')}</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Tab Selector */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, state.activeTab === 'usable' && styles.activeTab]}
          onPress={() => actions.setActiveTab('usable')}
        >
          <Text style={[styles.tabText, state.activeTab === 'usable' && styles.activeTabText]}>
            {t('usableCoupons')} ({state.usableCoupons.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, state.activeTab === 'used' && styles.activeTab]}
          onPress={() => actions.setActiveTab('used')}
        >
          <Text style={[styles.tabText, state.activeTab === 'used' && styles.activeTabText]}>
            {t('usedExpiredCoupons')} ({state.usedCoupons.length})
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      {state.loading && state.coupons.length === 0 ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.light.primary} />
          <Text style={styles.loadingText}>{t('loadingCoupons')}</Text>
        </View>
      ) : (
        <FlatList
          data={state.currentCoupons}
          keyExtractor={(item) => item.id}
          renderItem={renderCouponItem}
          contentContainerStyle={styles.listContainer}
          refreshControl={
            <RefreshControl
              refreshing={state.refreshing}
              onRefresh={actions.handleRefresh}
              tintColor={Colors.light.primary}
            />
          }
          ListEmptyComponent={() => (
            <View style={styles.emptyContainer}>
              <IconSymbol name="ticket" size={64} color={Colors.light.textTertiary} />
              <Text style={styles.emptyTitle}>
                {state.activeTab === 'usable' ? t('noUsableCoupons') : t('noUsedCoupons')}
              </Text>
              <Text style={styles.emptyText}>
                {state.activeTab === 'usable'
                  ? t('noUsableCouponsDescription')
                  : t('noUsedCouponsDescription')
                }
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
}