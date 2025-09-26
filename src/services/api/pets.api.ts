import { mockApiPets } from '@/src/data/mock';
import { ApiTransformer, LoadingManager } from '../middleware/api.middleware';
import {
  ApiPet,
  ApiResponse,
  PaginatedResponse
} from '../types/api.types';

// Pets API
export class PetsAPI {
  private static delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  // Create new pet
  static async createPet(petData: any): Promise<ApiResponse<ApiPet>> {
    const loadingKey = 'createPet';
    LoadingManager.setLoading(loadingKey, true);

    try {
      await this.delay(1000);

      // Create new pet with mock ID
      const newPet: ApiPet = {
        id: `pet_${Date.now()}`,
        name: petData.name,
        type: petData.type,
        breed: petData.breed,
        age: petData.age,
        weight: petData.weight,
        imageUrl: petData.imageUrl,
        vaccinated: petData.vaccinated || false,
        medicalNotes: petData.medicalNotes
      };

      // Add to mock data
      mockApiPets.push(newPet);

      const response = {
        success: true,
        data: newPet,
        message: 'เพิ่มสัตว์เลี้ยงสำเร็จ',
        timestamp: new Date().toISOString(),
      };

      return response;
    } catch (error) {
      console.error('PetsAPI.createPet error:', error);
      throw error;
    } finally {
      LoadingManager.setLoading(loadingKey, false);
    }
  }

  // Get all pets
  static async getPets(page: number = 1, limit: number = 10): Promise<PaginatedResponse<ApiPet>> {
    const loadingKey = 'getPets';
    LoadingManager.setLoading(loadingKey, true);

    try {
      await this.delay(600);

      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedPets = mockApiPets.slice(startIndex, endIndex);

      const response = {
        success: true,
        data: paginatedPets,
        message: 'ดึงข้อมูลสัตว์เลี้ยงสำเร็จ',
        timestamp: new Date().toISOString(),
        pagination: {
          page,
          limit,
          total: mockApiPets.length,
          totalPages: Math.ceil(mockApiPets.length / limit),
        },
      };

      return response;
    } catch (error) {
      throw ApiTransformer.transformError(error);
    } finally {
      LoadingManager.setLoading(loadingKey, false);
    }
  }

  // Get pet by ID
  static async getPetById(id: string): Promise<ApiResponse<ApiPet>> {
    const loadingKey = `getPet_${id}`;
    LoadingManager.setLoading(loadingKey, true);

    try {
      await this.delay(400);

      const pet = mockApiPets.find(p => p.id === id);

      if (!pet) {
        throw {
          response: {
            status: 404,
            data: { message: 'ไม่พบสัตว์เลี้ยงที่ต้องการ' }
          }
        };
      }

      return ApiTransformer.transformResponse<ApiPet>(pet);
    } catch (error) {
      throw ApiTransformer.transformError(error);
    } finally {
      LoadingManager.setLoading(loadingKey, false);
    }
  }

  // Get pets by type
  static async getPetsByType(type: string): Promise<ApiResponse<ApiPet[]>> {
    const loadingKey = `getPetsByType_${type}`;
    LoadingManager.setLoading(loadingKey, true);

    try {
      await this.delay(500);

      const filteredPets = mockApiPets.filter(p => p.type === type.toUpperCase());

      return ApiTransformer.transformResponse<ApiPet[]>({
        data: filteredPets,
        message: `ดึงข้อมูลสัตว์เลี้ยงประเภท ${type} สำเร็จ`
      });
    } catch (error) {
      throw ApiTransformer.transformError(error);
    } finally {
      LoadingManager.setLoading(loadingKey, false);
    }
  }

  // Get dogs
  static async getDogs(): Promise<ApiResponse<ApiPet[]>> {
    return this.getPetsByType('DOG');
  }

  // Get cats
  static async getCats(): Promise<ApiResponse<ApiPet[]>> {
    return this.getPetsByType('CAT');
  }


  // Update pet
  static async updatePet(id: string, petData: Partial<ApiPet>): Promise<ApiResponse<ApiPet>> {
    const loadingKey = `updatePet_${id}`;
    LoadingManager.setLoading(loadingKey, true);

    try {
      await this.delay(800);

      const petIndex = mockApiPets.findIndex(p => p.id === id);

      if (petIndex === -1) {
        throw {
          response: {
            status: 404,
            data: { message: 'ไม่พบสัตว์เลี้ยงที่ต้องการ' }
          }
        };
      }

      // Update pet
      mockApiPets[petIndex] = {
        ...mockApiPets[petIndex],
        ...petData,
      };

      return ApiTransformer.transformResponse<ApiPet>({
        ...mockApiPets[petIndex],
        message: 'อัปเดตข้อมูลสัตว์เลี้ยงสำเร็จ'
      });
    } catch (error) {
      throw ApiTransformer.transformError(error);
    } finally {
      LoadingManager.setLoading(loadingKey, false);
    }
  }

  // Delete pet
  static async deletePet(id: string): Promise<ApiResponse<null>> {
    const loadingKey = `deletePet_${id}`;
    LoadingManager.setLoading(loadingKey, true);

    try {
      await this.delay(600);

      const petIndex = mockApiPets.findIndex(p => p.id === id);

      if (petIndex === -1) {
        throw {
          response: {
            status: 404,
            data: { message: 'ไม่พบสัตว์เลี้ยงที่ต้องการ' }
          }
        };
      }

      // Remove from mock data
      mockApiPets.splice(petIndex, 1);

      return ApiTransformer.transformResponse<null>({
        data: null,
        message: 'ลบสัตว์เลี้ยงสำเร็จ'
      });
    } catch (error) {
      throw ApiTransformer.transformError(error);
    } finally {
      LoadingManager.setLoading(loadingKey, false);
    }
  }
}