import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { Alert } from 'react-native';
import { ApiError, ApiResponse } from '../types/api.types';

// API Configuration
export const API_CONFIG = {
  BASE_URL: 'https://api.PetShop.com',
  TIMEOUT: 10000,
  RETRY_COUNT: 3,
  RETRY_DELAY: 1000,
};

// Error Handler
export class ApiErrorHandler {
  static handleError(error: unknown, showModal: boolean = true): ApiError {
    let apiError: ApiError;

    if (this.isAxiosError(error) && error.response) {
      // Server responded with error status
      apiError = {
        code: error.response.status?.toString() || 'SERVER_ERROR',
        message:
          (error.response.data as any)?.message || 'เกิดข้อผิดพลาดจากเซิร์ฟเวอร์',
        details: error.response.data,
      };
    } else if (this.isAxiosError(error) && error.request) {
      // Network error
      apiError = {
        code: 'NETWORK_ERROR',
        message:
          'ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้ กรุณาตรวจสอบการเชื่อมต่ออินเทอร์เน็ต',
        details: error.request,
      };
    } else {
      // Other error
      const err = error as Error;
      apiError = {
        code: 'UNKNOWN_ERROR',
        message: err?.message || 'เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ',
        details: error,
      };
    }

    if (showModal) {
      this.showErrorModal(apiError);
    }

    return apiError;
  }

  static showErrorModal(error: ApiError) {
    let title = 'เกิดข้อผิดพลาด';
    let message = error.message;

    switch (error.code) {
      case 'NETWORK_ERROR':
        title = 'การเชื่อมต่อขัดข้อง';
        break;
      case '401':
        title = 'ไม่มีสิทธิ์เข้าใช้';
        message = 'กรุณาเข้าสู่ระบบใหม่อีกครั้ง';
        break;
      case '403':
        title = 'ไม่อนุญาต';
        message = 'คุณไม่มีสิทธิ์ในการทำรายการนี้';
        break;
      case '404':
        title = 'ไม่พบข้อมูล';
        message = 'ไม่พบข้อมูลที่ต้องการ';
        break;
      case '500':
        title = 'เซิร์ฟเวอร์ขัดข้อง';
        message = 'เกิดข้อผิดพลาดจากเซิร์ฟเวอร์ กรุณาลองใหม่อีกครั้ง';
        break;
    }

    Alert.alert(title, message, [{ text: 'ตกลง', style: 'default' }], {
      cancelable: true,
    });
  }

  private static isAxiosError(error: unknown): error is AxiosError {
    return typeof error === 'object' && error !== null && 'isAxiosError' in error;
  }
}

// Request Interceptor
export class ApiInterceptor {
  static async request(config: AxiosRequestConfig) {
    // Add auth token if available
    const token = await this.getAuthToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Add common headers
    if (config.headers) {
      config.headers['Content-Type'] = 'application/json';
      config.headers['Accept-Language'] = 'th';
    }

    console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  }

  static async response(response: AxiosResponse) {
    console.log(`[API Response] ${response.status} ${response.config.url}`);
    return response;
  }

  static async responseError(error: unknown) {
    console.error(`[API Error]`, error);
    return Promise.reject(error);
  }

  private static async getAuthToken(): Promise<string | null> {
    // In a real app, get from AsyncStorage or secure storage
    return null;
  }
}

// Retry Logic
export class ApiRetry {
  static async withRetry<T>(
    apiCall: () => Promise<T>,
    maxRetries: number = API_CONFIG.RETRY_COUNT,
    delay: number = API_CONFIG.RETRY_DELAY
  ): Promise<T> {
    let lastError: unknown;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        return await apiCall();
      } catch (error: unknown) {
        lastError = error;

        if (
          error &&
          typeof error === 'object' &&
          'response' in (error as AxiosError) &&
          [400, 401, 403, 404].includes(
            (error as AxiosError).response?.status ?? -1
          )
        ) {
          break;
        }

        if (attempt === maxRetries) {
          break;
        }

        // Exponential backoff
        await new Promise((resolve) =>
          setTimeout(resolve, delay * Math.pow(2, attempt))
        );
      }
    }

    throw lastError;
  }
}

// Response Transformer
export class ApiTransformer {
  static transformResponse<T>(data: any): ApiResponse<T> {
    return {
      success: data.success ?? true,
      data: (data.data ?? data) as T,
      message: data.message,
      error: data.error,
      timestamp: data.timestamp || new Date().toISOString(),
    };
  }

  static transformError(error: unknown): ApiResponse<null> {
    const apiError = ApiErrorHandler.handleError(error, false);
    return {
      success: false,
      data: null,
      error: apiError.message,
      timestamp: new Date().toISOString(),
    };
  }
}

// Loading State Manager
export class LoadingManager {
  private static loadingStates = new Map<string, boolean>();
  private static listeners = new Set<
    (state: Record<string, boolean>) => void
  >();

  static setLoading(key: string, isLoading: boolean) {
    this.loadingStates.set(key, isLoading);
    this.notifyListeners();
  }

  static isLoading(key: string): boolean {
    return this.loadingStates.get(key) || false;
  }

  static subscribe(listener: (state: Record<string, boolean>) => void) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private static notifyListeners() {
    const state = Object.fromEntries(this.loadingStates);
    this.listeners.forEach((listener) => listener(state));
  }
}
