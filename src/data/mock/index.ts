// Export specific types
export * from '../types/index';
export * from '../types/common';

// Export all mock data
export { mockAvailableServices } from './available-services';
export { mockBookings } from './bookings';
export { mockHotels, mockRoomTypes } from './hotels';
export { mockEducationalContent, mockNewsItems } from './news';
export { mockPets } from './pets';
export { mockCoupons, mockUserServices } from './rewards';
export { mockUserServices as mockUserServicesNew } from './services';
export { mockQuickActions } from './ui';
export { getCouponStatusStyle as getCouponStatusStyleNew } from './coupons';

// Export API mock data
export * from './api-mock';

// Export utility functions
import { CouponStatus, ServiceStatus } from '../types/common';

export const getCouponStatusStyle = (status: string, colors: any) => {
  switch (status) {
    case 'available':
      return {
        backgroundColor: colors.light.success + '20',
        color: colors.light.success
      };
    case 'used':
      return {
        backgroundColor: colors.light.textSecondary + '20',
        color: colors.light.textSecondary
      };
    case 'expired':
      return {
        backgroundColor: colors.light.error + '20',
        color: colors.light.error
      };
    default:
      return {
        backgroundColor: colors.light.textSecondary + '20',
        color: colors.light.textSecondary
      };
  }
};

export const getServiceStatusStyle = (status: ServiceStatus, colors: any) => {
  switch (status) {
    case ServiceStatus.READY_TO_USE:
      return {
        backgroundColor: colors.light.info + '20',
        color: colors.light.info
      };
    case ServiceStatus.USED:
      return {
        backgroundColor: colors.light.textSecondary + '20',
        color: colors.light.textSecondary
      };
    case ServiceStatus.EXPIRED:
      return {
        backgroundColor: colors.light.error + '20',
        color: colors.light.error
      };
    default:
      return {
        backgroundColor: colors.light.textSecondary + '20',
        color: colors.light.textSecondary
      };
  }
};

export const getStatusText = (status: string, t?: (key: string) => string) => {
  if (!t) {
    // Fallback to English if no translation function provided
    switch (status) {
      case 'available':
      case 'ready_to_use':
        return status === 'available' ? 'Available' : 'Ready to Use';
      case 'used':
        return 'Used';
      case 'expired':
        return 'Expired';
      default:
        return 'Unknown';
    }
  }

  switch (status) {
    case 'available':
      return t('available');
    case 'ready_to_use':
      return t('readyToUse');
    case 'used':
      return t('used');
    case 'expired':
      return t('expired');
    default:
      return t('unknown');
  }
};