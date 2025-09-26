import { BorderRadius, Colors, Shadows, Spacing, Typography } from '@/src/shared/constants/theme';
import { Platform, StyleSheet } from 'react-native';
;

export const myDetailServiceStyles = StyleSheet.create({
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
  serviceImage: {
    width: '100%',
    height: 250,
    resizeMode: 'cover' as const,
  },
  imageOverlay: {
    position: 'absolute' as const,
    top: Spacing.lg,
    right: Spacing.lg,
  },
  statusBadge: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.md,
  },
  statusText: {
    ...Typography.bodySmall,
    fontWeight: '600' as const,
  },
  serviceInfo: {
    padding: Spacing.lg,
  },
  serviceHeader: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    marginBottom: Spacing.lg,
  },
  serviceIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.light.primary + '20',
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    marginRight: Spacing.md,
  },
  serviceTitleContainer: {
    flex: 1,
  },
  serviceTitle: {
    ...Typography.h3,
    color: Colors.light.text,
    fontWeight: '600' as const,
    marginBottom: 4,
  },
  serviceSubtitle: {
    ...Typography.body,
    color: Colors.light.textSecondary,
  },
  serviceDatesCard: {
    backgroundColor: Colors.light.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
    ...Shadows.small,
  },
  dateRow: {
    flexDirection: 'row' as const,
    justifyContent: 'space-around' as const,
  },
  dateInfo: {
    alignItems: 'center' as const,
    flex: 1,
  },
  dateLabel: {
    ...Typography.caption,
    color: Colors.light.textTertiary,
    marginTop: Spacing.xs,
    marginBottom: 2,
  },
  dateValue: {
    ...Typography.bodySmall,
    color: Colors.light.text,
    fontWeight: '600' as const,
  },
  benefitsSection: {
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    ...Typography.h4,
    color: Colors.light.text,
    fontWeight: '600' as const,
    marginBottom: Spacing.md,
  },
  benefitItem: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    marginBottom: Spacing.sm,
    paddingLeft: Spacing.xs,
  },
  benefitText: {
    ...Typography.body,
    color: Colors.light.text,
    marginLeft: Spacing.sm,
    flex: 1,
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
  expiredContainer: {
    alignItems: 'center' as const,
    paddingVertical: Spacing.lg,
  },
  expiredText: {
    ...Typography.body,
    color: Colors.light.error,
    fontWeight: '600' as const,
    marginBottom: Spacing.lg,
    textAlign: 'center' as const,
  },
});