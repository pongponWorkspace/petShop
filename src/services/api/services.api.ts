import { mockApiServices } from '@/src/data/mock';
import { ApiTransformer, LoadingManager } from '../middleware/api.middleware';
import {
  ApiResponse,
  ApiService,
  PaginatedResponse
} from '../types/api.types';

// Services API
export class ServicesAPI {
  private static delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  // Get all services
  static async getServices(page: number = 1, limit: number = 10): Promise<PaginatedResponse<ApiService>> {
    const loadingKey = 'getServices';
    LoadingManager.setLoading(loadingKey, true);

    try {
      // Simulate network delay
      await this.delay(800);

      // Simulate pagination
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedServices = mockApiServices.slice(startIndex, endIndex);

      const response = {
        success: true,
        data: paginatedServices,
        message: 'ดึงข้อมูลบริการสำเร็จ',
        timestamp: new Date().toISOString(),
        pagination: {
          page,
          limit,
          total: mockApiServices.length,
          totalPages: Math.ceil(mockApiServices.length / limit),
        },
      };

      return response;
    } catch (error) {
      throw ApiTransformer.transformError(error);
    } finally {
      LoadingManager.setLoading(loadingKey, false);
    }
  }

  // Get service by ID
  static async getServiceById(id: string): Promise<ApiResponse<ApiService>> {
    const loadingKey = `getService_${id}`;
    LoadingManager.setLoading(loadingKey, true);

    try {
      await this.delay(500);

      const service = mockApiServices.find(s => s.id === id);

      if (!service) {
        throw {
          response: {
            status: 404,
            data: { message: 'ไม่พบบริการที่ต้องการ' }
          }
        };
      }

      return ApiTransformer.transformResponse<ApiService>(service);
    } catch (error) {
      throw ApiTransformer.transformError(error);
    } finally {
      LoadingManager.setLoading(loadingKey, false);
    }
  }

  // Use service
  static async useService(id: string): Promise<ApiResponse<ApiService>> {
    const loadingKey = `useService_${id}`;
    LoadingManager.setLoading(loadingKey, true);

    try {
      await this.delay(1000);

      const serviceIndex = mockApiServices.findIndex(s => s.id === id);

      if (serviceIndex === -1) {
        throw {
          response: {
            status: 404,
            data: { message: 'ไม่พบบริการที่ต้องการ' }
          }
        };
      }

      const service = mockApiServices[serviceIndex];

      if (service.status !== 'READY_TO_USE') {
        throw {
          response: {
            status: 400,
            data: { message: 'ไม่สามารถใช้บริการนี้ได้ในขณะนี้' }
          }
        };
      }

      // Update service status
      mockApiServices[serviceIndex] = {
        ...service,
        status: 'USED' as any,
      };

      return ApiTransformer.transformResponse<ApiService>({
        ...mockApiServices[serviceIndex],
        message: 'ใช้บริการสำเร็จ'
      });
    } catch (error) {
      throw ApiTransformer.transformError(error);
    } finally {
      LoadingManager.setLoading(loadingKey, false);
    }
  }

  // Get services by status
  static async getServicesByStatus(status: string): Promise<ApiResponse<ApiService[]>> {
    const loadingKey = `getServicesByStatus_${status}`;
    LoadingManager.setLoading(loadingKey, true);

    try {
      await this.delay(600);

      const filteredServices = mockApiServices.filter(s => s.status === status.toUpperCase());

      return ApiTransformer.transformResponse<ApiService[]>({
        data: filteredServices,
        message: `ดึงข้อมูลบริการสถานะ ${status} สำเร็จ`
      });
    } catch (error) {
      throw ApiTransformer.transformError(error);
    } finally {
      LoadingManager.setLoading(loadingKey, false);
    }
  }
}