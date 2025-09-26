// Enum mapping utilities
import { BookingStatus, CouponStatus, ServiceStatus } from '@/src/data/types/common';
import { ApiBookingStatus, ApiCouponStatus, ApiServiceStatus } from '@/src/services';


// Map API enums (uppercase) to local enums (lowercase)
export class EnumMapper {
  // Service Status Mapping
  static mapApiServiceStatus(apiStatus: ApiServiceStatus): ServiceStatus {
    const mapping: Record<ApiServiceStatus, ServiceStatus> = {
      [ApiServiceStatus.READY_TO_USE]: ServiceStatus.READY_TO_USE,
      [ApiServiceStatus.USED]: ServiceStatus.USED,
      [ApiServiceStatus.EXPIRED]: ServiceStatus.EXPIRED,
    };

    return mapping[apiStatus];
  }

  static mapServiceStatusToApi(status: ServiceStatus): ApiServiceStatus {
    const mapping: Record<ServiceStatus, ApiServiceStatus> = {
      [ServiceStatus.READY_TO_USE]: ApiServiceStatus.READY_TO_USE,
      [ServiceStatus.USED]: ApiServiceStatus.USED,
      [ServiceStatus.EXPIRED]: ApiServiceStatus.EXPIRED,
    };

    return mapping[status];
  }

  // Coupon Status Mapping
  static mapApiCouponStatus(apiStatus: ApiCouponStatus): CouponStatus {
    const mapping: Record<ApiCouponStatus, CouponStatus> = {
      [ApiCouponStatus.AVAILABLE]: CouponStatus.AVAILABLE,
      [ApiCouponStatus.USED]: CouponStatus.USED,
      [ApiCouponStatus.EXPIRED]: CouponStatus.EXPIRED,
    };

    return mapping[apiStatus];
  }

  static mapCouponStatusToApi(status: CouponStatus): ApiCouponStatus {
    const mapping: Record<CouponStatus, ApiCouponStatus> = {
      [CouponStatus.AVAILABLE]: ApiCouponStatus.AVAILABLE,
      [CouponStatus.USED]: ApiCouponStatus.USED,
      [CouponStatus.EXPIRED]: ApiCouponStatus.EXPIRED,
    };

    return mapping[status];
  }

  // Booking Status Mapping
  static mapApiBookingStatus(apiStatus: ApiBookingStatus): BookingStatus {
    const mapping: Record<ApiBookingStatus, BookingStatus> = {
      [ApiBookingStatus.PENDING]: BookingStatus.UPCOMING,
      [ApiBookingStatus.CONFIRMED]: BookingStatus.CONFIRMED,
      [ApiBookingStatus.COMPLETED]: BookingStatus.COMPLETED,
      [ApiBookingStatus.CANCELLED]: BookingStatus.COMPLETED, // Map cancelled to completed for simplicity
    };

    return mapping[apiStatus];
  }

  static mapBookingStatusToApi(status: BookingStatus): ApiBookingStatus {
    const mapping: Record<BookingStatus, ApiBookingStatus> = {
      [BookingStatus.UPCOMING]: ApiBookingStatus.PENDING,
      [BookingStatus.CONFIRMED]: ApiBookingStatus.CONFIRMED,
      [BookingStatus.COMPLETED]: ApiBookingStatus.COMPLETED,
    };

    return mapping[status];
  }

  // Pet Type Mapping (API sends uppercase)
  static mapApiPetType(apiType: 'DOG' | 'CAT'): 'dog' | 'cat' {
    return apiType.toLowerCase() as 'dog' | 'cat';
  }

  static mapPetTypeToApi(type: 'dog' | 'cat'): 'DOG' | 'CAT' {
    return type.toUpperCase() as 'DOG' | 'CAT';
  }

  // Generic enum normalization
  static normalizeEnumToUppercase<T extends string>(value: T): Uppercase<T> {
    return value.toUpperCase() as Uppercase<T>;
  }

  static normalizeEnumToLowercase<T extends string>(value: T): Lowercase<T> {
    return value.toLowerCase() as Lowercase<T>;
  }
}

// Status display helpers
export class StatusDisplayHelper {
  static getStatusColor(status: string): string {
    const normalizedStatus = status.toUpperCase();

    switch (normalizedStatus) {
      case 'READY_TO_USE':
      case 'AVAILABLE':
      case 'CONFIRMED':
        return '#10B981'; // Green
      case 'USED':
      case 'COMPLETED':
        return '#6B7280'; // Gray
      case 'EXPIRED':
      case 'CANCELLED':
        return '#EF4444'; // Red
      case 'PENDING':
        return '#F59E0B'; // Orange
      default:
        return '#6B7280'; // Default gray
    }
  }

  static getStatusBadgeStyle(status: string) {
    const color = this.getStatusColor(status);
    return {
      backgroundColor: color + '20',
      borderColor: color,
      color: color,
    };
  }
}