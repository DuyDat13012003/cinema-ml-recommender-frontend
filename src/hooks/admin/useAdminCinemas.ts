// src/hooks/admin/useAdminCinemas.ts
import { useQuery } from "@tanstack/react-query";

export interface CinemaMovie {
  id: string;
  title: string;
  category: string;
  duration: number;
  image: string;
}

export interface AdminCinema {
  id: string;
  name: string;
  city: string;
  image: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  rooms: number;
  seats: number;
  openingHours: string;
  movies: CinemaMovie[];
}

export const useAdminCinemas = () => {
  return useQuery<AdminCinema[]>({
    queryKey: ["admin-cinemas"],
    queryFn: async () => {
      return [
        {
          id: "c1",
          name: "CineBooking CGV Vincom Center",
          city: "Hồ Chí Minh",
          image:
            "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1200",
          description:
            "Rạp chiếu phim hiện đại với hệ thống âm thanh Dolby Atmos và màn hình IMAX.",
          address: "72 Lê Thánh Tôn, P. Bến Nghé, Quận 1",
          phone: "028 3822 5432",
          email: "cgvvincom@cinebooking.vn",
          rooms: 8,
          seats: 1200,
          openingHours: "8:00 - 23:00",
          movies: [
            {
              id: "m1",
              title: "Godzilla x Kong: The New Empire",
              category: "Hành động, Phiêu lưu",
              duration: 115,
              image:
                "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?w=800",
            },
            {
              id: "m2",
              title: "Dune: Part Two",
              category: "Khoa học viễn tưởng",
              duration: 166,
              image:
                "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=800",
            },
            {
              id: "m3",
              title: "Kung Fu Panda 4",
              category: "Hoạt hình, Hài",
              duration: 94,
              image:
                "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=800",
            },
            {
              id: "m4",
              title: "Mai",
              category: "Tâm lý, Tình cảm",
              duration: 131,
              image:
                "https://images.unsplash.com/photo-1542204637-e67bc7d41e48?w=800",
            },            {
              id: "m5",
              title: "Mai",
              category: "Tâm lý, Tình cảm",
              duration: 131,
              image:
                "https://images.unsplash.com/photo-1542204637-e67bc7d41e48?w=800",
            },            {
              id: "m6",
              title: "Mai",
              category: "Tâm lý, Tình cảm",
              duration: 131,
              image:
                "https://images.unsplash.com/photo-1542204637-e67bc7d41e48?w=800",
            },
          ],
        },
        {
          id: "c2",
          name: "BHD Star Bitexco",
          city: "Hồ Chí Minh",
          image:
            "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1200",
          description:
            "Rạp chiếu phim chất lượng cao tại tòa nhà Bitexco, trung tâm thành phố.",
          address: "2 Hải Triều, Quận 1",
          phone: "028 6278 5555",
          email: "bhdstar@cinebooking.vn",
          rooms: 6,
          seats: 900,
          openingHours: "9:00 - 22:00",
          movies: [
            {
              id: "m1",
              title: "Godzilla x Kong: The New Empire",
              category: "Hành động, Phiêu lưu",
              duration: 115,
              image:
                "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?w=800",
            },
            {
              id: "m2",
              title: "Dune: Part Two",
              category: "Khoa học viễn tưởng",
              duration: 166,
              image:
                "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=800",
            },
            {
              id: "m3",
              title: "Kung Fu Panda 4",
              category: "Hoạt hình, Hài",
              duration: 94,
              image:
                "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=800",
            },
            {
              id: "m4",
              title: "Mai",
              category: "Tâm lý, Tình cảm",
              duration: 131,
              image:
                "https://images.unsplash.com/photo-1542204637-e67bc7d41e48?w=800",
            },            {
              id: "m5",
              title: "Mai",
              category: "Tâm lý, Tình cảm",
              duration: 131,
              image:
                "https://images.unsplash.com/photo-1542204637-e67bc7d41e48?w=800",
            },            {
              id: "m6",
              title: "Mai",
              category: "Tâm lý, Tình cảm",
              duration: 131,
              image:
                "https://images.unsplash.com/photo-1542204637-e67bc7d41e48?w=800",
            },
          ],
        },
      ];
    },
  });
};
