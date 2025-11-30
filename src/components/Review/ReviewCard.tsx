import {
  Box,
  Typography,
  Avatar,
  Card,
  Rating,
  IconButton,
} from "@mui/material";

import { ReviewItem } from "../../hooks/useReviews";
import { useNavigate } from "react-router-dom";

interface Props {
  item: ReviewItem;
}

export const ReviewCard = ({ item }: Props) => {
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        background: "rgba(255,255,255,0.05)",
        borderRadius: 2,
        p: 2,
        color: "white",
        border: "1px solid rgba(255,255,255,0.1)",
        transition: "0.3s",
        cursor: "pointer",
        "&:hover": {
          borderColor: "#4299e1",
          boxShadow: "0 0 20px rgba(66,153,225,0.5)",
        },
      }}

      // ⭐ Click vào card → Mở ReviewDetail
      onClick={() => navigate(`/review/${item.id}`)}
    >
      <Box sx={{ display: "flex", gap: 2 }}>
        {/* ⭐ Avatar → MovieDetail */}
        <Avatar
          src={item.moviePoster}
          sx={{ width: 50, height: 50, cursor: "pointer" }}
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/movie/${item.movieId}`);
          }}
        />

        <Box sx={{ flex: 1 }}>
          {/* ⭐ Tên người review → không cần điều hướng */}
          <Typography fontWeight={600}>{item.user.name}</Typography>

          <Rating value={item.rating} precision={0.1} readOnly sx={{ mt: 0.5 }} />

          {/* ⭐ Nội dung review → click card */}
          <Typography
            sx={{
              opacity: 0.8,
              mt: 1,
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {item.content}
          </Typography>

          {/* ⭐ Tên phim → MovieDetail */}
          <Typography
            sx={{ mt: 1, opacity: 0.6, cursor: "pointer" }}
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/movie/${item.movieId}`);
            }}
          >
            🎬 {item.movieTitle} • {item.date}
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};

