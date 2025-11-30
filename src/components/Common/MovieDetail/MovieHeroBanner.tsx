// src/components/Common/MovieDetail/MovieHeroBanner.tsx
import { Box, Container, Button, Chip, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

export interface MovieHeroBannerProps {
  id: string;
  title: string;
  posterUrl: string;

  backgroundUrl?: string;
  rating?: number;
  releaseDate?: string;
  duration?: number;
  genres?: string[];
  ageRating?: string;
  description?: string;

  onBooking?: () => void;
  onWatchTrailer?: () => void;

  // ⭐ Thêm để đồng bộ với FavoriteContext
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
}

export const MovieHeroBanner = ({
  id,
  title,
  posterUrl,
  backgroundUrl,
  rating,
  releaseDate,
  duration = 0,
  genres = [],
  ageRating,
  description = "",
  onBooking,
  onWatchTrailer,

  // ⭐ Nhận từ MovieDetail
  isFavorite = false,
  onToggleFavorite,
}: MovieHeroBannerProps) => {

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '600px',
        backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.7) 40%, rgba(0,0,0,0.4) 100%), url(${backgroundUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', gap: 4 }}>
          
          {/* Poster */}
          <Box
            sx={{
              flex: '0 0 280px',
              borderRadius: 2,
              overflow: 'hidden',
              boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
            }}
          >
            <img
              src={posterUrl}
              alt={title}
              style={{
                width: '100%',
                height: '420px',
                objectFit: 'cover',
              }}
            />
          </Box>

          {/* Info */}
          <Box sx={{ flex: 1, color: '#fff' }}>

            {/* Title */}
            <Typography
              variant="h2"
              sx={{
                fontWeight: 700,
                mb: 2,
                fontSize: { xs: '2rem', md: '2.5rem' },
              }}
            >
              {title}
            </Typography>

            {/* Chips */}
            <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
              {rating !== undefined && (
                <Chip
                  icon={<StarIcon sx={{ fontSize: 18 }} />}
                  label={`${rating}/10`}
                  sx={{
                    backgroundColor: 'rgba(0,0,0,0.7)',
                    color: '#FFD700',
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    py: 2.5,
                  }}
                />
              )}

              {releaseDate && (
                <Chip
                  label={releaseDate}
                  sx={{
                    backgroundColor: 'rgba(0,0,0,0.7)',
                    color: '#fff',
                    fontSize: '1rem',
                    py: 2.5,
                  }}
                />
              )}

              <Chip
                label={formatDuration(duration)}
                sx={{
                  backgroundColor: 'rgba(0,0,0,0.7)',
                  color: '#fff',
                  fontSize: '1rem',
                  py: 2.5,
                }}
              />

              {ageRating && (
                <Chip
                  label={ageRating}
                  sx={{
                    backgroundColor: 'rgba(0,0,0,0.7)',
                    color: '#fff',
                    fontSize: '1rem',
                    py: 2.5,
                    fontWeight: 'bold',
                  }}
                />
              )}
            </Box>

            {/* Genres */}
            <Box sx={{ display: 'flex', gap: 1.5, mb: 3, flexWrap: 'wrap' }}>
              {genres.map((g) => (
                <Chip
                  key={g}
                  label={g}
                  sx={{
                    backgroundColor: '#4299e1',
                    color: '#fff',
                    fontWeight: 500,
                  }}
                />
              ))}
            </Box>

            {/* Description */}
            <Typography
              variant="body1"
              sx={{
                mb: 4,
                lineHeight: 1.8,
                color: '#ddd',
              }}
            >
              {description}
            </Typography>

            {/* Buttons */}
            <Box sx={{ display: 'flex', gap: 2 }}>

              <Button
                variant="contained"
                startIcon={<PlayArrowIcon />}
                sx={{
                  backgroundColor: '#4299e1',
                  color: '#fff',
                  fontWeight: 600,
                  px: 4,
                  py: 1.5,
                  fontSize: '1rem',
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: '#3182ce',
                  },
                }}
                onClick={onBooking}
              >
                Book Now
              </Button>

              <Button
                variant="outlined"
                startIcon={<PlayArrowIcon />}
                sx={{
                  borderColor: '#4299e1',
                  color: '#4299e1',
                  fontWeight: 600,
                  px: 4,
                  py: 1.5,
                  fontSize: '1rem',
                  textTransform: 'none',
                  '&:hover': {
                    borderColor: '#3182ce',
                    backgroundColor: 'rgba(66,153,225,0.1)',
                  },
                }}
                onClick={onWatchTrailer}
              >
                Watch Trailer
              </Button>

              {/* ❤️ LIKE BUTTON — sử dụng Context */}
              <Button
                variant="outlined"
                startIcon={isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                sx={{
                  borderColor: isFavorite ? '#ff6b6b' : '#666',
                  color: isFavorite ? '#ff6b6b' : '#aaa',
                  fontWeight: 600,
                  px: 2,
                  py: 1.5,
                  fontSize: '1rem',
                  textTransform: 'none',
                  transition: '0.2s',
                  '&:hover': {
                    borderColor: '#ff6b6b',
                    backgroundColor: 'rgba(255, 107, 107, 0.1)',
                    transform: 'scale(1.05)',
                  },
                }}
                onClick={onToggleFavorite}
              >
                {isFavorite ? 'Liked' : 'Like'}
              </Button>

            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
