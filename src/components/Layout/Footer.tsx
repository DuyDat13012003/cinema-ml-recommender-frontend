import { Box, Container, Typography, Link } from "@mui/material";
import Grid from "@mui/material/Grid";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import MusicNoteIcon from "@mui/icons-material/MusicNote";

export const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#000",
        color: "#fff",
        py: 8,
        borderTop: "1px solid #222",
        width: "100%",
      }}
    >
      {/* Canh đúng content (chừa sidebar 240px) */}
      <Box sx={{ ml: "240px" }}>
        <Container maxWidth="lg">
          <Grid
            container
            spacing={4}
            sx={{
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            {/* ==== CINEBOOKING ===== */}
            <Grid size={{ xs: 12, sm: 6, md: "auto" }}>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}
              >
                <LocalMoviesIcon sx={{ fontSize: 32, color: "#4299e1" }} />
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Cinebooking
                </Typography>
              </Box>

              <Typography
                sx={{ color: "#aaa", maxWidth: "220px", lineHeight: 1.6 }}
              >
                đặt vé online dễ dàng, nhanh chóng và tiện lợi.
              </Typography>
            </Grid>

            {/* ==== SUPPORT ===== */}
            <Grid size={{ xs: 12, sm: 6, md: "auto" }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                Support
              </Typography>

              {[
                "Trung tâm hỗ trợ",
                "Hướng dẫn đặt vé",
                "Câu hỏi thường gặp",
                "Liên hệ",
              ].map((item) => (
                <Link
                  key={item}
                  href="#"
                  sx={{
                    display: "block",
                    color: "#ccc",
                    textDecoration: "none",
                    mb: 1,
                    "&:hover": { color: "#4299e1" },
                  }}
                >
                  {item}
                </Link>
              ))}
            </Grid>

            {/* ==== COMPANY ===== */}
            <Grid size={{ xs: 12, sm: 6, md: "auto" }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                Company
              </Typography>

              {["Giới thiệu", "Tin tức", "Tuyển dụng", "Điều khoản"].map(
                (item) => (
                  <Link
                    key={item}
                    href="#"
                    sx={{
                      display: "block",
                      color: "#ccc",
                      textDecoration: "none",
                      mb: 1,
                      "&:hover": { color: "#4299e1" },
                    }}
                  >
                    {item}
                  </Link>
                )
              )}
            </Grid>

            {/* ==== FOLLOW US ===== */}
            <Grid size={{ xs: 12, sm: 6, md: "auto" }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                Follow us
              </Typography>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                {[
                  { label: "Facebook", icon: <FacebookIcon /> },
                  { label: "Instagram", icon: <InstagramIcon /> },
                  { label: "Youtube", icon: <YouTubeIcon /> },
                  { label: "TikTok", icon: <MusicNoteIcon /> },
                ].map((item) => (
                  <Link
                    key={item.label}
                    href="#"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      color: "#ccc",
                      textDecoration: "none",
                      fontSize: "0.95rem",
                      "&:hover": {
                        color: "#4299e1",
                      },
                      transition: "0.2s ease",
                    }}
                  >
                    {item.label}
                    {item.icon}
                  </Link>
                ))}
              </Box>
            </Grid>
          </Grid>

          {/* ==== COPYRIGHT ==== */}
          <Box
            sx={{
              borderTop: "1px solid #222",
              mt: 6,
              pt: 3,
              textAlign: "center",
            }}
          >
            <Typography sx={{ color: "#777" }}>
              © 2025 Cinebooking. All Right Reserved
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};
