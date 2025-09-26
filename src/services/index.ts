// Main services export file
export * from './api/client';
export * from './types/api.types';
export * from './middleware/api.middleware';

// Individual API exports
export { ServicesAPI } from './api/services.api';
export { BookingsAPI } from './api/bookings.api';
export { CouponsAPI } from './api/coupons.api';
export { PetsAPI } from './api/pets.api';
export { HotelsAPI } from './api/hotels.api';
export { HospitalAPI } from './api/hospital.api';
export { ContentAPI } from './api/content.api';

// Utility exports
export { LoadingManager } from './middleware/api.middleware';