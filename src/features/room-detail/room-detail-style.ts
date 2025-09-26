import { BorderRadius, Colors, Shadows, Spacing, Typography } from '@/src/shared/constants/theme';
import { Platform, StyleSheet } from 'react-native';
;

export const roomDetailStyles = StyleSheet.create({
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: Spacing.xxxl,
  },

  // Image Gallery
  imageGallery: {
    height: 250,
    backgroundColor: Colors.light.surfaceSecondary,
  },
  imageScrollView: {
    height: 250,
  },
  roomImage: {
    width: 300,
    height: 250,
    marginRight: Spacing.md,
    borderRadius: BorderRadius.md,
  },
  firstImage: {
    marginLeft: Spacing.lg,
  },
  imageIndicator: {
    position: 'absolute',
    bottom: Spacing.md,
    right: Spacing.lg,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.round,
  },
  imageIndicatorText: {
    ...Typography.caption,
    color: Colors.light.textLight,
    fontWeight: '500',
  },

  // Room Info
  roomInfoSection: {
    padding: Spacing.lg,
  },
  roomHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.md,
  },
  roomTitleContainer: {
    flex: 1,
    marginRight: Spacing.md,
  },
  roomName: {
    ...Typography.h3,
    color: Colors.light.text,
    fontWeight: '600',
    marginBottom: Spacing.xs,
  },
  roomDescription: {
    ...Typography.body,
    color: Colors.light.textSecondary,
    lineHeight: 20,
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  roomPrice: {
    ...Typography.h3,
    color: Colors.light.primary,
    fontWeight: 'bold',
  },
  priceUnit: {
    ...Typography.bodySmall,
    color: Colors.light.textSecondary,
    marginTop: 2,
  },
  availabilityBadge: {
    paddingHorizontal: Spacing.md,
    paddingVertical: 4,
    borderRadius: BorderRadius.round,
    marginTop: Spacing.xs,
  },
  availableBadge: {
    backgroundColor: Colors.light.success + '20',
  },
  unavailableBadge: {
    backgroundColor: Colors.light.error + '20',
  },
  availabilityText: {
    ...Typography.caption,
    fontWeight: '600',
  },
  availableText: {
    color: Colors.light.success,
  },
  unavailableText: {
    color: Colors.light.error,
  },

  // Room Details
  roomDetailsSection: {
    padding: Spacing.lg,
    backgroundColor: Colors.light.surface,
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
    borderRadius: BorderRadius.lg,
    ...Shadows.small,
  },
  sectionTitle: {
    ...Typography.h4,
    color: Colors.light.text,
    fontWeight: '600',
    marginBottom: Spacing.md,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  lastDetailRow: {
    borderBottomWidth: 0,
  },
  detailLabel: {
    ...Typography.body,
    color: Colors.light.textSecondary,
    flex: 1,
  },
  detailValue: {
    ...Typography.body,
    color: Colors.light.text,
    fontWeight: '500',
    textAlign: 'right',
  },

  // Amenities
  amenitiesSection: {
    padding: Spacing.lg,
    backgroundColor: Colors.light.surface,
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
    borderRadius: BorderRadius.lg,
    ...Shadows.small,
  },
  amenitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  amenityTag: {
    backgroundColor: Colors.light.primary + '15',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.round,
    borderWidth: 1,
    borderColor: Colors.light.primary + '30',
  },
  amenityText: {
    ...Typography.bodySmall,
    color: Colors.light.primary,
    fontWeight: '500',
  },

  // Book Button
  bookingSection: {
    padding: Spacing.lg,
    paddingBottom: Spacing.xl,
  },
  bookButton: {
    marginBottom: Spacing.md,
  },
  disabledButton: {
    opacity: 0.5,
  },

  // Loading States
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

  // Error States
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
});