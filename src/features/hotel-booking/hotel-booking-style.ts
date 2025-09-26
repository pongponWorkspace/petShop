import { BorderRadius, Colors, Shadows, Spacing, Typography } from '@/src/shared/constants/theme';
import { Platform, StyleSheet } from 'react-native';
;

export const hotelBookingStyles = StyleSheet.create({
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

  // Room Info
  roomInfo: {
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.lg,
    marginBottom: Spacing.md,
    backgroundColor: Colors.light.surface,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    ...Shadows.medium,
  },
  roomImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  roomDetails: {
    padding: Spacing.lg,
  },
  roomHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.sm,
  },
  roomName: {
    ...Typography.h4,
    color: Colors.light.text,
    fontWeight: '600',
    flex: 1,
  },
  roomPrice: {
    ...Typography.h4,
    color: Colors.light.primary,
    fontWeight: 'bold',
  },
  priceUnit: {
    ...Typography.bodySmall,
    color: Colors.light.textSecondary,
    textAlign: 'right',
  },
  roomDescription: {
    ...Typography.body,
    color: Colors.light.textSecondary,
    lineHeight: 20,
  },

  // Sections
  section: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    ...Typography.h4,
    color: Colors.light.text,
    fontWeight: '600',
    marginBottom: Spacing.md,
    paddingHorizontal: Spacing.lg,
  },

  // Date Picker
  datePickerWrapper: {
    position: 'relative',
    zIndex: 10,
  },
  datePickerButton: {
    marginHorizontal: Spacing.lg,
    backgroundColor: Colors.light.surface,
    borderRadius: BorderRadius.md,
    borderWidth: 2,
    borderColor: Colors.light.primary,
    overflow: 'hidden',
    ...Shadows.small,
  },
  datePickerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.lg,
    backgroundColor: Colors.light.primary + '05',
  },
  datePickerText: {
    ...Typography.body,
    color: Colors.light.text,
    fontWeight: '600',
    flex: 1,
    marginLeft: Spacing.md,
  },
  datePickerDropdown: {
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.xs,
    backgroundColor: Colors.light.surface,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.light.border,
    ...Shadows.medium,
    overflow: 'hidden',
  },
  datePickerSpinner: {
    height: 200,
    backgroundColor: Colors.light.surface,
    alignSelf: 'center'
  },
  datePickerActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.light.border,
    backgroundColor: Colors.light.surfaceSecondary,
  },
  datePickerDoneButton: {
    backgroundColor: Colors.light.primary,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
  },
  datePickerDoneText: {
    ...Typography.bodySmall,
    color: Colors.light.textLight,
    fontWeight: '600',
  },

  // Time Selection
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: Spacing.lg,
    gap: Spacing.md,
  },
  timeCard: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    backgroundColor: Colors.light.surface,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.light.border,
    minWidth: 100,
  },
  selectedTimeCard: {
    backgroundColor: Colors.light.primary,
    borderColor: Colors.light.primary,
  },
  unavailableTimeCard: {
    backgroundColor: Colors.light.surfaceSecondary,
    borderColor: Colors.light.border,
  },
  timeText: {
    ...Typography.bodySmall,
    color: Colors.light.text,
    fontWeight: '500',
  },
  selectedTimeText: {
    color: Colors.light.textLight,
  },
  unavailableTimeText: {
    color: Colors.light.textTertiary,
  },
  unavailableLabel: {
    ...Typography.caption,
    color: Colors.light.textTertiary,
    fontSize: 10,
    marginTop: 2,
  },

  // Pet Selection
  petCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.lg,
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
    backgroundColor: Colors.light.surface,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  selectedPetCard: {
    borderColor: Colors.light.primary,
    backgroundColor: Colors.light.primary + '10',
  },
  petInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  petAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.light.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  petInitial: {
    ...Typography.h4,
    color: Colors.light.textLight,
    fontWeight: 'bold',
  },
  petDetails: {
    flex: 1,
  },
  petName: {
    ...Typography.body,
    color: Colors.light.text,
    fontWeight: '600',
    marginBottom: 2,
  },
  petBreed: {
    ...Typography.bodySmall,
    color: Colors.light.textSecondary,
    marginBottom: 2,
  },
  petWeight: {
    ...Typography.caption,
    color: Colors.light.textTertiary,
  },

  // Input Fields
  inputContainer: {
    marginBottom: Spacing.lg,
    paddingHorizontal: Spacing.lg,
  },
  inputLabel: {
    ...Typography.bodySmall,
    color: Colors.light.text,
    fontWeight: '600',
    marginBottom: Spacing.xs,
  },
  textInput: {
    backgroundColor: Colors.light.surface,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.light.border,
    padding: Spacing.md,
    ...Typography.body,
    color: Colors.light.text,
    minHeight: 44,
    textAlignVertical: 'top',
  },
  notesInput: {
    minHeight: 80,
  },

  // Booking Section
  bookingSection: {
    padding: Spacing.lg,
  },
  bookButton: {
    marginBottom: Spacing.md,
  },
  disabledButton: {
    opacity: 0.5,
  },
  warningText: {
    ...Typography.caption,
    color: Colors.light.warning,
    textAlign: 'center',
    fontWeight: '500',
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