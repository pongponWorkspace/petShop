import { useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import { Button } from '@/src/shared/components';
import { IconSymbol } from '@/src/shared/components/ui/icon-symbol';
import { Colors } from '@/src/shared/constants/theme';
import { useRewardDetailController } from './reward-detail-controller';
import { rewardDetailStyles } from './reward-detail-style';

export default function RewardDetailScreen() {
  const styles = rewardDetailStyles;
  const { id } = useLocalSearchParams<{ id: string }>();
  const { 
    loading,
    reward,
    getCategoryIcon,
    getCategoryColor,
    getCategoryLabel,
    canRedeem,
    handleRedeem,
    userPoints,
    t,
    router,
  } = useRewardDetailController(id);

  if (loading) {
    return (
      <View style={styles.container}>
        <StatusBar style="dark" />
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <IconSymbol name="chevron.left" size={24} color={Colors.light.text} />
            <Text style={styles.backText}>{t('back')}</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{t('rewardDetail')}</Text>
          <View style={styles.placeholder} />
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.light.primary} />
          <Text style={styles.loadingText}>{t('loadingRewardDetails')}</Text>
        </View>
      </View>
    );
  }

  if (!reward) {
    return (
      <View style={styles.container}>
        <StatusBar style="dark" />
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <IconSymbol name="chevron.left" size={24} color={Colors.light.text} />
            <Text style={styles.backText}>{t('back')}</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{t('rewardDetail')}</Text>
          <View style={styles.placeholder} />
        </View>
        <View style={styles.errorContainer}>
          <IconSymbol name="exclamationmark.triangle" size={48} color={Colors.light.error} />
          <Text style={styles.errorTitle}>{t('error')}</Text>
          <Text style={styles.errorText}>{t('rewardNotFound')}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <IconSymbol name="chevron.left" size={24} color={Colors.light.text} />
          <Text style={styles.backText}>{t('back')}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('rewardDetail')}</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Reward Image */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: reward.imageUrl }} style={styles.rewardImage} />
          <View style={styles.imageOverlay}>
            <View style={[
              styles.categoryBadge,
              { backgroundColor: getCategoryColor(reward.category) + '20' }
            ]}>
              <IconSymbol
                name={getCategoryIcon(reward.category)}
                size={16}
                color={getCategoryColor(reward.category)}
              />
              <Text style={[
                styles.categoryText,
                { color: getCategoryColor(reward.category) }
              ]}>
                {getCategoryLabel(reward.category)}
              </Text>
            </View>
            {!reward.available && (
              <View style={styles.unavailableBadge}>
                <Text style={styles.unavailableText}>{t('temporarilyUnavailable')}</Text>
              </View>
            )}
          </View>
        </View>

        {/* Reward Info */}
        <View style={styles.rewardInfo}>
          <View style={styles.rewardHeader}>
            <View style={styles.rewardTitleContainer}>
              <Text style={styles.rewardTitle}>{reward.title}</Text>
              <Text style={styles.rewardSubtitle}>{reward.description}</Text>
            </View>
            <View style={styles.pointsContainer}>
              <IconSymbol name="star.fill" size={20} color={Colors.light.warning} />
              <Text style={styles.pointsValue}>{reward.points}</Text>
              <Text style={styles.pointsLabel}>{t('points')}</Text>
            </View>
          </View>

          {/* Full Description */}
          <View style={styles.descriptionSection}>
            <Text style={styles.sectionTitle}>{t('aboutThisReward')}</Text>
            <Text style={styles.fullDescription}>{reward.fullDescription}</Text>
          </View>

          {/* Reward Details */}
          <View style={styles.detailsCard}>
            <View style={styles.detailRow}>
              <View style={styles.detailInfo}>
                <IconSymbol name="clock" size={16} color={Colors.light.textSecondary} />
                <Text style={styles.detailLabel}>{t('validity')}</Text>
                <Text style={styles.detailValue}>{t('daysFromRedemption', { days: reward.validityDays })}</Text>
              </View>
              <View style={styles.detailInfo}>
                <IconSymbol name="star.fill" size={16} color={Colors.light.textSecondary} />
                <Text style={styles.detailLabel}>{t('yourPoints')}</Text>
                <Text style={styles.detailValue}>{userPoints}</Text>
              </View>
            </View>
          </View>

          {/* Terms & Conditions */}
          <View style={styles.termsSection}>
            <Text style={styles.sectionTitle}>{t('termsConditions')}</Text>
            {reward.terms.map((term, index) => (
              <View key={index} style={styles.termItem}>
                <Text style={styles.termText}>• {term}</Text>
              </View>
            ))}
          </View>

          {/* How to Use */}
          <View style={styles.howToUseSection}>
            <Text style={styles.sectionTitle}>{t('howToUse')}</Text>
            <View style={styles.stepItem}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>1</Text>
              </View>
              <Text style={styles.stepText}>{t('redeemWithPoints')}</Text>
            </View>
            <View style={styles.stepItem}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>2</Text>
              </View>
              <Text style={styles.stepText}>{t('receiveConfirmationEmail')}</Text>
            </View>
            <View style={styles.stepItem}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>3</Text>
              </View>
              <Text style={styles.stepText}>
                {reward.category === 'service' ? t('bookYourAppointment') : t('visitStoreToRedeem')}
              </Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          {canRedeem(reward.points) && reward.available ? (
            <Button
              title={t('redeemNow', { points: reward.points })}
              onPress={handleRedeem}
              style={styles.primaryButton}
            />
          ) : !reward.available ? (
            <View style={styles.unavailableContainer}>
              <Text style={styles.unavailableMessage}>{t('rewardTemporarilyUnavailable')}</Text>
            </View>
          ) : (
            <View style={styles.insufficientPointsContainer}>
              <Text style={styles.insufficientPointsText}>
                {t('needMorePoints', { needed: reward.points - userPoints })}
              </Text>
              <Button
                title={t('earnMorePoints')}
                onPress={() => router.push('/(tabs)/home' as any)}
                style={styles.secondaryButton}
                textStyle={styles.secondaryButtonText}
              />
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
