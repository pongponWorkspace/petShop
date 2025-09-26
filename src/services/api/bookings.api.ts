import { mockApiBookings } from '@/src/data/mock';
import { ApiTransformer, LoadingManager } from '../middleware/api.middleware';
import {
  ApiBooking,
  ApiResponse,
  CreateBookingRequest,
  PaginatedResponse,
  UpdateBookingRequest
} from '../types/api.types';


// Bookings API
export class BookingsAPI {
  private static delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  // Get all bookings
  static async getBookings(page: number = 1, limit: number = 10): Promise<PaginatedResponse<ApiBooking>> {
    const loadingKey = 'getBookings';
    LoadingManager.setLoading(loadingKey, true);

    try {
      await this.delay(800);

      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedBookings = mockApiBookings.slice(startIndex, endIndex);

      const response = {
        success: true,
        data: paginatedBookings,
        message: 'ดึงข้อมูลการจองสำเร็จ',
        timestamp: new Date().toISOString(),
        pagination: {
          page,
          limit,
          total: mockApiBookings.length,
          totalPages: Math.ceil(mockApiBookings.length / limit),
        },
      };

      return response;
    } catch (error) {
      throw ApiTransformer.transformError(error);
    } finally {
      LoadingManager.setLoading(loadingKey, false);
    }
  }

  // Get booking by ID
  static async getBookingById(id: string): Promise<ApiResponse<ApiBooking>> {
    const loadingKey = `getBooking_${id}`;
    LoadingManager.setLoading(loadingKey, true);

    try {
      await this.delay(500);

      const booking = mockApiBookings.find(b => b.id === id);

      if (!booking) {
        throw {
          response: {
            status: 404,
            data: { message: 'ไม่พบการจองที่ต้องการ' }
          }
        };
      }

      return ApiTransformer.transformResponse<ApiBooking>(booking);
    } catch (error) {
      throw ApiTransformer.transformError(error);
    } finally {
      LoadingManager.setLoading(loadingKey, false);
    }
  }

  // Create new booking
  static async createBooking(bookingData: CreateBookingRequest): Promise<ApiResponse<ApiBooking>> {
    const loadingKey = 'createBooking';
    LoadingManager.setLoading(loadingKey, true);

    try {
      await this.delay(1200);

      // Generate booking ID
      const bookingId = '#' + bookingData.type.charAt(0) + 'B' +
        Math.random().toString(36).substring(2, 5).toUpperCase();

      const newBooking: ApiBooking = {
        id: Date.now().toString(),
        bookingId,
        type: bookingData.type,
        petName: 'สัตว์เลี้ยงของคุณ', // In real app, get from petId
        petBreed: 'ข้อมูลสายพันธุ์',
        date: bookingData.date,
        time: bookingData.time,
        status: 'PENDING' as any,
        notes: bookingData.notes,
        specialist: bookingData.serviceId ? 'ผู้เชี่ยวชาญ' : undefined,
        service: bookingData.serviceId ? 'บริการที่เลือก' : undefined,
        price: 1000, // Calculate based on service
      };

      // Add to mock data
      mockApiBookings.unshift(newBooking);

      return ApiTransformer.transformResponse<ApiBooking>({
        ...newBooking,
        message: 'สร้างการจองสำเร็จ'
      });
    } catch (error) {
      throw ApiTransformer.transformError(error);
    } finally {
      LoadingManager.setLoading(loadingKey, false);
    }
  }

  // Update booking
  static async updateBooking(id: string, updateData: UpdateBookingRequest): Promise<ApiResponse<ApiBooking>> {
    const loadingKey = `updateBooking_${id}`;
    LoadingManager.setLoading(loadingKey, true);

    try {
      await this.delay(1000);

      const bookingIndex = mockApiBookings.findIndex(b => b.id === id);

      if (bookingIndex === -1) {
        throw {
          response: {
            status: 404,
            data: { message: 'ไม่พบการจองที่ต้องการ' }
          }
        };
      }

      const currentBooking = mockApiBookings[bookingIndex];

      // Check if booking can be updated
      if (currentBooking.status === 'COMPLETED' || currentBooking.status === 'CANCELLED') {
        throw {
          response: {
            status: 400,
            data: { message: 'ไม่สามารถแก้ไขการจองที่เสร็จสิ้นหรือยกเลิกแล้ว' }
          }
        };
      }

      // Update booking
      mockApiBookings[bookingIndex] = {
        ...currentBooking,
        ...updateData,
      };

      return ApiTransformer.transformResponse<ApiBooking>({
        ...mockApiBookings[bookingIndex],
        message: 'อัปเดตการจองสำเร็จ'
      });
    } catch (error) {
      throw ApiTransformer.transformError(error);
    } finally {
      LoadingManager.setLoading(loadingKey, false);
    }
  }

  // Cancel booking
  static async cancelBooking(id: string): Promise<ApiResponse<ApiBooking>> {
    const loadingKey = `cancelBooking_${id}`;
    LoadingManager.setLoading(loadingKey, true);

    try {
      await this.delay(1000);

      const bookingIndex = mockApiBookings.findIndex(b => b.id === id);

      if (bookingIndex === -1) {
        throw {
          response: {
            status: 404,
            data: { message: 'ไม่พบการจองที่ต้องการ' }
          }
        };
      }

      const booking = mockApiBookings[bookingIndex];

      if (booking.status === 'COMPLETED') {
        throw {
          response: {
            status: 400,
            data: { message: 'ไม่สามารถยกเลิกการจองที่เสร็จสิ้นแล้ว' }
          }
        };
      }

      // Cancel booking
      mockApiBookings[bookingIndex] = {
        ...booking,
        status: 'CANCELLED' as any,
      };

      return ApiTransformer.transformResponse<ApiBooking>({
        ...mockApiBookings[bookingIndex],
        message: 'ยกเลิกการจองสำเร็จ'
      });
    } catch (error) {
      throw ApiTransformer.transformError(error);
    } finally {
      LoadingManager.setLoading(loadingKey, false);
    }
  }

  // Get bookings by status
  static async getBookingsByStatus(status: string): Promise<ApiResponse<ApiBooking[]>> {
    const loadingKey = `getBookingsByStatus_${status}`;
    LoadingManager.setLoading(loadingKey, true);

    try {
      await this.delay(600);

      const filteredBookings = mockApiBookings.filter(b => b.status === status.toUpperCase());

      return ApiTransformer.transformResponse<ApiBooking[]>({
        data: filteredBookings,
        message: `ดึงข้อมูลการจองสถานะ ${status} สำเร็จ`
      });
    } catch (error) {
      throw ApiTransformer.transformError(error);
    } finally {
      LoadingManager.setLoading(loadingKey, false);
    }
  }

  // Get bookings by type
  static async getBookingsByType(type: string): Promise<ApiResponse<ApiBooking[]>> {
    const loadingKey = `getBookingsByType_${type}`;
    LoadingManager.setLoading(loadingKey, true);

    try {
      await this.delay(600);

      const filteredBookings = mockApiBookings.filter(b => b.type === type.toUpperCase());

      return ApiTransformer.transformResponse<ApiBooking[]>({
        data: filteredBookings,
        message: `ดึงข้อมูลการจองประเภท ${type} สำเร็จ`
      });
    } catch (error) {
      throw ApiTransformer.transformError(error);
    } finally {
      LoadingManager.setLoading(loadingKey, false);
    }
  }
}