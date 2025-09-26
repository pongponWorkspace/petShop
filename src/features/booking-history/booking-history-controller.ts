import { useLanguage } from "@/src/contexts/LanguageContext";
import { mockBookings } from "@/src/data/mock/bookings";
import { Booking } from "@/src/data/types";
import { BookingStatus } from "@/src/data/types/common";
import { Colors } from "@/src/shared/constants/theme";
import { useEffect, useState } from "react";


export function useBookingHistoryController() {
    const { t } = useLanguage();
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [selectedFilter, setSelectedFilter] = useState<BookingStatus>(BookingStatus.UPCOMING);

    const filters = [BookingStatus.UPCOMING, BookingStatus.COMPLETED];
    

    useEffect(() => {
      loadBookings();
    }, []);
  
    const loadBookings = () => {
      // Simulate API call
      setTimeout(() => {
        setBookings(mockBookings);
        setLoading(false);
        setRefreshing(false);
      }, 1000);
    };
  
    const handleRefresh = () => {
      setRefreshing(true);
      loadBookings();
    };
  
    const filteredBookings = bookings
      .filter(booking => booking.status === BookingStatus.UPCOMING || booking.status === BookingStatus.COMPLETED)
      .filter(booking => booking.status === selectedFilter);
  
    const getBookingStatusStyle = (status: BookingStatus) => {
      switch (status) {
        case BookingStatus.UPCOMING:
          return {
            backgroundColor: Colors.light.warning + '20',
            color: Colors.light.warning,
          };
        case BookingStatus.COMPLETED:
          return {
            backgroundColor: Colors.light.success + '20',
            color: Colors.light.success,
          };
        default:
          return {
            backgroundColor: Colors.light.textSecondary + '20',
            color: Colors.light.textSecondary,
          };
      }
    };
  
    const getBookingIcon = (type: string) => {
      switch (type) {
        case 'hospital':
          return 'heart.fill';
        case 'grooming':
          return 'star.fill';
        case 'boarding':
          return 'house.fill';
        default:
          return 'calendar';
      }
    };
  
    const getBookingTypeLabel = (type: string) => {
      switch (type) {
        case 'hospital':
          return t('petHospital');
        case 'grooming':
          return t('petGrooming');
        case 'boarding':
          return t('petHotel');
        default:
          return t('service');
      }
    };
  
    const getStatusText = (status: BookingStatus) => {
      switch (status) {
        case BookingStatus.UPCOMING:
          return t('upcoming');
        case BookingStatus.COMPLETED:
          return t('completed');
        default:
          return status;
      }
    };

  return {
    loading,
    refreshing,
    bookings: filteredBookings,
    selectedFilter,
    filters,
    setSelectedFilter,
    handleRefresh,
    getBookingStatusStyle,
    getBookingIcon,
    getBookingTypeLabel,
    getStatusText,
  };
}