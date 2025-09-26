import { mockRoomTypes, RoomType } from '@/src/data/mock';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';


export interface RoomDetailState {
  loading: boolean;
  room: RoomType | null;
  error: string | null;
  selectedImageIndex: number;
  showImageViewer: boolean;
}

export interface RoomDetailActions {
  goBack: () => void;
  handleBookRoom: () => void;
  openImageViewer: (index: number) => void;
  closeImageViewer: () => void;
  loadRoom: () => void;
}

export interface RoomDetailHelpers {
  formatPrice: () => string;
  getAmenitiesDisplay: () => string[];
}

export interface RoomDetailController {
  state: RoomDetailState;
  actions: RoomDetailActions;
  helpers: RoomDetailHelpers;
}

export function useRoomDetailController(): RoomDetailController {
  const router = useRouter();
  const { roomId, petType } = useLocalSearchParams<{ roomId: string; petType: 'dog' | 'cat' }>();

  const [state, setState] = useState<RoomDetailState>({
    loading: true,
    room: null,
    error: null,
    selectedImageIndex: 0,
    showImageViewer: false,
  });

  const loadRoom = () => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    setTimeout(() => {
      const room = mockRoomTypes.find(r => r.id === roomId);
      if (room) {
        setState(prev => ({
          ...prev,
          loading: false,
          room,
          error: null,
        }));
      } else {
        setState(prev => ({
          ...prev,
          loading: false,
          room: null,
          error: 'Room not found',
        }));
      }
    }, 1000);
  };

  useEffect(() => {
    loadRoom();
  }, [roomId]);

  const actions: RoomDetailActions = {
    goBack: () => {
      router.back();
    },

    handleBookRoom: () => {
      if (state.room) {
        router.push({
          pathname: '/hotel-booking' as any,
          params: { roomId: state.room.id, petType }
        } as any);
      }
    },

    openImageViewer: (index: number) => {
      setState(prev => ({
        ...prev,
        selectedImageIndex: index,
        showImageViewer: true,
      }));
    },

    closeImageViewer: () => {
      setState(prev => ({
        ...prev,
        showImageViewer: false,
      }));
    },

    loadRoom,
  };

  const helpers: RoomDetailHelpers = {
    formatPrice: () => {
      return state.room ? `฿${state.room.price}` : '฿0';
    },

    getAmenitiesDisplay: () => {
      return state.room?.amenities || [];
    },
  };

  return {
    state,
    actions,
    helpers,
  };
}