import { BorderRadius, Colors, Spacing, Typography } from '@/src/shared/constants/theme';
import { Platform, StyleSheet } from 'react-native';


export const couponDetailStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    paddingTop: Platform.OS === 'ios' ? 50 : Spacing.md,
    backgroundColor: Colors.light.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  backText: {
    ...Typography.body,
    color: Colors.light.text,
    marginLeft: Spacing.xs,
    fontWeight: '500',
  },
  headerTitle: {
    ...Typography.h4,
    color: Colors.light.text,
    fontWeight: '600',
    flex: 2,
    textAlign: 'center',
  },
  placeholder: {
    flex: 1,
  },

  // Content
  scrollContainer: {
    flex: 1,
  },
  contentContainer: {
    padding: Spacing.lg,
    paddingBottom: Spacing.xxxl,
  },

  // Loading
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.xxl,
  },
  loadingText: {
    ...Typography.body,
    color: Colors.light.textSecondary,
    marginTop: Spacing.md,
    textAlign: 'center',
  },

  // Error
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.xxl,
  },
  errorTitle: {
    ...Typography.h4,
    color: Colors.light.error,
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },
  errorText: {
    ...Typography.body,
    color: Colors.light.textSecondary,
    textAlign: 'center',
    lineHeight: Typography.body.lineHeight * 1.3,
    marginBottom: Spacing.xl,
  },
  retryButton: {
    backgroundColor: Colors.light.primary,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
  },
  retryButtonText: {
    ...Typography.body,
    color: Colors.light.textLight,
    fontWeight: '600',
    textAlign: 'center',
  },

  // Coupon Card
  couponCard: {
    backgroundColor: Colors.light.surface,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.xl,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },

  // Coupon Header
  couponHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    backgroundColor: Colors.light.surfaceSecondary,
    borderRadius: BorderRadius.sm,
    marginRight: Spacing.md,
  },
  statusBadge: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.sm,
  },
  statusText: {
    ...Typography.caption,
    fontWeight: '600',
  },

  // Coupon Image
  imageContainer: {
    height: 200,
    backgroundColor: Colors.light.surfaceSecondary,
  },
  couponImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imagePlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholderText: {
    ...Typography.body,
    color: Colors.light.textTertiary,
    marginTop: Spacing.sm,
  },

  // Coupon Content
  couponContent: {
    padding: Spacing.lg,
  },
  couponTitle: {
    ...Typography.h3,
    color: Colors.light.text,
    fontWeight: '700',
    marginBottom: Spacing.sm,
    lineHeight: Typography.h3.lineHeight * 1.2,
  },
  couponDescription: {
    ...Typography.body,
    color: Colors.light.textSecondary,
    marginBottom: Spacing.lg,
    lineHeight: Typography.body.lineHeight * 1.4,
  },

  // Discount Info
  discountContainer: {
    backgroundColor: Colors.light.warning + '10',
    borderRadius: BorderRadius.md,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.light.warning + '30',
  },
  discountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  discountLabel: {
    ...Typography.bodySmall,
    color: Colors.light.textSecondary,
    fontWeight: '600',
    marginLeft: Spacing.sm,
  },
  discountValue: {
    ...Typography.h2,
    color: Colors.light.warning,
    fontWeight: '800',
    textAlign: 'center',
    marginVertical: Spacing.sm,
  },
  discountSubtext: {
    ...Typography.caption,
    color: Colors.light.textTertiary,
    textAlign: 'center',
  },

  // Dates Info
  datesContainer: {
    backgroundColor: Colors.light.surfaceSecondary,
    borderRadius: BorderRadius.md,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  dateLabel: {
    ...Typography.bodySmall,
    color: Colors.light.textSecondary,
    fontWeight: '600',
    marginLeft: Spacing.sm,
    flex: 1,
  },
  dateValue: {
    ...Typography.bodySmall,
    color: Colors.light.text,
    fontWeight: '500',
  },
  expiryWarning: {
    color: Colors.light.error,
  },

  // Terms and Conditions
  termsContainer: {
    marginBottom: Spacing.xl,
  },
  termsTitle: {
    ...Typography.h5,
    color: Colors.light.text,
    fontWeight: '600',
    marginBottom: Spacing.md,
  },
  termsText: {
    ...Typography.bodySmall,
    color: Colors.light.textSecondary,
    lineHeight: Typography.bodySmall.lineHeight * 1.4,
  },

  // Action Button
  actionButtonContainer: {
    paddingTop: Spacing.lg,
    borderTopWidth: 1,
    borderTopColor: Colors.light.border,
  },
  useCouponButton: {
    backgroundColor: Colors.light.primary,
    paddingVertical: Spacing.lg,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  useCouponButtonDisabled: {
    backgroundColor: Colors.light.textSecondary,
    elevation: 0,
    shadowOpacity: 0,
  },
  useCouponButtonText: {
    ...Typography.body,
    color: Colors.light.textLight,
    fontWeight: '700',
    fontSize: 16,
  },
  useCouponButtonTextDisabled: {
    color: Colors.light.textTertiary,
  },
  buttonLoadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonLoadingText: {
    ...Typography.body,
    color: Colors.light.textLight,
    fontWeight: '700',
    fontSize: 16,
    marginLeft: Spacing.sm,
  },

  // Used/Expired State
  usedContainer: {
    backgroundColor: Colors.light.textSecondary + '10',
    borderRadius: BorderRadius.md,
    padding: Spacing.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.light.textSecondary + '20',
  },
  expiredContainer: {
    backgroundColor: Colors.light.error + '10',
    borderRadius: BorderRadius.md,
    padding: Spacing.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.light.error + '20',
  },
  stateIcon: {
    marginBottom: Spacing.sm,
  },
  stateTitle: {
    ...Typography.h5,
    fontWeight: '600',
    marginBottom: Spacing.xs,
    textAlign: 'center',
  },
  stateDescription: {
    ...Typography.bodySmall,
    textAlign: 'center',
    lineHeight: Typography.bodySmall.lineHeight * 1.3,
  },
  usedText: {
    color: Colors.light.textSecondary,
  },
  expiredText: {
    color: Colors.light.error,
  },
});