import { Box, Typography, Button, IconButton, Container } from '@mui/material';
import { MovieCard } from '../MovieCard';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

interface Movie {
  id: string;
  title: string;
  posterUrl: string;
  rating: number;
  releaseDate: string;
  genres: string[];
  ageRating: string;
}

interface YouMayAlsoLikeProps {
  movies: Movie[];
  onViewAll?: () => void;
}

export const YouMayAlsoLike = ({ movies, onViewAll }: YouMayAlsoLikeProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 4,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box
            sx={{
              width: '4px',
              height: '32px',
              backgroundColor: '#4299e1',
              borderRadius: '2px',
            }}
          />
          <Typography
            variant="h4"
            sx={{
              color: '#fff',
              fontWeight: 700,
            }}
          >
            You May Also Like
          </Typography>
        </Box>

        {onViewAll && (
          <Button
            endIcon={<ArrowForwardIcon />}
            sx={{
              color: '#4299e1',
              textTransform: 'none',
              fontWeight: 600,
              fontSize: '1rem',
              '&:hover': {
                backgroundColor: 'rgba(66, 153, 225, 0.1)',
              },
            }}
            onClick={onViewAll}
          >
            Trending
          </Button>
        )}
      </Box>

      {/* Carousel Container */}
      <Box sx={{ position: 'relative' }}>
        {/* Left Arrow */}
        <IconButton
          sx={{
            position: 'absolute',
            left: -20,
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 10,
            backgroundColor: 'rgba(0,0,0,0.7)',
            color: '#fff',
            '&:hover': {
              backgroundColor: 'rgba(66, 153, 225, 0.8)',
            },
          }}
          onClick={() => scroll('left')}
        >
          <ChevronLeftIcon fontSize="large" />
        </IconButton>

        {/* Movies Container */}
        <Box
          ref={scrollContainerRef}
          sx={{
            display: 'flex',
            gap: 3,
            overflowX: 'auto',
            scrollBehavior: 'smooth',
            pb: 2,
            '&::-webkit-scrollbar': {
              height: '8px',
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: '#1a1a2e',
              borderRadius: '4px',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#4299e1',
              borderRadius: '4px',
              '&:hover': {
                backgroundColor: '#3182ce',
              },
            },
          }}
        >
          {movies.map((movie) => (
            <Box
              key={movie.id}
              sx={{
                minWidth: '280px',
                maxWidth: '280px',
              }}
            >
              <MovieCard {...movie} showBookingButton={true} />
            </Box>
          ))}
        </Box>

        {/* Right Arrow */}
        <IconButton
          sx={{
            position: 'absolute',
            right: -20,
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 10,
            backgroundColor: 'rgba(0,0,0,0.7)',
            color: '#fff',
            '&:hover': {
              backgroundColor: 'rgba(66, 153, 225, 0.8)',
            },
          }}
          onClick={() => scroll('right')}
        >
          <ChevronRightIcon fontSize="large" />
        </IconButton>
      </Box>
    </Container>
  );
};