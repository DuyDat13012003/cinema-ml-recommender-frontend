import { Box, Typography, Avatar, Rating, Button } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { getReviewById } from "../../hooks/useReviews";

export const ReviewDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const review = getReviewById(id!);

  if (!review) {
    return (
      <Box sx={{ color: "white", p: 4 }}>
        <Typography variant="h5">Không tìm thấy review.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ color: "white", p: 4, maxWidth: "900px", mx: "auto" }}>
      {/* TIÊU ĐỀ */}
      <Typography variant="h4" fontWeight={800} sx={{ mb: 3 }}>
        Review: {review.movieTitle}
      </Typography>

      <Box sx={{ display: "flex", gap: 3, mb: 4 }}>
        {/* POSTER */}
        <Box
          sx={{
            width: 200,
            height: 300,
            backgroundImage: `url(${review.moviePoster})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: 2,
            cursor: "pointer",
            "&:hover": { opacity: 0.8 },
          }}
          onClick={() => navigate(`/movie/${review.movieId}`)}
        />

        {/* INFO */}
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="h5"
            fontWeight={700}
            sx={{ cursor: "pointer", "&:hover": { color: "#3b82f6" } }}
            onClick={() => navigate(`/movie/${review.movieId}`)}
          >
            {review.movieTitle}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
            <Avatar
              src={review.user.avatar}
              sx={{ width: 50, height: 50, mr: 2 }}
            />
            <Box>
              <Typography fontWeight={600}>{review.user.name}</Typography>
              <Typography sx={{ opacity: 0.6 }}>{review.date}</Typography>
            </Box>
          </Box>

          {/* RATING */}
          <Box sx={{ mt: 2, display: "flex", alignItems: "center", gap: 1 }}>
            <Rating value={review.rating} precision={0.1} readOnly />
            <Typography>{review.rating.toFixed(1)}/5</Typography>
          </Box>

          {/* LIKES */}
          <Typography sx={{ opacity: 0.7, mt: 1 }}>
            ❤️ {review.likes} người thích bài review này
          </Typography>
        </Box>
      </Box>

      {/* NỘI DUNG REVIEW */}
      <Typography
        sx={{
          whiteSpace: "pre-line",
          fontSize: "18px",
          lineHeight: "1.7",
          opacity: 0.9,
        }}
      >
        {review.content}
      </Typography>

      {/* NÚT QUAY LẠI */}
      <Button
        variant="outlined"
        sx={{
          mt: 4,
          borderColor: "#3b82f6",
          color: "#3b82f6",
          "&:hover": {
            background: "rgba(59,130,246,0.1)",
            borderColor: "#60a5fa",
          },
        }}
        onClick={() => navigate("/review-phim")}
      >
        ← Quay lại danh sách Review
      </Button>
    </Box>
  );
};
