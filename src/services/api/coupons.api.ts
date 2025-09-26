import { mockApiCoupons } from '@/src/data/mock';
import { ApiTransformer, LoadingManager } from '../middleware/api.middleware';
import {
  ApiCoupon,
  ApiResponse,
  PaginatedResponse
} from '../types/api.types';

// Coupons API
export class CouponsAPI {
  private static delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  // Get all coupons
  static async getCoupons(page: number = 1, limit: number = 10): Promise<PaginatedResponse<ApiCoupon>> {
    const loadingKey = 'getCoupons';
    LoadingManager.setLoading(loadingKey, true);

    try {
      await this.delay(800);

      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedCoupons = mockApiCoupons.slice(startIndex, endIndex);

      const response = {
        success: true,
        data: paginatedCoupons,
        message: 'ดึงข้อมูลคูปองสำเร็จ',
        timestamp: new Date().toISOString(),
        pagination: {
          page,
          limit,
          total: mockApiCoupons.length,
          totalPages: Math.ceil(mockApiCoupons.length / limit),
        },
      };

      return response;
    } catch (error) {
      throw ApiTransformer.transformError(error);
    } finally {
      LoadingManager.setLoading(loadingKey, false);
    }
  }

  // Get coupon by ID
  static async getCouponById(id: string): Promise<ApiResponse<ApiCoupon>> {
    const loadingKey = `getCoupon_${id}`;
    LoadingManager.setLoading(loadingKey, true);

    try {
      await this.delay(500);

      const coupon = mockApiCoupons.find(c => c.id === id);

      if (!coupon) {
        throw {
          response: {
            status: 404,
            data: { message: 'ไม่พบคูปองที่ต้องการ' }
          }
        };
      }

      return ApiTransformer.transformResponse<ApiCoupon>(coupon);
    } catch (error) {
      throw ApiTransformer.transformError(error);
    } finally {
      LoadingManager.setLoading(loadingKey, false);
    }
  }

  // Use coupon
  static async useCoupon(id: string): Promise<ApiResponse<ApiCoupon>> {
    const loadingKey = `useCoupon_${id}`;
    LoadingManager.setLoading(loadingKey, true);

    try {
      await this.delay(1000);

      const couponIndex = mockApiCoupons.findIndex(c => c.id === id);

      if (couponIndex === -1) {
        throw {
          response: {
            status: 404,
            data: { message: 'ไม่พบคูปองที่ต้องการ' }
          }
        };
      }

      const coupon = mockApiCoupons[couponIndex];

      if (coupon.status !== 'AVAILABLE') {
        throw {
          response: {
            status: 400,
            data: { message: 'คูปองนี้ไม่สามารถใช้งานได้' }
          }
        };
      }

      // Check if coupon is expired
      const now = new Date();
      const expiryDate = new Date(coupon.expiryDate);

      if (now > expiryDate) {
        // Update status to expired
        mockApiCoupons[couponIndex] = {
          ...coupon,
          status: 'EXPIRED' as any,
        };

        throw {
          response: {
            status: 400,
            data: { message: 'คูปองนี้หมดอายุแล้ว' }
          }
        };
      }

      // Use coupon
      mockApiCoupons[couponIndex] = {
        ...coupon,
        status: 'USED' as any,
      };

      return ApiTransformer.transformResponse<ApiCoupon>({
        ...mockApiCoupons[couponIndex],
        message: 'ใช้คูปองสำเร็จ'
      });
    } catch (error) {
      throw ApiTransformer.transformError(error);
    } finally {
      LoadingManager.setLoading(loadingKey, false);
    }
  }

  // Get coupons by status
  static async getCouponsByStatus(status: string): Promise<ApiResponse<ApiCoupon[]>> {
    const loadingKey = `getCouponsByStatus_${status}`;
    LoadingManager.setLoading(loadingKey, true);

    try {
      await this.delay(600);

      const filteredCoupons = mockApiCoupons.filter(c => c.status === status.toUpperCase());

      return ApiTransformer.transformResponse<ApiCoupon[]>({
        data: filteredCoupons,
        message: `ดึงข้อมูลคูปองสถานะ ${status} สำเร็จ`
      });
    } catch (error) {
      throw ApiTransformer.transformError(error);
    } finally {
      LoadingManager.setLoading(loadingKey, false);
    }
  }

  // Get available coupons
  static async getAvailableCoupons(): Promise<ApiResponse<ApiCoupon[]>> {
    return this.getCouponsByStatus('AVAILABLE');
  }

  // Get used coupons
  static async getUsedCoupons(): Promise<ApiResponse<ApiCoupon[]>> {
    return this.getCouponsByStatus('USED');
  }

  // Get expired coupons
  static async getExpiredCoupons(): Promise<ApiResponse<ApiCoupon[]>> {
    return this.getCouponsByStatus('EXPIRED');
  }
}