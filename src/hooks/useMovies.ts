// ==================== FILE: src/hooks/useMovies.ts ====================
import { useQuery } from '@tanstack/react-query';
import axiosClient from '../api/axiosClient';

// ========== INTERFACES ==========
interface Movie {
  id: string;
  title: string;
  posterUrl: string;
  rating: number;
  releaseDate: string;
  genres: string[];
  ageRating: string;
  duration?: number;
  description?: string;
  backgroundUrl?: string;
}

interface Cast {
  id: string;
  name: string;
  character: string;
  imageUrl: string;
}

interface Production {
  title: string;
  value: string;
}

interface Review {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  content: string;
  likes: number;
}

interface MovieDetail extends Movie {
  trailerUrl: string;
  cast: Cast[];
  production: Production[];
  reviews: Review[];
}

// ========== MOCK DATA ==========
const mockMovies: Movie[] = [
  {
    id: '1',
    title: 'The Lion King',
    posterUrl: 'https://images.unsplash.com/photo-1516442719524-a603408c90cb?w=400',
    rating: 8.5,
    releaseDate: '6 Nov',
    genres: ['Animation', 'Adventure', 'Drama'],
    ageRating: '6+',
    duration: 118,
    description: 'A lion prince flees his kingdom only to learn the true meaning of responsibility and bravery.',
    backgroundUrl: 'https://images.unsplash.com/photo-1516442719524-a603408c90cb?w=1200',
  },
  {
    id: '2',
    title: 'Avatar: The Way of Water',
    posterUrl: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400',
    rating: 8.8,
    releaseDate: '16 Dec',
    genres: ['Sci-Fi', 'Adventure', 'Action'],
    ageRating: '13+',
    duration: 192,
    description: 'Jake Sully and his family explore the wonders of Pandora\'s ocean world.',
    backgroundUrl: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1200',
  },
  {
    id: '3',
    title: 'Spider-Man: No Way Home',
    posterUrl: 'https://images.unsplash.com/photo-1635863138275-d9b33299680b?w=400',
    rating: 9.0,
    releaseDate: '17 Dec',
    genres: ['Action', 'Adventure', 'Fantasy'],
    ageRating: '13+',
    duration: 161,
    description: 'Spider-Man must face threats while protecting his loved ones.',
    backgroundUrl: 'https://images.unsplash.com/photo-1635863138275-d9b33299680b?w=1200',
  },
  {
    id: '4',
    title: 'Top Gun: Maverick',
    posterUrl: 'https://images.unsplash.com/photo-1517021897933-0e0319cfbc28?w=400',
    rating: 8.9,
    releaseDate: '27 May',
    genres: ['Action', 'Drama'],
    ageRating: '13+',
    duration: 131,
    description: 'An aging pilot is called back for one last dangerous mission.',
    backgroundUrl: 'https://images.unsplash.com/photo-1517021897933-0e0319cfbc28?w=1200',
  },
  {
    id: '5',
    title: 'Black Panther',
    posterUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
    rating: 8.7,
    releaseDate: '11 Nov',
    genres: ['Action', 'Adventure', 'Sci-Fi'],
    ageRating: '13+',
    duration: 134,
    description: 'T\'Challa must defend his kingdom against a powerful enemy.',
    backgroundUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200',
  },
  {
    id: '6',
    title: 'Dune: Part Two',
    posterUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400',
    rating: 8.6,
    releaseDate: '1 Mar 2024',
    genres: ['Sci-Fi', 'Adventure', 'Drama'],
    ageRating: '13+',
    duration: 166,
    description: 'Paul Atreides continues his journey to transform his destiny.',
    backgroundUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1200',
  },
];
export const moviesMock = mockMovies;

