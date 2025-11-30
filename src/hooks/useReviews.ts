import { useQuery } from "@tanstack/react-query";

export interface ReviewItem {
  id: string;
  movieId: string;
  movieTitle: string;
  moviePoster: string;

  user: {
    id: string;
    name: string;
    avatar: string;
  };

  rating: number;
  likes: number;
  date: string;

  content: string;
  isFeatured?: boolean;
}

const mockReviews: ReviewItem[] = [
  {
    id: "r1",
    movieId: "1",
    movieTitle: "The Lion King",
    moviePoster:
      "https://images.unsplash.com/photo-1516442719524-a603408c90cb?w=400",
    user: {
      id: "u1",
      name: "Minh Anh",
      avatar: "https://i.pravatar.cc/100?img=1",
    },
    rating: 4.5,
    likes: 120,
    date: "2025-11-10",
    content:
      "Một bộ phim cảm xúc mạnh mẽ với hình ảnh tuyệt đẹp. Tính nhân văn rất cao và âm nhạc quá xuất sắc!",
    isFeatured: true,
  },
  {
    id: "r2",
    movieId: "2",
    movieTitle: "Avatar: The Way of Water",
    moviePoster:
      "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400",
    user: {
      id: "u2",
      name: "Huyền Trân",
      avatar: "https://i.pravatar.cc/100?img=2",
    },
    rating: 5,
    likes: 200,
    date: "2025-11-15",
    content:
      "Avatar 2 là một kiệt tác về hình ảnh và âm thanh. Trải nghiệm IMAX thật sự khiến mình choáng ngợp.",
    isFeatured: true,
  },
  {
    id: "r3",
    movieId: "3",
    movieTitle: "Spider-Man: No Way Home",
    moviePoster:
      "https://images.unsplash.com/photo-1635863138275-d9b33299680b?w=400",
    user: {
      id: "u3",
      name: "Ngọc Sơn",
      avatar: "https://i.pravatar.cc/100?img=3",
    },
    rating: 4.8,
    likes: 340,
    date: "2025-11-18",
    content:
      "Cú twist về đa vũ trụ quá đỉnh! Cả rạp vỗ tay rần rần. Một trải nghiệm khó quên với fan Marvel!",
  },
  {
    id: "r4",
    movieId: "4",
    movieTitle: "Top Gun: Maverick",
    moviePoster:
      "https://images.unsplash.com/photo-1517021897933-0e0319cfbc28?w=400",
    user: {
      id: "u4",
      name: "Bảo Long",
      avatar: "https://i.pravatar.cc/100?img=4",
    },
    rating: 4.3,
    likes: 88,
    date: "2025-11-19",
    content:
      "Bay đã đời! Hình ảnh chiến đấu quá đẹp và Tom Cruise vẫn phong độ y như ngày nào.",
  },
];

export const useReviews = () => {
  return useQuery({
    queryKey: ["reviews"],
    queryFn: async () => mockReviews,
  });
};
export const getReviewById = (id: string): ReviewItem | undefined => {
  return mockReviews.find((r) => r.id === id);
};
