/**
 * Coupon Detail Feature Example
 *
 * This example demonstrates the clean architecture pattern implemented for the coupon detail feature:
 * - Separation of concerns between Screen (View), Controller (Logic), and Styles
 * - API integration with proper error handling and loading states
 * - TypeScript typing throughout
 * - Mock API responses with correct types
 *
 * Architecture:
 * ├── coupon-detail-screen.tsx    (Presentation Layer)
 * ├── coupon-detail-controller.tsx (Business Logic Layer)
 * ├── coupon-detail-style.ts      (Styling Layer)
 * └── index.ts                    (Feature Exports)
 */

import React from 'react';
import { CouponDetailScreen } from '@/src/features/coupon-detail';

/**
 * Usage Example 1: Direct Import and Use
 *
 * The screen component can be used directly in your app routing.
 * It automatically handles:
 * - Loading coupon details by ID from URL params
 * - Displaying loading states
 * - Error handling with retry functionality
 * - Coupon usage with confirmation dialog
 * - Status-based UI rendering (available/used/expired)
 */
export default function ExampleUsage() {
  return <CouponDetailScreen />;
}

/**
 * Usage Example 2: Custom Implementation with Controller
 *
 * If you need more control or want to use the business logic
 * in a different component, you can use the controller directly:
 */

import { useCouponDetailController } from '@/src/features/coupon-detail';
import { View, Text, Button } from 'react-native';

export function CustomCouponDetailComponent() {
  const { state, actions, helpers } = useCouponDetailController();

  if (state.loading) {
    return <Text>Loading...</Text>;
  }

  if (!state.coupon) {
    return (
      <View>
        <Text>Coupon not found</Text>
        <Button title="Retry" onPress={actions.loadCouponDetail} />
      </View>
    );
  }

  return (
    <View>
      <Text>{state.coupon.title}</Text>
      <Text>{state.coupon.description}</Text>
      <Text>Status: {helpers.getStatusText(state.coupon.status)}</Text>

      {helpers.isUsable() && (
        <Button
          title="Use Coupon"
          onPress={actions.useCoupon}
          disabled={state.usingCoupon}
        />
      )}

      <Button title="Go Back" onPress={actions.goBack} />
    </View>
  );
}

/**
 * API Integration Details:
 *
 * The feature uses the existing API service architecture:
 * - api.coupons.getCouponById(id) - Fetches coupon details
 * - api.coupons.useCoupon(id) - Uses the coupon
 *
 * Mock API responses follow the ApiCoupon type:
 * interface ApiCoupon {
 *   id: string;
 *   title: string;
 *   description: string;
 *   imageUrl?: string;
 *   discountType: 'PERCENTAGE' | 'FIXED_AMOUNT';
 *   discountValue: number;
 *   status: 'AVAILABLE' | 'USED' | 'EXPIRED';
 *   purchaseDate: string;
 *   expiryDate: string;
 *   terms?: string;
 *   color: string;
 * }
 *
 * Error Handling:
 * - Network errors are handled by the API middleware
 * - Component errors are handled with retry functionality
 * - Loading states are managed by the useApi hook
 * - Success/error messages use the error modal system
 *
 * Internationalization:
 * - All text is localized using the useLanguage hook
 * - Supports both English and Thai languages
 * - Date formatting respects locale settings
 *
 * Navigation:
 * - Expects 'id' parameter from URL (expo-router)
 * - Handles back navigation
 * - Works with the existing app routing structure
 */