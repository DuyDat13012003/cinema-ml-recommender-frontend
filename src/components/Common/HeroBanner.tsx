import { Box, Typography, Chip, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import StarIcon from '@mui/icons-material/Star';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

interface HeroBannerProps {
  id: string;
  title: string;
  backgroundUrl?: string; // FIXED
  rating: number;
  releaseDate: string;
  duration?: number;
  genres: string[];
  ageRating: string;
  description?: string;
}

export const HeroBanner = ({
  id,
  title,
  backgroundUrl,
  rating,
  releaseDate,
  duration,
  genres,
  ageRating,
  description,
}: HeroBannerProps) => {
  const navigate = useNavigate();

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours} hours ${mins} minutes`;
  };

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '600px',
        backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.3) 100%), url(${backgroundUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ maxWidth: '600px', color: '#fff' }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              mb: 2,
              fontSize: { xs: '2rem', md: '3rem' },
            }}
          >
            {title}
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
            <Chip
              icon={<StarIcon sx={{ fontSize: 18 }} />}
              label={`${rating}/10`}
              sx={{
                backgroundColor: 'rgba(0,0,0,0.7)',
                color: '#FFD700',
                fontWeight: 'bold',
              }}
            />
            <Chip
              label={releaseDate}
              sx={{
                backgroundColor: 'rgba(0,0,0,0.7)',
                color: '#fff',
              }}
            />
            <Chip
              label={formatDuration(duration ?? 0)}
              sx={{
                backgroundColor: 'rgba(0,0,0,0.7)',
                color: '#fff',
              }}
            />
          </Box>

          <Typography
            variant="body1"
            sx={{
              mb: 3,
              lineHeight: 1.7,
              color: '#ddd',
            }}
          >
            {description}
          </Typography>

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
            onClick={() => navigate(`/booking/${id}`)}
          >
            Booking
          </Button>
        </Box>
      </Container>
    </Box>
  );
};