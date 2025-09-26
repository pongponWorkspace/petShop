import { UserService } from '../types/index';
import { ServiceStatus } from '../types/common';

export const mockUserServices: UserService[] = [
  {
    id: '2',
    serviceId: 'service-2',
    serviceName: 'Pet Boarding Service',
    description: 'Professional pet care while you travel with 24/7 supervision and comfort',
    status: 'ready_to_use',
    purchaseDate: '2024-09-18',
    expiryDate: '2024-12-18',
    imageUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=300&fit=crop'
  },
  {
    id: '3',
    serviceId: 'service-3',
    serviceName: 'Health Checkup Package',
    description: 'Comprehensive health examination for pets with experienced veterinarians',
    status: 'used',
    purchaseDate: '2024-08-15',
    expiryDate: '2024-11-15',
    imageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop'
  },
  {
    id: '4',
    serviceId: 'service-4',
    serviceName: 'Dog Training Session',
    description: 'Basic obedience training and behavior correction with certified trainers',
    status: 'ready_to_use',
    purchaseDate: '2024-09-25',
    expiryDate: '2024-12-25',
    imageUrl: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=300&fit=crop'
  },
  {
    id: '5',
    serviceId: 'service-5',
    serviceName: 'Pet Spa Package',
    description: 'Relaxing spa treatment with aromatherapy and massage for your pet',
    status: 'expired',
    purchaseDate: '2024-06-10',
    expiryDate: '2024-09-10',
    imageUrl: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=400&h=300&fit=crop'
  }
];