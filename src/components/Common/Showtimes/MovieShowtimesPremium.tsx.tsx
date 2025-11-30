import { Box, Chip, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const MovieShowtimesPremium = ({ movie, showtimes }: any) => {
  const navigate = useNavigate();

  const handlePosterClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  return (
    <Box
      sx={{
        background: "rgba(255,255,255,0.03)",
        borderRadius: "18px",
        border: "1px solid rgba(255,255,255,0.08)",
        p: 3,
        mb: 4,
        transition: "0.3s",
        "&:hover": {
          borderColor: "#3b82f6",
          boxShadow: "0 0 25px rgba(59,130,246,0.4)",
        },
      }}
    >

      {/* Poster + Info */}
      <Box sx={{ display: "flex", gap: 3 }}>
        <Box
          onClick={handlePosterClick}
          sx={{
            width: 140,
            height: 200,
            borderRadius: "12px",
            backgroundImage: `url(${movie.posterUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            flexShrink: 0,
            cursor: "pointer",
          }}
        />

        <Box>
          <Typography variant="h5" fontWeight={800} sx={{ cursor: "pointer" }} onClick={handlePosterClick}>
            {movie.title}
          </Typography>

          <Typography sx={{ color: "#aaa", mb: 1 }}>
            {movie.genres.join(" / ")} • {movie.ageRating}
          </Typography>

          <Chip
            label={`${movie.duration} phút`}
            size="small"
            sx={{ background: "rgba(255,255,255,0.1)", color: "white" }}
          />
        </Box>
      </Box>


      {/* Showtime Buttons */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))",
          gap: 2,
          mt: 3,
        }}
      >
        {showtimes.map((st: any) => (
          <Box
            key={st.id}
            sx={{
              borderRadius: "12px",
              padding: "12px",
              background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.15)",
              cursor: "pointer",
              transition: "0.25s",
              "&:hover": {
                background: "rgba(59,130,246,0.2)",
                borderColor: "#3b82f6",
              },
            }}
            onClick={() => navigate(`/booking/${st.id}`)}
          >
            <Typography fontWeight={700} fontSize="18px">
              {st.time}
            </Typography>

            <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
              <Chip label={st.format} color="primary" size="small" />
              <Chip label={st.language} variant="outlined" size="small" />
            </Box>

            <Typography sx={{ color: "#3b82f6", fontWeight: 600, mt: 1 }}>
              {st.basePrice.toLocaleString()}đ
            </Typography>

            <Typography sx={{ fontSize: "13px", color: "#aaa" }}>
              {st.availableSeats} ghế trống
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
