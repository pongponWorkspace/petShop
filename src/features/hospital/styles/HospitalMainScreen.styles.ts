import { BorderRadius, Colors, Spacing, Typography } from '@/src/shared/constants/theme';
import { Platform, StyleSheet } from 'react-native';

export const hospitalMainScreenStyles = StyleSheet.create({
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
  content: {
    flex: 1,
    padding: Spacing.lg,
  },
  introSection: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
    paddingVertical: Spacing.lg,
  },
  introTitle: {
    ...Typography.h2,
    color: Colors.light.text,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: Spacing.md,
    marginBottom: Spacing.sm,
  },
  introDescription: {
    ...Typography.body,
    color: Colors.light.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  hospitalContainer: {
    flex: 1,
    gap: Spacing.lg,
  },
  hospitalCard: {
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    position: 'relative',
  },
  hospitalImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  hospitalOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    padding: Spacing.md,
    alignItems: 'center',
  },
  hospitalText: {
    ...Typography.h4,
    color: Colors.light.surface,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: Spacing.xs,
    marginBottom: Spacing.xs,
  },
  hospitalSubText: {
    ...Typography.caption,
    color: Colors.light.surface,
    opacity: 0.9,
    textAlign: 'center',
    lineHeight: 16,
  },
});