// src/components/Common/PromotionCarousel.tsx
import { Box, Typography, Button, IconButton } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useRef } from 'react';

interface Promotion {
  id: string;
  title: string;
  imageUrl: string;
  description: string;
  validUntil: string;
}

interface PromotionCarouselProps {
  promotions: Promotion[];
  onViewAll?: () => void;
}

export const PromotionCarousel = ({
  promotions,
  onViewAll,
}: PromotionCarouselProps) => {
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
      {/* Header */}
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
          Khuyến Mãi
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

        {/* Promotions Container */}
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
          {promotions.map((promo) => (
            <Box
              key={promo.id}
              sx={{
                minWidth: '350px',
                maxWidth: '350px',
                cursor: 'pointer',
                borderRadius: 2,
                overflow: 'hidden',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                },
              }}
            >
              <img
                src={promo.imageUrl}
                alt={promo.title}
                style={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover',
                }}
              />
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
    </Box>
  );
};