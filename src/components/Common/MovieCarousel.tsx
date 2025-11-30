import { Box, Typography, Button, IconButton } from '@mui/material';
import { MovieCard } from './MovieCard';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useRef } from 'react';

interface Movie {
  id: string;
  title: string;
  posterUrl: string;
  rating: number;
  releaseDate: string;
  genres: string[];
  ageRating: string;
}

interface MovieCarouselProps {
  title: string;
  movies: Movie[];
  onViewAll?: () => void;
  showBookingButton?: boolean;
}

export const MovieCarousel = ({
  title,
  movies,
  onViewAll,
  showBookingButton = true,
}: MovieCarouselProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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
    <Box sx={{ py: 4 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: '#fff',
            fontWeight: 700,
          }}
        >
          {title}
        </Typography>

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
            View All
          </Button>
        )}
      </Box>

      <Box sx={{ position: 'relative' }}>
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
              <MovieCard {...movie} showBookingButton={showBookingButton} />
            </Box>
          ))}
        </Box>

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
    </Box>
  );
};