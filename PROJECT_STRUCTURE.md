# petshop Mobile App - New Project Structure

## Overview
This document outlines the new organized project structure that separates concerns, groups related functionality, and improves maintainability.

## New Directory Structure

```
src/
├── data/                           # Data layer
│   ├── types/                      # Type definitions
│   │   └── index.ts               # All TypeScript interfaces & enums
│   ├── mock/                       # Mock data organized by category
│   │   ├── index.ts               # Central export file
│   │   ├── pets.ts                # Pet-related mock data
│   │   ├── hotels.ts              # Hotel & room mock data
│   │   ├── news.ts                # News & educational content
│   │   ├── rewards.ts             # Coupons & user services
│   │   ├── bookings.ts            # Booking-related data
│   │   └── ui.ts                  # UI elements (quick actions, etc.)
│   └── constants/                  # App constants
│
├── features/                       # Feature-based organization
│   ├── hotel/                      # Hotel booking feature
│   │   ├── screens/               # Hotel-related screens
│   │   │   ├── HotelMainScreen.tsx
│   │   │   ├── HotelRoomsScreen.tsx
│   │   │   ├── RoomDetailScreen.tsx
│   │   │   └── HotelBookingScreen.tsx
│   │   ├── components/            # Hotel-specific components
│   │   │   ├── RoomCard.tsx
│   │   │   ├── BookingForm.tsx
│   │   │   └── ImageGallery.tsx
│   │   └── styles/                # Hotel feature styles
│   │       ├── HotelMainScreen.styles.ts
│   │       ├── HotelRoomsScreen.styles.ts
│   │       └── components.styles.ts
│   │
│   ├── hospital/                   # Hospital booking feature
│   │   ├── screens/
│   │   ├── components/
│   │   └── styles/
│   │
│   ├── home/                       # Home dashboard feature
│   │   ├── screens/
│   │   │   └── HomeScreen.tsx
│   │   ├── components/            # Existing home components
│   │   │   ├── QuickActions.tsx
│   │   │   ├── NewsCarousel.tsx
│   │   │   ├── EducationalContent.tsx
│   │   │   ├── CouponSection.tsx
│   │   │   ├── BookingSection.tsx
│   │   │   └── ServicesSection.tsx
│   │   └── styles/
│   │       └── HomeScreen.styles.ts
│   │
│   ├── pets/                       # Pet management feature
│   │   ├── screens/
│   │   ├── components/
│   │   └── styles/
│   │
│   ├── profile/                    # User profile feature
│   │   ├── screens/
│   │   ├── components/
│   │   └── styles/
│   │
│   └── services/                   # Services feature
│       ├── screens/
│       ├── components/
│       └── styles/
│
├── shared/                         # Shared utilities and components
│   ├── components/                 # Reusable UI components
│   │   ├── ui/                    # Basic UI components
│   │   ├── common/                # Common complex components
│   │   └── forms/                 # Form-related components
│   ├── hooks/                      # Custom React hooks
│   ├── utils/                      # Utility functions
│   └── styles/                     # Shared styles
│       ├── commonStyles.ts        # Common style definitions
│       └── theme.ts               # Theme-related styles
│
└── app/                           # App-level screens (bridges to features)
    └── screens/
        └── TabsIndex.tsx          # Bridge to HomeScreen
```

## Key Improvements

### 1. **Separation of Concerns**
- **Logic**: Business logic separated from UI components
- **Styles**: All styles extracted to dedicated `.styles.ts` files
- **Data**: Mock data organized by domain/category
- **Types**: Centralized type definitions

### 2. **Feature-Based Architecture**
- Each major feature (hotel, hospital, home, etc.) has its own folder
- Self-contained features with screens, components, and styles
- Easy to find and maintain related functionality

### 3. **Data Organization**
- Mock data split into logical categories
- Type definitions centralized
- Easy to extend and maintain data structures

### 4. **Shared Resources**
- Common styles and utilities available across features
- Reusable components in shared folder
- Consistent design system implementation

## Migration Benefits

### **Maintainability**
- Easier to locate specific functionality
- Clearer separation between features
- Reduced file sizes with focused responsibilities

### **Scalability**
- New features can follow the established pattern
- Easy to add new screens/components to existing features
- Shared resources prevent code duplication

### **Developer Experience**
- Clear file organization improves navigation
- Consistent patterns across features
- Easier onboarding for new developers

### **Testing**
- Features can be tested in isolation
- Mock data is organized and easy to modify
- Component testing is more straightforward

## Usage Examples

### **Importing Mock Data**
```typescript
// Before
import { mockPets, mockHotels } from '@/services/mockData';

// After
import { mockPets, mockHotels } from '@/src/data/mock';
```

### **Using Shared Styles**
```typescript
// In any component
import { commonStyles } from '@/src/shared/styles/commonStyles';

// Combine with component-specific styles
<View style={[commonStyles.container, localStyles.customContainer]} />
```

### **Feature Components**
```typescript
// Hotel feature component
import HotelMainScreen from '@/src/features/hotel/screens/HotelMainScreen';

// Home feature component
import HomeScreen from '@/src/features/home/screens/HomeScreen';
```

## Implementation Notes

1. **Existing files** remain in their current locations to maintain app functionality
2. **New structure** can be implemented incrementally
3. **Import paths** use absolute imports for consistency
4. **Style naming** follows pattern: `featureNameStyles` or `componentNameStyles`

## Next Steps

1. Complete migration of remaining features (hospital, pets, profile, services)
2. Update all import statements to use new structure
3. Move remaining common components to shared folder
4. Establish testing structure following the same pattern
5. Update documentation and development guidelines