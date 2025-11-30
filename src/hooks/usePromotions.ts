// src/hooks/usePromotions.ts
import { useQuery } from '@tanstack/react-query';
import axiosClient from '../api/axiosClient';

export interface Promotion {
  id: string;
  title: string;
  imageUrl: string;
  description: string;
  validUntil: string;
}

export const usePromotions = () => {
  return useQuery<Promotion[]>({
    queryKey: ['promotions'],
    queryFn: async () => {
      // ❗ Nếu chưa có API backend → dùng mock về tạm
      return [
        {
          id: '1',
          title: 'Mega Sale 50%',
          imageUrl: 'https://i.imgur.com/bWyI4kG.jpeg',
          description: 'Giảm giá 50%',
          validUntil: '2025-12-31',
        },
        {
          id: '2',
          title: 'Mua 1 Tặng 1',
          imageUrl: 'https://i.imgur.com/bWyI4kG.jpeg',
          description: 'Mua 1 tặng 1 vé',
          validUntil: '2025-12-31',
        },
        {
          id: '3',
          title: 'Weekend Combo',
          imageUrl: 'https://i.imgur.com/bWyI4kG.jpeg',
          description: 'Ưu đãi combo cuối tuần',
          validUntil: '2025-12-31',
        },
      ];
    },
  });
};