const mockMovieDetails: { [key: string]: MovieDetail } = {
  '1': {
    id: '1',
    title: "Zack Snyder's Justice League",
    posterUrl: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=500',
    backgroundUrl: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=1200',
    rating: 8.1,
    releaseDate: '2021-10-18',
    duration: 242,
    genres: ['Action', 'Fantasy', 'Superhero'],
    ageRating: 'T13',
    description: 'Sau cái chết của Superman, thế giới rơi vào bóng tối và một mối đe dọa tồi tệ nhất đang đến gần. Batman và Wonder Woman đánh bại hai sinh vật độc ác hùng mạnh mệ gọi Aquaman, The Flash và Cyborg để đối đầu với mối đe dọa Steppenwolf và đạo quân Parademon. Nhưng để ngăn chặn thảm họa hủy diệt Trái Đất, họ phải tìm cách tương tác nhau và trở thành thứ mạnh mẽ vọng trứ lai trước khi quá muộn?',
    trailerUrl: 'https://www.youtube.com/embed/UCEL7sXqHjw',
    cast: [
      {
        id: '1',
        name: 'Ben Affleck',
        character: 'Batman / Bruce Wayne',
        imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300',
      },
      {
        id: '2',
        name: 'Gal Gadot',
        character: 'Wonder Woman / Diana Prince',
        imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300',
      },
      {
        id: '3',
        name: 'Jason Momoa',
        character: 'Aquaman / Arthur Curry',
        imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300',
      },
      {
        id: '4',
        name: 'Ezra Miller',
        character: 'The Flash / Barry Allen',
        imageUrl: 'https://images.unsplash.com/photo-1517841905240-1c28a93fe752?w=300',
      },
    ],
    production: [
      { title: 'Director', value: 'Zack Snyder' },
      { title: 'Producer', value: 'Kevin Feige' },
      { title: 'Production Company', value: 'DC Films, Warner Bros' },
      { title: 'Budget', value: '$300 Million' },
      { title: 'Box Office', value: '$770 Million' },
      { title: 'Release Date', value: '18 Oct 2021' },
    ],
    reviews: [
      {
        id: '1',
        author: 'John Doe',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
        rating: 5,
        date: '2 days ago',
        content: 'This is an amazing movie! The action sequences are incredible and the story is compelling. Highly recommend!',
        likes: 45,
      },
      {
        id: '2',
        author: 'Jane Smith',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
        rating: 4,
        date: '5 days ago',
        content: 'Great movie, though a bit long. The cinematography is beautiful and the characters are well developed.',
        likes: 32,
      },
      {
        id: '3',
        author: 'Mike Wilson',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
        rating: 4,
        date: '1 week ago',
        content: 'Excellent superhero flick! Worth watching for the action and the storytelling.',
        likes: 28,
      },
    ],
  },
};

// ========== HOOKS ==========

/**
 * Hook fetch danh sách phim theo category
 * @param category - 'trending' | 'recommended' | 'coming-soon' | 'all'
 */
