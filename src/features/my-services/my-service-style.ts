import { BorderRadius, Colors, Shadows, Spacing, Typography } from '@/src/shared/constants/theme';
import { Platform, StyleSheet } from 'react-native';
;

export const myServiceStyles = StyleSheet.create({
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
  servicesSection: {
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
  serviceCard: {
    backgroundColor: Colors.light.surface,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.lg,
    overflow: 'hidden',
    ...Shadows.small,
  },
  serviceImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover' as const,
  },
  serviceContent: {
    padding: Spacing.lg,
  },
  serviceHeader: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    marginBottom: Spacing.sm,
  },
  serviceIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.light.primary + '20',
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
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
  serviceTitle: {
    ...Typography.h4,
    color: Colors.light.text,
    fontWeight: '600' as const,
    marginBottom: Spacing.md,
  },
  serviceDates: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    marginBottom: Spacing.md,
  },
  dateInfo: {
    flex: 1,
  },
  dateLabel: {
    ...Typography.caption,
    color: Colors.light.textTertiary,
    marginBottom: 2,
  },
  dateValue: {
    ...Typography.bodySmall,
    color: Colors.light.textSecondary,
    fontWeight: '500' as const,
  },
  serviceActions: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: Spacing.sm,
  },
  primaryActionButton: {
    flex: 1,
    backgroundColor: Colors.light.primary,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.sm,
    alignItems: 'center' as const,
  },
  primaryActionText: {
    ...Typography.bodySmall,
    color: Colors.light.textLight,
    fontWeight: '600' as const,
  },
  secondaryActionButton: {
    flex: 1,
    backgroundColor: Colors.light.surface,
    borderWidth: 1,
    borderColor: Colors.light.border,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.sm,
    alignItems: 'center' as const,
  },
  secondaryActionText: {
    ...Typography.bodySmall,
    color: Colors.light.text,
    fontWeight: '600' as const,
  },
  moreButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.light.surfaceSecondary,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
});