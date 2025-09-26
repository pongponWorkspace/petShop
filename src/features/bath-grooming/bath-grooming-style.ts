import { BorderRadius, Colors, Shadows, Spacing, Typography } from '@/src/shared/constants/theme';
import { Platform, StyleSheet } from 'react-native';
;

export const bathGroomingStyles = StyleSheet.create({
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

  // Category Tabs
  categorySection: {
    paddingVertical: Spacing.md,
    backgroundColor: Colors.light.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  categoryScrollContent: {
    paddingHorizontal: Spacing.lg,
  },
  categoryButton: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    backgroundColor: Colors.light.background,
    borderRadius: BorderRadius.round,
    marginRight: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  categoryButtonActive: {
    backgroundColor: Colors.light.primary,
    borderColor: Colors.light.primary,
  },
  categoryButtonText: {
    ...Typography.bodySmall,
    color: Colors.light.text,
    fontWeight: '500',
  },
  categoryButtonTextActive: {
    color: Colors.light.textLight,
    fontWeight: '600',
  },

  // Services List
  servicesContainer: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
  },
  serviceCard: {
    backgroundColor: Colors.light.surface,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.lg,
    overflow: 'hidden',
    ...Shadows.small,
  },
  unavailableServiceCard: {
    opacity: 0.6,
  },
  serviceImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  serviceContent: {
    padding: Spacing.lg,
  },
  serviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.sm,
  },
  serviceTitleContainer: {
    flex: 1,
    marginRight: Spacing.md,
  },
  serviceName: {
    ...Typography.h4,
    color: Colors.light.text,
    fontWeight: '600',
    marginBottom: Spacing.xs,
  },
  serviceDescription: {
    ...Typography.body,
    color: Colors.light.textSecondary,
    lineHeight: 20,
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  servicePrice: {
    ...Typography.h4,
    color: Colors.light.primary,
    fontWeight: 'bold',
  },
  serviceDuration: {
    ...Typography.bodySmall,
    color: Colors.light.textTertiary,
    marginTop: 2,
  },
  serviceFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Spacing.md,
  },
  categoryTag: {
    backgroundColor: Colors.light.primary + '20',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: BorderRadius.sm,
  },
  categoryTagText: {
    ...Typography.caption,
    color: Colors.light.primary,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  availabilityBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: BorderRadius.sm,
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
  bookButton: {
    backgroundColor: Colors.light.primary,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
    marginTop: Spacing.md,
  },
  bookButtonDisabled: {
    backgroundColor: Colors.light.textTertiary,
  },
  bookButtonText: {
    ...Typography.bodySmall,
    color: Colors.light.textLight,
    fontWeight: '600',
    textAlign: 'center',
  },

  // Unavailable Overlay
  unavailableOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: BorderRadius.lg,
  },
  unavailableText2: {
    ...Typography.h4,
    color: Colors.light.textLight,
    fontWeight: 'bold',
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
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

  // Empty State
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.xxl,
    paddingVertical: Spacing.xxxl,
  },
  emptyTitle: {
    ...Typography.h4,
    color: Colors.light.text,
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },
  emptyText: {
    ...Typography.body,
    color: Colors.light.textSecondary,
    textAlign: 'center',
    lineHeight: Typography.body.lineHeight * 1.3,
  },

  // Booking Interface Styles
  bookingSection: {
    marginBottom: Spacing.xl,
    backgroundColor: Colors.light.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    ...Shadows.small,
  },
  sectionTitle: {
    ...Typography.h4,
    color: Colors.light.text,
    fontWeight: '600',
    marginBottom: Spacing.md,
  },
  sectionSubtitle: {
    ...Typography.body,
    color: Colors.light.textSecondary,
    marginBottom: Spacing.md,
  },
  selectedServiceCard: {
    flexDirection: 'row',
    backgroundColor: Colors.light.background,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    borderWidth: 2,
    borderColor: Colors.light.primary + '30',
  },
  selectedServiceImage: {
    width: 80,
    height: 80,
    borderRadius: BorderRadius.md,
    marginRight: Spacing.md,
  },
  selectedServiceInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  selectedServiceName: {
    ...Typography.h4,
    color: Colors.light.text,
    fontWeight: '600',
  },
  selectedServicePrice: {
    ...Typography.body,
    color: Colors.light.primary,
    fontWeight: '700',
  },
  selectedServiceDuration: {
    ...Typography.bodySmall,
    color: Colors.light.textSecondary,
  },
  datePicker: {
    alignSelf: 'flex-start',
  },
  selectedDateText: {
    ...Typography.body,
    color: Colors.light.primary,
    fontWeight: '600',
    marginTop: Spacing.sm,
  },
  timeSlotsContainer: {
    paddingVertical: Spacing.sm,
  },
  timeSlot: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.light.background,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.light.border,
    marginRight: Spacing.sm,
  },
  selectedTimeSlot: {
    backgroundColor: Colors.light.primary,
    borderColor: Colors.light.primary,
  },
  timeSlotText: {
    ...Typography.body,
    color: Colors.light.text,
    fontWeight: '500',
  },
  selectedTimeSlotText: {
    color: Colors.light.textLight,
    fontWeight: '600',
  },
  petOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.light.background,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    borderWidth: 2,
    borderColor: Colors.light.border,
  },
  selectedPetOption: {
    borderColor: Colors.light.primary,
    backgroundColor: Colors.light.primary + '10',
  },
  petInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  petIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.light.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  petDetails: {
    flex: 1,
  },
  petName: {
    ...Typography.body,
    color: Colors.light.text,
    fontWeight: '600',
  },
  petBreed: {
    ...Typography.bodySmall,
    color: Colors.light.textSecondary,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.light.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkedBox: {
    backgroundColor: Colors.light.primary,
    borderColor: Colors.light.primary,
  },
  totalPriceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  totalPriceLabel: {
    ...Typography.h4,
    color: Colors.light.text,
    fontWeight: '600',
  },
  totalPriceValue: {
    ...Typography.h3,
    color: Colors.light.primary,
    fontWeight: '700',
  },
  priceBreakdown: {
    ...Typography.bodySmall,
    color: Colors.light.textSecondary,
    textAlign: 'right',
  },
  confirmButtonContainer: {
    marginTop: Spacing.lg,
    marginBottom: Spacing.xxxl,
  },
  confirmButton: {
    backgroundColor: Colors.light.primary,
  },
  confirmButtonDisabled: {
    backgroundColor: Colors.light.textSecondary,
  },
});