export const useMovies = (category: 'trending' | 'recommended' | 'coming-soon' | 'all' = 'all') => {
  return useQuery({
    queryKey: ['movies', category],
    queryFn: async () => {
      try {
        // TODO: Thay bằng API call thật khi có backend
        // const response = await axiosClient.get(`/movies?category=${category}`);
        // return response.data;

        // Mock data
        return mockMovies;
      } catch (error) {
        console.error('Error fetching movies:', error);
        return mockMovies;
      }
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

/**
 * Hook fetch phim featured cho hero banner
 */
export const useFeaturedMovie = () => {
  return useQuery({
    queryKey: ['featured-movie'],
    queryFn: async () => {
      try {
        // TODO: Thay bằng API call thật
        // const response = await axiosClient.get('/movies/featured');
        // return response.data;

        // Mock data
        return mockMovieDetails['1'];
      } catch (error) {
        console.error('Error fetching featured movie:', error);
        throw error;
      }
    },
  });
};

/**
 * Hook fetch chi tiết phim theo ID
 * @param id - Movie ID
 */
export const useMovieDetail = (id?: string) => {
  return useQuery({
    queryKey: ['movie', id],
    queryFn: async () => {
      try {
        if (!id) throw new Error('Movie ID is required');

        // TODO: Thay bằng API call thật
        // const response = await axiosClient.get(`/movies/${id}`);
        // return response.data;

        // Mock data - nếu không có thì return mock từ '1'
        return mockMovieDetails[id] || mockMovieDetails['1'];
      } catch (error) {
        console.error('Error fetching movie detail:', error);
        throw error;
      }
    },
    enabled: !!id, // Chỉ chạy khi có id
  });
};

/**
 * Hook fetch danh sách ghế theo suất chiếu
 */
export const useSeatsByShowtime = (showtimeId?: string) => {
  return useQuery({
    queryKey: ['seats', showtimeId],
    queryFn: async () => {
      try {
        if (!showtimeId) throw new Error('Showtime ID is required');

        // TODO: Thay bằng API call thật
        // const response = await axiosClient.get(`/showtimes/${showtimeId}/seats`);
        // return response.data;

        // Mock data
        const seats = [];
        for (let i = 1; i <= 30; i++) {
          seats.push({
            id: `seat_${i}`,
            number: i,
            row: String.fromCharCode(65 + Math.floor((i - 1) / 10)),
            column: ((i - 1) % 10) + 1,
            status: Math.random() > 0.3 ? 'available' : 'booked', // 70% available
            price: i > 20 ? 150000 : 100000, // VIP ghế cuối
          });
        }
        return seats;
      } catch (error) {
        console.error('Error fetching seats:', error);
        return [];
      }
    },
    enabled: !!showtimeId,
  });
};

/**
 * Hook fetch danh sách giờ chiếu theo phim và rạp
 */
export const useShowtimes = (movieId?: string, cinemaId?: string) => {
  return useQuery({
    queryKey: ['showtimes', movieId, cinemaId],
    queryFn: async () => {
      try {
        if (!movieId || !cinemaId) throw new Error('Movie ID and Cinema ID are required');

        // TODO: Thay bằng API call thật
        // const response = await axiosClient.get(`/showtimes?movieId=${movieId}&cinemaId=${cinemaId}`);
        // return response.data;

        // Mock data
        return [
          { id: 'st_1', time: '09:00', format: '2D', language: 'Dubbed', availableSeats: 25 },
          { id: 'st_2', time: '12:30', format: '3D', language: 'Subbed', availableSeats: 5 },
          { id: 'st_3', time: '15:45', format: '2D', language: 'Dubbed', availableSeats: 18 },
          { id: 'st_4', time: '19:00', format: 'IMAX', language: 'Dubbed', availableSeats: 2 },
          { id: 'st_5', time: '22:15', format: '2D', language: 'Subbed', availableSeats: 30 },
        ];
      } catch (error) {
        console.error('Error fetching showtimes:', error);
        return [];
      }
    },
    enabled: !!movieId && !!cinemaId,
  });
};

/**
 * Hook fetch promotions
 */
export const usePromotions = () => {
  return useQuery({
    queryKey: ['promotions'],
    queryFn: async () => {
      try {
        // TODO: Thay bằng API call thật
        // const response = await axiosClient.get('/promotions');
        // return response.data;

        // Mock data
        return [
          {
            id: 'p1',
            title: 'Giảm 50% vé xem phim',
            imageUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&h=300&fit=crop',
            description: 'Ưu đãi đặc biệt cho thành viên mới',
            validUntil: '31/12/2024',
          },
          {
            id: 'p2',
            title: 'Combo bắp nước giá sốc',
            imageUrl: 'https://images.unsplash.com/photo-1505686994434-e3cc5abf1330?w=600&h=300&fit=crop',
            description: 'Chỉ 99k cho combo lớn',
            validUntil: '15/12/2024',
          },
          {
            id: 'p3',
            title: 'Thứ 3 vui vẻ',
            imageUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&h=300&fit=crop',
            description: 'Giảm 30% tất cả suất chiếu',
            validUntil: '31/12/2024',
          },
        ];
      } catch (error) {
        console.error('Error fetching promotions:', error);
        return [];
      }
    },
  });
};
/**
 * Hook fetch danh sách phim gợi ý theo thể loại
 * @param genres - Danh sách genres để gợi ý phim tương tự
 * @param currentMovieId - ID phim hiện tại (để exclude)
 */
export const useRecommendedMovies = (genres?: string[], currentMovieId?: string) => {
  return useQuery({
    queryKey: ['recommended-movies', genres, currentMovieId],
    queryFn: async () => {
      try {
        // TODO: Thay bằng API call thật
        // const response = await axiosClient.get('/movies/recommended', {
        //   params: { genres: genres?.join(','), excludeId: currentMovieId }
        // });
        // return response.data;

        // Mock data - filter phim tương tự theo genres
        return mockMovies.filter((movie) => {
          if (movie.id === currentMovieId) return false;
          if (!genres) return true;
          return movie.genres.some((genre) => genres.includes(genre));
        });
      } catch (error) {
        console.error('Error fetching recommended movies:', error);
        return mockMovies;
      }
    },
    enabled: !!genres && !!currentMovieId,
  });
};
