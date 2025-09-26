
import { useLanguage } from "@/src/contexts/LanguageContext";
import { mockHotels, mockRoomTypes } from "@/src/data/mock";
import { Hotel, RoomType } from "@/src/data/types";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";

export function useHotelRoomsController() {
  const router = useRouter();
  const { petType } = useLocalSearchParams<{ petType: 'dog' | 'cat' }>();
  const { t } = useLanguage();

  const [loading, setLoading] = useState(true);
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [rooms, setRooms] = useState<RoomType[]>([]);
  const [selectedRoomType, setSelectedRoomType] = useState<string>('all');

  const roomTypes = ['all', 'standard', 'deluxe', 'superior', 'suite'];

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      const selectedHotel = mockHotels.find(h => h.petType === petType);
      const hotelRooms = mockRoomTypes.filter(room => room.hotelId === selectedHotel?.id);

      setHotel(selectedHotel || null);
      setRooms(hotelRooms);
      setLoading(false);
    }, 1000);
  }, [petType]);

  const filteredRooms = selectedRoomType === 'all'
    ? rooms
    : rooms.filter(room => room.name.toLowerCase().includes(selectedRoomType));

  const handleRoomSelect = (room: RoomType) => {
    console.log('Selected Room:', room.id);
    router.push({
      pathname: '/room-detail' as any,
      params: { roomId: room.id, petType }
    } as any);
  };

  const getRoomTypeLabel = (type: string) => {
    switch (type) {
      case 'all': return t('allRooms');
      case 'standard': return t('standardRoom');
      case 'deluxe': return t('deluxeRoom');
      case 'superior': return t('superiorRoom');
      case 'suite': return t('suite');
      default: return type;
    }
  };
  
  return {
    loading,
    hotel,
    rooms: filteredRooms,
    roomTypes,
    selectedRoomType,
    setSelectedRoomType,
    handleRoomSelect,
    getRoomTypeLabel,
    t,
    router
  };
}