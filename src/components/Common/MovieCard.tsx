import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Chip,
  Box,
  Button,
  IconButton,
  Tooltip,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import StarIcon from '@mui/icons-material/Star';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import { useFavorites } from "../../context/FavoriteContext";

interface MovieCardProps {
  id: string;
  title: string;
  posterUrl: string;
  rating: number;
  releaseDate: string;
  genres: string[];
  ageRating: string;
  showBookingButton?: boolean;
}

export const MovieCard = ({
  id,
  title,
  posterUrl,
  rating,
  releaseDate,
  genres,
  ageRating,
  showBookingButton = true
}: MovieCardProps) => {
  const navigate = useNavigate();
  const { favorites, toggleFavorite } = useFavorites();

  const isFavorite = favorites.some((m) => m.id === id);

  return (
    <Card
      sx={{
        width: '100%',
        height: '100%',
        backgroundColor: '#1a1a2e',
        borderRadius: 2,
        cursor: 'pointer',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        border: '2px solid transparent',
        position: "relative",
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 8px 24px rgba(66, 153, 225, 0.5)',
          border: '2px solid #4299e1',
        },
      }}
      onClick={() => navigate(`/movie/${id}`)}
    >
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="div"
          sx={{
            width: "100%",
            height: 350,
            backgroundImage: `url(${posterUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />



        {/* ⭐ Rating */}
        <Chip
          icon={<StarIcon sx={{ fontSize: 16 }} />}
          label={rating.toFixed(1)}
          size="small"
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            backgroundColor: '#000',
            color: '#FFD700',
            fontWeight: 'bold',
          }}
        />

        {/* ❤️ Favorite Icon */}
        <Tooltip title={isFavorite ? "Bỏ yêu thích" : "Yêu thích"}>
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite({
                id,
                title,
                posterUrl,
                rating,
                releaseDate,
                genres,
                ageRating,
              });
            }}
            sx={{
              position: "absolute",
              top: 8,
              left: 8,
              backgroundColor: "rgba(0,0,0,0.4)",
              "&:hover": { backgroundColor: "rgba(0,0,0,0.6)" },
            }}
          >
            {isFavorite ? (
              <FavoriteIcon sx={{ color: "#ff4d6d" }} />
            ) : (
              <FavoriteBorderIcon sx={{ color: "#fff" }} />
            )}
          </IconButton>
        </Tooltip>
      </Box>

      <CardContent sx={{ padding: 2 }}>
        <Typography
          variant="h6"
          sx={{
            color: '#fff',
            fontWeight: 600,
            mb: 1,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {title}
        </Typography>

        <Typography variant="body2" sx={{ color: '#aaa', mb: 1 }}>
          {releaseDate}
        </Typography>

        <Typography variant="body2" sx={{ color: '#aaa', mb: 1.5 }}>
          {genres.join(' / ')} / {ageRating}
        </Typography>

        {showBookingButton && (
          <Button
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: '#4299e1',
              color: '#fff',
              fontWeight: 600,
              textTransform: 'none',
              '&:hover': {
                backgroundColor: '#3182ce',
              },
            }}
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/booking/${id}`);
            }}
          >
            Booking Now
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
