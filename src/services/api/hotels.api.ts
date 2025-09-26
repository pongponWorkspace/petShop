import { mockApiHotels, mockApiRoomTypes } from '@/src/data/mock';
import { ApiTransformer, LoadingManager } from '../middleware/api.middleware';
import {
  ApiHotel,
  ApiResponse,
  ApiRoomType,
  PaginatedResponse
} from '../types/api.types';

// Hotels API
export class HotelsAPI {
  private static delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  // Get all hotels
  static async getHotels(page: number = 1, limit: number = 10): Promise<PaginatedResponse<ApiHotel>> {
    const loadingKey = 'getHotels';
    LoadingManager.setLoading(loadingKey, true);

    try {
      await this.delay(700);

      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedHotels = mockApiHotels.slice(startIndex, endIndex);

      const response = {
        success: true,
        data: paginatedHotels,
        message: 'ดึงข้อมูลโรงแรมสำเร็จ',
        timestamp: new Date().toISOString(),
        pagination: {
          page,
          limit,
          total: mockApiHotels.length,
          totalPages: Math.ceil(mockApiHotels.length / limit),
        },
      };

      return response;
    } catch (error) {
      throw ApiTransformer.transformError(error);
    } finally {
      LoadingManager.setLoading(loadingKey, false);
    }
  }

  // Get hotel by ID
  static async getHotelById(id: string): Promise<ApiResponse<ApiHotel>> {
    const loadingKey = `getHotel_${id}`;
    LoadingManager.setLoading(loadingKey, true);

    try {
      await this.delay(500);

      const hotel = mockApiHotels.find(h => h.id === id);

      if (!hotel) {
        throw {
          response: {
            status: 404,
            data: { message: 'ไม่พบโรงแรมที่ต้องการ' }
          }
        };
      }

      return ApiTransformer.transformResponse<ApiHotel>(hotel);
    } catch (error) {
      throw ApiTransformer.transformError(error);
    } finally {
      LoadingManager.setLoading(loadingKey, false);
    }
  }

  // Get hotels by pet type
  static async getHotelsByPetType(petType: string): Promise<ApiResponse<ApiHotel[]>> {
    const loadingKey = `getHotelsByPetType_${petType}`;
    LoadingManager.setLoading(loadingKey, true);

    try {
      await this.delay(600);

      const filteredHotels = mockApiHotels.filter(h => h.petType === petType.toUpperCase());

      return ApiTransformer.transformResponse<ApiHotel[]>({
        data: filteredHotels,
        message: `ดึงข้อมูลโรงแรมสำหรับ ${petType} สำเร็จ`
      });
    } catch (error) {
      throw ApiTransformer.transformError(error);
    } finally {
      LoadingManager.setLoading(loadingKey, false);
    }
  }

  // Get room types for a hotel
  static async getRoomTypes(hotelId: string): Promise<ApiResponse<ApiRoomType[]>> {
    const loadingKey = `getRoomTypes_${hotelId}`;
    LoadingManager.setLoading(loadingKey, true);

    try {
      await this.delay(600);

      const roomTypes = mockApiRoomTypes.filter(r => r.hotelId === hotelId);

      if (roomTypes.length === 0) {
        throw {
          response: {
            status: 404,
            data: { message: 'ไม่พบห้องพักสำหรับโรงแรมนี้' }
          }
        };
      }

      return ApiTransformer.transformResponse<ApiRoomType[]>({
        data: roomTypes,
        message: 'ดึงข้อมูลประเภทห้องพักสำเร็จ'
      });
    } catch (error) {
      throw ApiTransformer.transformError(error);
    } finally {
      LoadingManager.setLoading(loadingKey, false);
    }
  }

  // Get room type by ID
  static async getRoomTypeById(id: string): Promise<ApiResponse<ApiRoomType>> {
    const loadingKey = `getRoomType_${id}`;
    LoadingManager.setLoading(loadingKey, true);

    try {
      await this.delay(400);

      const roomType = mockApiRoomTypes.find(r => r.id === id);

      if (!roomType) {
        throw {
          response: {
            status: 404,
            data: { message: 'ไม่พบประเภทห้องพักที่ต้องการ' }
          }
        };
      }

      return ApiTransformer.transformResponse<ApiRoomType>(roomType);
    } catch (error) {
      throw ApiTransformer.transformError(error);
    } finally {
      LoadingManager.setLoading(loadingKey, false);
    }
  }

  // Check room availability
  static async checkRoomAvailability(
    roomTypeId: string,
    checkIn: string,
    checkOut: string
  ): Promise<ApiResponse<{ available: boolean; price: number }>> {
    const loadingKey = `checkAvailability_${roomTypeId}`;
    LoadingManager.setLoading(loadingKey, true);

    try {
      await this.delay(800);

      const roomType = mockApiRoomTypes.find(r => r.id === roomTypeId);

      if (!roomType) {
        throw {
          response: {
            status: 404,
            data: { message: 'ไม่พบประเภทห้องพักที่ต้องการ' }
          }
        };
      }

      // Simulate availability check
      const available = roomType.available && Math.random() > 0.2; // 80% chance available

      return ApiTransformer.transformResponse<{ available: boolean; price: number }>({
        data: {
          available,
          price: roomType.price
        },
        message: available ? 'ห้องพักว่างในช่วงเวลาที่เลือก' : 'ห้องพักไม่ว่างในช่วงเวลาที่เลือก'
      });
    } catch (error) {
      throw ApiTransformer.transformError(error);
    } finally {
      LoadingManager.setLoading(loadingKey, false);
    }
  }

  // Create hotel booking
  static async createHotelBooking(bookingData: {
    hotelId: string;
    roomTypeId: string;
    petIds: string[];
    checkInDate: string;
    checkOutDate: string;
    nights: number;
    totalPrice: number;
  }): Promise<ApiResponse<any>> {
    const loadingKey = 'createHotelBooking';
    LoadingManager.setLoading(loadingKey, true);

    try {
      await this.delay(1200);

      // Generate booking ID
      const bookingId = '#HB' + Math.random().toString(36).substring(2, 6).toUpperCase();

      const newBooking = {
        id: Date.now().toString(),
        bookingId,
        hotelId: bookingData.hotelId,
        roomTypeId: bookingData.roomTypeId,
        petIds: bookingData.petIds,
        checkInDate: bookingData.checkInDate,
        checkOutDate: bookingData.checkOutDate,
        nights: bookingData.nights,
        totalPrice: bookingData.totalPrice,
        status: 'CONFIRMED' as any,
        createdAt: new Date().toISOString(),
      };

      return ApiTransformer.transformResponse<any>({
        ...newBooking,
        message: 'จองโรงแรมสำเร็จ'
      });
    } catch (error) {
      throw ApiTransformer.transformError(error);
    } finally {
      LoadingManager.setLoading(loadingKey, false);
    }
  }
}