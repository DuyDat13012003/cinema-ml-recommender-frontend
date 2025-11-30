// src/pages/Home/Home.tsx
import { Box, Container, CircularProgress, Skeleton, Fade } from "@mui/material";
import { HeroBanner } from "../../components/Common/HeroBanner";
import { MovieCarousel } from "../../components/Common/MovieCarousel";
import { PromotionCarousel } from "../../components/Common/PromotionCarousel";
import { useMovies, useFeaturedMovie } from "../../hooks/useMovies";
import { usePromotions } from "../../hooks/usePromotions";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();

  const { data: featuredMovie, isLoading: loadingFeatured } = useFeaturedMovie();
  const { data: trending, isLoading: loadingTrending } = useMovies("trending");
  const { data: recommended, isLoading: loadingRecommended } = useMovies("recommended");
  const { data: coming, isLoading: loadingComing } = useMovies("coming-soon");
  const { data: promotions, isLoading: loadingPromo } = usePromotions();

  return (
    <Box sx={{ backgroundColor: "#0f0f1e", minHeight: "100vh" }}>
      {loadingFeatured ? (
        <Skeleton variant="rectangular" height={480} sx={{ width: "100%" }} />
      ) : (
        featuredMovie && <HeroBanner {...featuredMovie} />
      )}

      <Container maxWidth="lg" sx={{ mt: 4 }}>
        {!loadingTrending && trending && (
          <Fade in timeout={500}>
            <div>
              <MovieCarousel
                title="Đang hot"
                movies={trending}
                onViewAll={() => navigate("/phim-chieu", { state: { tab: "hot" } })}
              />
            </div>
          </Fade>
        )}

        {!loadingRecommended && recommended && (
          <Fade in timeout={500}>
            <div>
              <MovieCarousel
                title="Gợi ý cho bạn"
                movies={recommended}
                onViewAll={() => navigate("/phim-chieu", { state: { tab: "recommended" } })}
              />
            </div>
          </Fade>
        )}

        {!loadingComing && coming && (
          <Fade in timeout={500}>
            <div>
              <MovieCarousel
                title="Sắp chiếu"
                movies={coming}
                showBookingButton={false}
                onViewAll={() => navigate("/phim-chieu", { state: { tab: "coming-soon" } })}
              />
            </div>
          </Fade>
        )}

        {!loadingPromo && promotions && (
          <Fade in timeout={500}>
            <Box sx={{ mt: 6 }}>
              <PromotionCarousel
                promotions={promotions}
                onViewAll={() => navigate("/phim-chieu", { state: { tab: "promotions" } })}
              />
            </Box>
          </Fade>
        )}
      </Container>
    </Box>
  );
};
