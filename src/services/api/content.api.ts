import {
  ApiResponse,
} from '../types/api.types';
import { LoadingManager } from '../middleware/api.middleware';

export interface ApiArticle {
  id: string;
  title: string;
  description: string;
  category: 'health' | 'training' | 'nutrition' | 'grooming';
  imageUrl: string;
  fullContent?: string;
}

// Mock educational content
const mockArticles: ApiArticle[] = [
  {
    id: '1',
    title: 'Essential Vaccinations for Puppies',
    description: 'Learn about the critical vaccination schedule every puppy needs for optimal health.',
    category: 'health',
    imageUrl: 'https://images.unsplash.com/photo-1551717743-49959800b1f6?w=300&h=200&fit=crop',
    fullContent: `Vaccinating your puppy is one of the most important things you can do to ensure their long-term health and well-being. Puppies are born with some immunity from their mother's milk, but this protection begins to fade between 6-8 weeks of age.

Core Vaccines for Puppies:

1. DHPP (Distemper, Hepatitis, Parvovirus, Parainfluenza)
   - First shot: 6-8 weeks
   - Second shot: 10-12 weeks
   - Third shot: 14-16 weeks

2. Rabies Vaccine
   - First shot: 12-16 weeks
   - Booster: Annually or every 3 years (depending on local laws)

3. Optional Vaccines (based on lifestyle and risk):
   - Bordetella (Kennel Cough)
   - Lyme Disease
   - Canine Influenza

Important Notes:
- Always consult with your veterinarian for a personalized vaccination schedule
- Keep your puppy away from unvaccinated dogs until fully vaccinated
- Monitor for any adverse reactions after vaccination
- Maintain annual boosters as recommended by your vet

Remember, vaccines are much safer and more cost-effective than treating the diseases they prevent. A proper vaccination schedule will give your puppy the best start in life.`
  },
  {
    id: '2',
    title: 'Understanding Cat Behavior',
    description: 'Decode your feline friend\'s mysterious behaviors and communication signals.',
    category: 'training',
    imageUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=300&h=200&fit=crop',
    fullContent: `Cats communicate in fascinating ways that often leave their human companions puzzled. Understanding these behaviors can strengthen your bond and improve your cat's wellbeing.

Common Cat Behaviors Explained:

1. Purring
   - Usually indicates contentment
   - Can also occur when stressed or in pain
   - Frequency may have healing properties

2. Kneading
   - Mimics nursing behavior from kittenhood
   - Shows affection and comfort
   - Often accompanied by purring

3. Head Butting and Rubbing
   - Scent marking behavior
   - Shows affection and ownership
   - Transfers pheromones from scent glands

4. Tail Position
   - High and curved: Happy and confident
   - Low or tucked: Fearful or submissive
   - Puffed up: Scared or aggressive
   - Twitching: Excited or irritated

5. Vocalizations
   - Meowing: Primarily for human communication
   - Chirping: Hunting instinct or excitement
   - Hissing: Fear or aggression warning

Understanding these behaviors helps create a more harmonious relationship with your feline companion.`
  }
];

// Content API
export class ContentAPI {
  private static delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  // Get article by ID
  static async getArticleById(articleId: string): Promise<ApiResponse<ApiArticle>> {
    const loadingKey = 'getArticleById';
    LoadingManager.setLoading(loadingKey, true);

    try {
      await this.delay(600);

      const article = mockArticles.find(a => a.id === articleId);
      if (!article) {
        throw new Error('Article not found');
      }

      const response = {
        success: true,
        data: article,
        message: 'ดึงข้อมูลบทความสำเร็จ',
        timestamp: new Date().toISOString(),
      };

      return response;
    } catch (error) {
      console.error('ContentAPI.getArticleById error:', error);
      throw error;
    } finally {
      LoadingManager.setLoading(loadingKey, false);
    }
  }

  // Get all articles
  static async getArticles(): Promise<ApiResponse<ApiArticle[]>> {
    const loadingKey = 'getArticles';
    LoadingManager.setLoading(loadingKey, true);

    try {
      await this.delay(800);

      const response = {
        success: true,
        data: mockArticles,
        message: 'ดึงข้อมูลบทความทั้งหมดสำเร็จ',
        timestamp: new Date().toISOString(),
      };

      return response;
    } catch (error) {
      console.error('ContentAPI.getArticles error:', error);
      throw error;
    } finally {
      LoadingManager.setLoading(loadingKey, false);
    }
  }
}