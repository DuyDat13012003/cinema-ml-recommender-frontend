import { Box, Typography, Grid } from "@mui/material";
import { useReviews } from "../../hooks/useReviews";

import { ReviewFeaturedCard } from "../../components/Review/ReviewFeaturedCard";
import { ReviewCard } from "../../components/Review/ReviewCard";

export const ReviewPage = () => {
  const { data: reviews = [] } = useReviews();

  const featured = reviews.filter((r) => r.isFeatured);
  const community = reviews.filter((r) => !r.isFeatured);

  return (
    <Box sx={{ p: 4, color: "white" }}>
      <Typography variant="h4" fontWeight={800} sx={{ mb: 3 }}>
        🎥 Review Phim
      </Typography>

      {/* ===== FEATURED ===== */}
      <Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>
        Review nổi bật
      </Typography>

      <Grid container spacing={3} sx={{ mb: 5 }}>
        {featured.map((item) => (
          <Grid item xs={12} md={6} key={item.id}>
            <ReviewFeaturedCard item={item} />
          </Grid>
        ))}
      </Grid>

      {/* ===== COMMUNITY REVIEW ===== */}
      <Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>
        Review từ cộng đồng
      </Typography>

      <Grid container spacing={3}>
        {community.map((item) => (
          <Grid item xs={12} md={6} key={item.id}>
            <ReviewCard item={item} />
          </Grid>
        ))}
      </Grid>
    </Box>  
  );
};
