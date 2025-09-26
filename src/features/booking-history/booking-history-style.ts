import { BorderRadius, Colors, Shadows, Spacing, Typography } from '@/src/shared/constants/theme';
import { Platform, StyleSheet } from 'react-native';
;

export const bookingHistoryStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
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
    paddingHorizontal: Spacing.xxl,
  },
  loadingText: {
    ...Typography.body,
    color: Colors.light.textSecondary,
    marginTop: Spacing.md,
    textAlign: 'center' as const,
  },
  filterSection: {
    marginTop: Spacing.lg,
    marginBottom: Spacing.md,
  },
  filterScrollContent: {
    paddingHorizontal: Spacing.lg,
  },
  filterButton: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    backgroundColor: Colors.light.surface,
    borderRadius: BorderRadius.xxl,
    marginRight: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  filterButtonActive: {
    backgroundColor: Colors.light.primary,
    borderColor: Colors.light.primary,
  },
  filterButtonText: {
    ...Typography.bodySmall,
    color: Colors.light.text,
    fontWeight: '500' as const,
  },
  filterButtonTextActive: {
    color: Colors.light.textLight,
    fontWeight: '600' as const,
  },
  bookingsSection: {
    paddingHorizontal: Spacing.lg,
  },
  emptyContainer: {
    alignItems: 'center' as const,
    paddingVertical: Spacing.xxxl,
  },
  emptyTitle: {
    ...Typography.h4,
    color: Colors.light.text,
    fontWeight: '600' as const,
    marginTop: Spacing.md,
    marginBottom: Spacing.sm,
    textAlign: 'center' as const,
  },
  emptyDescription: {
    ...Typography.body,
    color: Colors.light.textSecondary,
    textAlign: 'center' as const,
    lineHeight: 22,
  },
  bookingCard: {
    backgroundColor: Colors.light.surface,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.lg,
    padding: Spacing.lg,
    ...Shadows.small,
  },
  bookingHeader: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    marginBottom: Spacing.md,
  },
  bookingTypeContainer: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    flex: 1,
  },
  bookingIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.light.primary + '20',
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    marginRight: Spacing.sm,
  },
  bookingTypeInfo: {
    flex: 1,
  },
  bookingType: {
    ...Typography.body,
    color: Colors.light.text,
    fontWeight: '600' as const,
  },
  bookingId: {
    ...Typography.caption,
    color: Colors.light.textSecondary,
  },
  statusBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: BorderRadius.sm,
  },
  statusText: {
    ...Typography.caption,
    fontWeight: '600' as const,
  },
  bookingDetails: {
    marginBottom: Spacing.md,
  },
  serviceInfo: {
    marginBottom: Spacing.sm,
  },
  serviceName: {
    ...Typography.h5,
    color: Colors.light.text,
    fontWeight: '600' as const,
    marginBottom: 4,
  },
  petInfo: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: Spacing.xs,
  },
  petName: {
    ...Typography.bodySmall,
    color: Colors.light.textSecondary,
  },
  dateTimeInfo: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
  },
  dateTimeRow: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: Spacing.xs,
  },
  dateTimeText: {
    ...Typography.bodySmall,
    color: Colors.light.textSecondary,
  },
  bookingActions: {
    flexDirection: 'row' as const,
    gap: Spacing.sm,
  },
  actionButton: {
    flex: 1,
    backgroundColor: Colors.light.primary,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.sm,
    alignItems: 'center' as const,
  },
  actionButtonText: {
    ...Typography.bodySmall,
    color: Colors.light.textLight,
    fontWeight: '600' as const,
  },
  secondaryActionButton: {
    backgroundColor: Colors.light.surface,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  secondaryActionButtonText: {
    color: Colors.light.text,
  },
});