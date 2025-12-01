// src/pages/MovieDetail/MovieDetail.tsx
import { Box, CircularProgress, Typography, Fade } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { useMovieDetail, useRecommendedMovies } from "../../hooks/useMovies";

import { MovieHeroBanner } from "../../components/Common/MovieDetail/MovieHeroBanner";
import { CastSection } from "../../components/Common/MovieDetail/CastSection";
import { ProductionSection } from "../../components/Common/MovieDetail/ProductionSection";
import { ReviewSection } from "../../components/Common/MovieDetail/ReviewSection";
import { TrailerModal } from "../../components/Common/MovieDetail/TrailerModal";
import { YouMayAlsoLike } from "../../components/Common/MovieDetail/YouMayAlsoLike";

// ⭐ FAVORITES
import { useFavorites } from "../../context/FavoriteContext";

// ⭐ WATCHED
import { useWatched } from "../../context/WatchedContext";

export const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [openTrailer, setOpenTrailer] = useState(false);

  // ⭐ FAVORITES
  const { favorites, toggleFavorite } = useFavorites();

  // ⭐ WATCHED
  const { addWatched, hasWatched } = useWatched();

  // Scroll top mỗi khi đổi phim
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const { data: movieDetail, isLoading } = useMovieDetail(id);
  const { data: recommendedMovies } = useRecommendedMovies(
    movieDetail?.genres,
    id
  );

  const handleBooking = () => navigate(`/booking/${id}`);
  const handleWatchTrailer = () => setOpenTrailer(true);

  const handleSubmitReview = (content: string, rating: number) => {
    console.log("New review submitted:", content, rating);
  };

  // ⭐ Lưu phim đã xem vào WatchedContext
  useEffect(() => {
    if (movieDetail) {
      /*addWatched({
        id: movieDetail.id,
        title: movieDetail.title,
        posterUrl: movieDetail.posterUrl,
        rating: movieDetail.rating,
        genres: movieDetail.genres,
        releaseDate: movieDetail.releaseDate,
      });*/
    }
  }, [movieDetail]);

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", height: "60vh" }}>
        <CircularProgress sx={{ color: "#4299e1" }} />
      </Box>
    );
  }

  if (!movieDetail) {
    return (
      <Typography sx={{ color: "#fff", mt: 4 }}>
        Không tìm thấy phim
      </Typography>
    );
  }

  // ⭐ Kiểm tra phim đã được yêu thích chưa
  const isFavorite = favorites.some((f) => f.id === movieDetail.id);

  return (
    <Fade in timeout={400}>
      <Box sx={{ backgroundColor: "#0f0f1e", minHeight: "100vh" }}>

        {/* ⭐ TRUYỀN FAVORITE + WATCHED xuống Hero Banner */}
        <MovieHeroBanner
          {...movieDetail}
          onBooking={handleBooking}
          onWatchTrailer={handleWatchTrailer}
          onToggleFavorite={() => toggleFavorite(movieDetail)}
          isFavorite={isFavorite}
        />

        {/* CAST */}
        <Box sx={{ py: 3 }}>
          <CastSection cast={movieDetail.cast} />
        </Box>

        {/* PRODUCTION */}
        <Box sx={{ py: 3, backgroundColor: "#151528" }}>
          <ProductionSection production={movieDetail.production} />
        </Box>

        {/* REVIEWS */}
        <Box sx={{ py: 3 }}>
          <ReviewSection
            reviews={movieDetail.reviews}
            onSubmitReview={handleSubmitReview}
          />
        </Box>

        {/* RECOMMENDED */}
        {recommendedMovies && recommendedMovies.length > 0 && (
          <Box sx={{ py: 3, backgroundColor: "#151528" }}>
            <YouMayAlsoLike
              movies={recommendedMovies}
              onViewAll={() => navigate(`/movies/trending`)}
            />
          </Box>
        )}

        {/* TRAILER MODAL */}
        <TrailerModal
          open={openTrailer}
          onClose={() => setOpenTrailer(false)}
          trailerUrl={movieDetail.trailerUrl}
        />
      </Box>
    </Fade>
  );
};
