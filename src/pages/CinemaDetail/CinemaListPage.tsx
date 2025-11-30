import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  Rating,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useCinemas } from "../../hooks/useCinemas";
import { useCinemaDetail } from "../../hooks/useCinemaDetail";

export const CinemaListPage = () => {
  const { data: cinemas } = useCinemas();
  const navigate = useNavigate();

  return (
    <Box sx={{ color: "white", p: 4 }}>
      <Typography variant="h4" fontWeight={800} sx={{ mb: 4 }}>
        🎬 Danh Sách Rạp Chiếu
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: 3,
        }}
      >
        {(cinemas ?? []).map((cinema) => {
          const { data: detail } = useCinemaDetail(cinema.id);

          return (
            <Card
              key={cinema.id}
              sx={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "16px",
                overflow: "hidden",
                cursor: "pointer",
                transition: "0.25s",
                "&:hover": {
                  transform: "translateY(-5px)",
                  borderColor: "#3b82f6",
                  boxShadow: "0 0 15px rgba(59,130,246,0.4)",
                },
              }}
              onClick={() => navigate(`/cinema/${cinema.id}`)}
            >
              {/* Thumbnail */}
              <CardMedia
                component="img"
                height="180"
                image={detail?.banner}
                alt={cinema.name}
              />

              <CardContent sx={{ color: "white" }}>
                <Typography variant="h6" fontWeight={700}>
                  {cinema.name}
                </Typography>

                <Typography sx={{ opacity: 0.7, mt: 0.5 }}>
                  📍 {cinema.address}
                </Typography>

                <Stack direction="row" alignItems="center" gap={1} sx={{ mt: 1 }}>
                  <Rating
                    value={detail?.rating ?? 4}
                    precision={0.1}
                    readOnly
                    size="small"
                  />
                  <Typography sx={{ opacity: 0.7, fontSize: "14px" }}>
                    {detail?.rating ?? 4}/5
                  </Typography>
                </Stack>

                <Button
                  variant="outlined"
                  sx={{
                    mt: 2,
                    color: "#3b82f6",
                    borderColor: "#3b82f6",
                    "&:hover": {
                      borderColor: "#60a5fa",
                      background: "rgba(59,130,246,0.15)",
                    },
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/cinema/${cinema.id}`);
                  }}
                >
                  Xem chi tiết
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </Box>
    </Box>
  );
};
