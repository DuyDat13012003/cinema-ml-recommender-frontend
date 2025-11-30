import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Rating,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { ReviewItem } from "../../hooks/useReviews";

interface Props {
  item: ReviewItem;
}

export const ReviewFeaturedCard = ({ item }: Props) => {
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        background: "rgba(255,255,255,0.05)",
        borderRadius: 3,
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.1)",
        cursor: "pointer",
        transition: "0.3s",
        "&:hover": {
          borderColor: "#3b82f6",
          boxShadow: "0 0 20px rgba(59,130,246,0.5)",
        },
      }}

      // ⭐ 1. Click vào card → ReviewDetail
      onClick={() => navigate(`/review/${item.id}`)}
    >
      {/* ⭐ 2. Click vào poster → MovieDetail */}
      <CardMedia
        component="img"
        height="240"
        image={item.moviePoster}
        alt={item.movieTitle}
        sx={{ cursor: "pointer" }}
        onClick={(e) => {
          e.stopPropagation(); // ⚠ tránh mở review detail
          navigate(`/movie/${item.movieId}`);
        }}
      />

      <CardContent sx={{ color: "white" }}>
        {/* ⭐ 3. Click vào tiêu đề → MovieDetail */}
        <Typography
          variant="h6"
          fontWeight={700}
          sx={{
            cursor: "pointer",
            "&:hover": { color: "#3b82f6" },
          }}
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/movie/${item.movieId}`);
          }}
        >
          {item.movieTitle}
        </Typography>

        <Rating
          value={item.rating}
          precision={0.1}
          readOnly
          sx={{ mt: 1, mb: 1 }}
        />

        <Typography
          sx={{
            opacity: 0.8,
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {item.content}
        </Typography>
      </CardContent>
    </Card>
  );
};
