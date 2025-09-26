import { StyleSheet, Platform } from 'react-native';
import { Colors, Spacing, Typography, BorderRadius } from '@/src/shared/constants/theme';

export const addPetStyles = StyleSheet.create({
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
    borderBottomLeftRadius: BorderRadius.lg,
    borderBottomRightRadius: BorderRadius.lg,
    elevation: 4,
    shadowColor: Colors.light.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
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
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.xl,
  },

  // Form Header
  formHeader: {
    marginBottom: Spacing.xl,
    backgroundColor: Colors.light.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.xl,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    alignItems: 'center',
  },
  formTitle: {
    ...Typography.h3,
    color: Colors.light.text,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: Spacing.xs,
  },
  formSubtitle: {
    ...Typography.body,
    color: Colors.light.textSecondary,
    textAlign: 'center',
  },

  // Form sections
  section: {
    marginBottom: Spacing.xl,
    backgroundColor: Colors.light.surface,
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
  },
  sectionTitle: {
    ...Typography.h4,
    color: Colors.light.text,
    fontWeight: '700',
    marginBottom: Spacing.lg,
    letterSpacing: 0.5,
    textAlign: 'center',
  },

  // Form fields
  inputGroup: {
    marginBottom: Spacing.xl,
  },
  label: {
    ...Typography.bodySmall,
    color: Colors.light.text,
    fontWeight: '700',
    marginBottom: Spacing.sm,
    letterSpacing: 0.3,
  },
  requiredLabel: {
    color: Colors.light.error,
  },
  input: {
    backgroundColor: Colors.light.surface,
    borderRadius: BorderRadius.lg,
    borderWidth: 2,
    borderColor: Colors.light.border,
    padding: Spacing.lg,
    ...Typography.body,
    color: Colors.light.text,
    minHeight: 56,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
  },
  inputFocused: {
    borderColor: Colors.light.primary,
    shadowColor: Colors.light.primary,
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },

  // Pet type selector
  petTypeContainer: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  petTypeOption: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: Spacing.xl,
    paddingHorizontal: Spacing.lg,
    backgroundColor: Colors.light.surface,
    borderRadius: BorderRadius.xl,
    borderWidth: 2,
    borderColor: Colors.light.border,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    transform: [{ scale: 1 }],
  },
  petTypeOptionSelected: {
    borderColor: Colors.light.primary,
    backgroundColor: Colors.light.primary + '15',
    elevation: 4,
    shadowColor: Colors.light.primary,
    shadowOpacity: 0.2,
    shadowRadius: 8,
    transform: [{ scale: 1.02 }],
  },
  petTypeIcon: {
    marginBottom: Spacing.sm,
  },
  petTypeText: {
    ...Typography.bodySmall,
    color: Colors.light.text,
    fontWeight: '600',
    textAlign: 'center',
    letterSpacing: 0.2,
  },
  petTypeTextSelected: {
    color: Colors.light.primary,
    fontWeight: '700',
  },

  // Buttons
  buttonContainer: {
    paddingTop: Spacing.xl,
    paddingBottom: Platform.OS === 'ios' ? Spacing.xxxl : Spacing.lg,
    paddingHorizontal: Spacing.lg,
    backgroundColor: Colors.light.surface,
    borderTopLeftRadius: BorderRadius.xl,
    borderTopRightRadius: BorderRadius.xl,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  submitButton: {
    backgroundColor: Colors.light.primary,
    paddingVertical: Spacing.lg,
    borderRadius: BorderRadius.xl,
    alignItems: 'center',
    elevation: 4,
    shadowColor: Colors.light.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    minHeight: 56,
    justifyContent: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: Colors.light.textSecondary,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  submitButtonText: {
    ...Typography.body,
    color: Colors.light.textLight,
    fontWeight: '700',
    fontSize: 16,
    letterSpacing: 0.5,
  },
  submitButtonTextDisabled: {
    color: Colors.light.textTertiary,
  },

  // Secondary button
  secondaryButton: {
    backgroundColor: Colors.light.background,
    paddingVertical: Spacing.lg,
    borderRadius: BorderRadius.xl,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.light.primary + '30',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    minHeight: 56,
    justifyContent: 'center',
  },
  secondaryButtonText: {
    ...Typography.body,
    color: Colors.light.primary,
    fontWeight: '600',
    fontSize: 16,
    letterSpacing: 0.3,
  },

  // Loading states
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

  // Error states
  errorText: {
    ...Typography.bodySmall,
    color: Colors.light.error,
    marginTop: Spacing.xs,
  },
  errorContainer: {
    backgroundColor: Colors.light.error + '10',
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginBottom: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.light.error + '30',
  },
  errorTitle: {
    ...Typography.bodySmall,
    color: Colors.light.error,
    fontWeight: '600',
    marginBottom: Spacing.xs,
  },
  errorMessage: {
    ...Typography.bodySmall,
    color: Colors.light.error,
  },

  // Help text
  helpText: {
    ...Typography.caption,
    color: Colors.light.textTertiary,
    marginTop: Spacing.xs,
    lineHeight: Typography.caption.lineHeight * 1.3,
  },

  // Step indicators
  stepIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.xl,
    paddingVertical: Spacing.lg,
    backgroundColor: Colors.light.surface,
    borderRadius: BorderRadius.xl,
    marginHorizontal: Spacing.md,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
  },
  stepDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: Colors.light.border,
    marginHorizontal: Spacing.xs,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  stepDotActive: {
    backgroundColor: Colors.light.primary,
    width: 20,
    height: 20,
    borderRadius: 10,
    elevation: 3,
    shadowColor: Colors.light.primary,
    shadowOpacity: 0.4,
    shadowRadius: 6,
  },
  stepDotCompleted: {
    backgroundColor: Colors.light.success,
    width: 18,
    height: 18,
    borderRadius: 9,
    elevation: 2,
    shadowColor: Colors.light.success,
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  stepLine: {
    width: 32,
    height: 3,
    backgroundColor: Colors.light.border,
    borderRadius: 1.5,
    marginHorizontal: Spacing.xs,
  },
  stepLineCompleted: {
    backgroundColor: Colors.light.success,
    elevation: 1,
    shadowColor: Colors.light.success,
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
});