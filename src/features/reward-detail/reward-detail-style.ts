import { BorderRadius, Colors, Shadows, Spacing, Typography } from '@/src/shared/constants/theme';
import { Platform, StyleSheet } from 'react-native';
;

export const rewardDetailStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  header: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    paddingTop: Platform.OS === 'ios' ? 50 : Spacing.md,
    backgroundColor: Colors.light.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  backButton: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    flex: 1,
  },
  backText: {
    ...Typography.body,
    color: Colors.light.text,
    marginLeft: Spacing.xs,
    fontWeight: '500' as const,
  },
  headerTitle: {
    ...Typography.h4,
    color: Colors.light.text,
    fontWeight: '600' as const,
    flex: 2,
    textAlign: 'center' as const,
  },
  placeholder: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: Spacing.xxxl,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
  },
  loadingText: {
    ...Typography.body,
    color: Colors.light.textSecondary,
    marginTop: Spacing.md,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
  },
  errorTitle: {
    ...Typography.h4,
    color: Colors.light.error,
    marginBottom: Spacing.sm,
  },
  errorText: {
    ...Typography.body,
    color: Colors.light.textSecondary,
  },
  imageContainer: {
    position: 'relative' as const,
  },
  rewardImage: {
    width: '100%',
    height: 250,
    resizeMode: 'cover' as const,
  },
  imageOverlay: {
    position: 'absolute' as const,
    top: Spacing.lg,
    right: Spacing.lg,
    left: Spacing.lg,
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
  },
  categoryBadge: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.md,
    gap: Spacing.xs,
  },
  categoryText: {
    ...Typography.bodySmall,
    fontWeight: '600' as const,
  },
  unavailableBadge: {
    backgroundColor: Colors.light.error + '20',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.md,
  },
  unavailableText: {
    ...Typography.bodySmall,
    color: Colors.light.error,
    fontWeight: '600' as const,
  },
  rewardInfo: {
    padding: Spacing.lg,
  },
  rewardHeader: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'flex-start' as const,
    marginBottom: Spacing.lg,
  },
  rewardTitleContainer: {
    flex: 1,
    marginRight: Spacing.lg,
  },
  rewardTitle: {
    ...Typography.h3,
    color: Colors.light.text,
    fontWeight: '600' as const,
    marginBottom: 4,
  },
  rewardSubtitle: {
    ...Typography.body,
    color: Colors.light.textSecondary,
  },
  pointsContainer: {
    alignItems: 'center' as const,
  },
  pointsValue: {
    ...Typography.h3,
    color: Colors.light.text,
    fontWeight: '700' as const,
    marginTop: 2,
  },
  pointsLabel: {
    ...Typography.caption,
    color: Colors.light.textTertiary,
  },
  descriptionSection: {
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    ...Typography.h4,
    color: Colors.light.text,
    fontWeight: '600' as const,
    marginBottom: Spacing.md,
  },
  fullDescription: {
    ...Typography.body,
    color: Colors.light.text,
    lineHeight: Typography.body.lineHeight * 1.4,
  },
  detailsCard: {
    backgroundColor: Colors.light.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
    ...Shadows.small,
  },
  detailRow: {
    flexDirection: 'row' as const,
    justifyContent: 'space-around' as const,
  },
  detailInfo: {
    alignItems: 'center' as const,
    flex: 1,
  },
  detailLabel: {
    ...Typography.caption,
    color: Colors.light.textTertiary,
    marginTop: Spacing.xs,
    marginBottom: 2,
  },
  detailValue: {
    ...Typography.bodySmall,
    color: Colors.light.text,
    fontWeight: '600' as const,
  },
  termsSection: {
    marginBottom: Spacing.lg,
  },
  termItem: {
    marginBottom: Spacing.xs,
  },
  termText: {
    ...Typography.bodySmall,
    color: Colors.light.textSecondary,
    lineHeight: 20,
  },
  howToUseSection: {
    marginBottom: Spacing.lg,
  },
  stepItem: {
    flexDirection: 'row' as const,
    alignItems: 'flex-start' as const,
    marginBottom: Spacing.md,
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.light.primary,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    marginRight: Spacing.md,
  },
  stepNumberText: {
    ...Typography.caption,
    color: Colors.light.surface,
    fontWeight: '600' as const,
  },
  stepText: {
    ...Typography.body,
    color: Colors.light.text,
    flex: 1,
  },
  actionsContainer: {
    paddingHorizontal: Spacing.lg,
    gap: Spacing.md,
  },
  primaryButton: {
    marginBottom: Spacing.sm,
  },
  secondaryButton: {
    backgroundColor: Colors.light.surface,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  secondaryButtonText: {
    color: Colors.light.text,
  },
  unavailableContainer: {
    alignItems: 'center' as const,
    paddingVertical: Spacing.lg,
  },
  unavailableMessage: {
    ...Typography.body,
    color: Colors.light.textSecondary,
    textAlign: 'center' as const,
    fontStyle: 'italic' as const,
  },
  insufficientPointsContainer: {
    alignItems: 'center' as const,
    paddingVertical: Spacing.lg,
  },
  insufficientPointsText: {
    ...Typography.body,
    color: Colors.light.textSecondary,
    marginBottom: Spacing.lg,
    textAlign: 'center' as const,
  },
});