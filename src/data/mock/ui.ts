import { QuickAction } from '../types';

export const mockQuickActions: QuickAction[] = [
  {
    id: '1',
    title: 'Pet Hospital',
    icon: 'heart.fill',
    color: 'error',
    route: '/pet-hospital'
  },
  {
    id: '2',
    title: 'Pet Hotel',
    icon: 'house.fill',
    color: 'info',
    route: '/pet-hotel'
  },
  {
    id: '3',
    title: 'Bath & Grooming',
    icon: 'star.fill',
    color: 'warning',
    route: '/bath-grooming'
  },
  {
    id: '4',
    title: 'Shop',
    icon: 'bag.fill',
    color: 'secondary',
    route: 'external'
  }
];