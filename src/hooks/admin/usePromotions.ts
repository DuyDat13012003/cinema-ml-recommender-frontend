// src/hooks/admin/usePromotions.ts

export interface Promotion {
  id: string;
  title: string;
  description: string;
  image: string;
  category: "discount" | "combo" | "flash" | "member";
  discountPercent?: number;
  startDate: string;
  endDate: string;
  active: boolean;
}

export const usePromotions = () => {
  const promos: Promotion[] = [
    {
      id: "P01",
      title: "Giảm 50% vào Thứ 4 hàng tuần",
      description:
        "Ưu đãi giảm giá 50% cho tất cả phim 2D vào Thứ 4 hàng tuần. Áp dụng cho khách hàng thành viên.",
      image:
        "https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=600",
      category: "discount",
      discountPercent: 50,
      startDate: "2025-11-01",
      endDate: "2025-12-31",
      active: true,
    },
    {
      id: "P02",
      title: "Mua 1 tặng 1 – Suất 10:00",
      description:
        "Khi mua 1 vé bất kỳ cho suất chiếu lúc 10:00, bạn sẽ nhận ngay 1 vé miễn phí.",
      image:
        "https://images.unsplash.com/photo-1585951237317-1c72833ab162?q=80&w=600",
      category: "combo",
      startDate: "2025-11-15",
      endDate: "2025-12-30",
      active: true,
    },
    {
      id: "P03",
      title: "Flash Sale 30% – Chỉ hôm nay!",
      description:
        "Flash sale cực sốc duy nhất hôm nay. Giảm ngay 30% tất cả suất chiếu.",
      image:
        "https://images.unsplash.com/photo-1525182008055-f88b95ff7980?q=80&w=600",
      category: "flash",
      discountPercent: 30,
      startDate: "2025-11-29",
      endDate: "2025-11-29",
      active: true,
    },
  ];

  return {
    data: promos,
    isLoading: false,
    error: null,
  };
};
