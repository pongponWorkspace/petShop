import { EducationalContent, NewsItem } from "../types/common";


export const mockNewsItems: NewsItem[] = [
  {
    id: '1',
    title: 'New Veterinary Clinic Partnership',
    summary: 'We\'ve partnered with CityVet to provide comprehensive health services.',
    date: '2024-09-20',
    type: 'news',
    imageUrl: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=400&h=200&fit=crop',
  },
  {
    id: '2',
    title: 'Holiday Hours Announcement',
    summary: 'Special operating hours during the upcoming holiday season.',
    date: '2024-09-18',
    type: 'announcement',
    imageUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=200&fit=crop',
  },
  {
    id: '3',
    title: 'New Premium Grooming Services',
    summary: 'Introducing luxury spa treatments for your beloved pets.',
    date: '2024-09-15',
    type: 'news',
    imageUrl: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=200&fit=crop',
  },
];

export const mockEducationalContent: EducationalContent[] = [
  {
    id: '1',
    title: 'Essential Vaccinations for Puppies',
    description: 'Learn about the critical vaccination schedule every puppy needs for optimal health.',
    category: 'health',
    author: 'Dr. Sarah Johnson',
    imageUrl: 'https://images.unsplash.com/photo-1551717743-49959800b1f6?w=300&h=200&fit=crop',
  },
  {
    id: '2',
    title: 'Basic Commands Every Dog Should Know',
    description: 'Master the fundamental training commands that will strengthen your bond with your pet.',
    category: 'training',
    author: 'Mike Rodriguez',
    imageUrl: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=300&h=200&fit=crop',
  },
  {
    id: '3',
    title: 'Nutrition Guide for Senior Cats',
    description: 'Understanding the dietary needs of aging cats and how to keep them healthy.',
    category: 'nutrition',
    author: 'Dr. Emily Chen',
    imageUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=300&h=200&fit=crop',
  },
  {
    id: '4',
    title: 'DIY Pet Grooming at Home',
    description: 'Professional grooming tips you can use to keep your pet looking great between visits.',
    category: 'grooming',
    author: 'Lisa Thompson',
    imageUrl: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=300&h=200&fit=crop',
  },
];