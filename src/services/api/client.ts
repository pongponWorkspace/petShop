import { ApiErrorHandler, ApiInterceptor, ApiRetry } from '../middleware/api.middleware';
import { ServicesAPI } from './services.api';
import { BookingsAPI } from './bookings.api';
import { CouponsAPI } from './coupons.api';
import { PetsAPI } from './pets.api';
import { HotelsAPI } from './hotels.api';
import { HospitalAPI } from './hospital.api';
import { ContentAPI } from './content.api';

// Main API Client
export class ApiClient {
  // Services
  static services = ServicesAPI;
  static bookings = BookingsAPI;
  static coupons = CouponsAPI;
  static pets = PetsAPI;
  static hotels = HotelsAPI;
  static hospital = HospitalAPI;
  static content = ContentAPI;

  // Utility methods
  static handleError = ApiErrorHandler.handleError;
  static showErrorModal = ApiErrorHandler.showErrorModal;
  static withRetry = ApiRetry.withRetry;

  // Initialize client (if needed for real HTTP client setup)
  static initialize() {
    console.log('[ApiClient] Initialized with mock data');
  }
}

// Export for easy access
export const api = ApiClient;