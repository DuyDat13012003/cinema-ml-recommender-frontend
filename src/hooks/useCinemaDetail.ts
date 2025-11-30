// ==============================
//  PREMIUM CINEMA DETAIL HOOK
// ==============================
import { useQuery } from "@tanstack/react-query";

// Mock siêu premium cho từng rạp
const cinemaMock: any = {
  cinema1: {
    id: "cinema1",
    name: "CGV Vincom Đồng Khởi",
    address: "72 Lê Thánh Tôn, Q.1, TP.HCM",
    hotline: "1900 6017",
    openingHours: "08:00 - 23:00",
    rating: 4.8,
    rooms: 7,
    formats: ["IMAX", "4DX", "3D", "2D"],
    services: ["Ghế đôi Sweetbox", "Kiosk Check-in", "Bãi giữ xe", "Bắp nước chuẩn CGV"],
    description:
      "CGV Vincom Đồng Khởi mang đến trải nghiệm điện ảnh cao cấp với hệ thống phòng chiếu hiện đại, âm thanh Dolby Atmos sống động và không gian sang trọng bậc nhất trung tâm TP.HCM.",
    banner:
      "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?w=1600",
    gallery: [
      "https://images.unsplash.com/photo-1517602302552-471fe67acf66?w=800",
      "https://images.unsplash.com/photo-1535016120720-40c646be5580?w=800",
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800",
      "https://images.unsplash.com/photo-1505686994434-e3cc5abf1330?w=800",
    ],
  },

  cinema2: {
    id: "cinema2",
    name: "BHD Star Bitexco",
    address: "2 Hải Triều, Q.1, TP.HCM",
    hotline: "1900 2099",
    openingHours: "08:30 - 23:30",
    rating: 4.7,
    rooms: 10,
    formats: ["IMAX", "ScreenX", "3D", "2D"],
    services: ["VIP Lounge", "Ghế đôi", "Bãi giữ xe Bitexco", "Đặt vé online"],
    description:
      "Tọa lạc tại Bitexco – biểu tượng của Sài Gòn, BHD Star mang đến trải nghiệm điện ảnh độc đáo với nhiều phòng chiếu chuẩn quốc tế và dịch vụ tiện nghi hiện đại.",
    banner:
      "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1600",
    gallery: [
      "https://images.unsplash.com/photo-1516442719524-a603408c90cb?w=800",
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800",
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800",
    ],
  },

  cinema3: {
    id: "cinema3",
    name: "Galaxy Nguyễn Du",
    address: "116 Nguyễn Du, Q.1, TP.HCM",
    hotline: "1900 2224",
    openingHours: "08:00 - 23:00",
    rating: 4.6,
    rooms: 6,
    formats: ["4DX", "3D", "2D"],
    services: ["Bãi xe rộng rãi", "Giá vé tốt", "Rạp thân thiện"],
    description:
      "Galaxy Nguyễn Du là lựa chọn quen thuộc của nhiều bạn trẻ với vị trí trung tâm, giá vé hợp lý và dịch vụ nhanh chóng, thân thiện.",
    banner:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1600",
    gallery: [
      "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=800",
      "https://images.unsplash.com/photo-1497032205916-ac775f0649ae?w=800",
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800",
      "https://images.unsplash.com/photo-1517602302552-471fe67acf66?w=800",
    ],
  },
};

export const useCinemaDetail = (cinemaId?: string) => {
  return useQuery({
    queryKey: ["cinema-detail", cinemaId],
    queryFn: async () => {
      if (!cinemaId) throw new Error("Cinema ID is required");
      return cinemaMock[cinemaId];
    },
    enabled: !!cinemaId,
  });
};
