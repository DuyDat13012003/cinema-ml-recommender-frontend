// src/pages/Admin/Cinemas/CinemaDetail.tsx
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
  Card,
  CardContent,
  IconButton,
} from "@mui/material";

import { useParams } from "react-router-dom";
import { useAdminCinemas } from "../../../hooks/admin/useAdminCinemas";

import { EditCinemaModal } from "../../../components/Admin/Cinemas/EditCinemaModal";
import { AddCinemaModal } from "../../../components/Admin/Cinemas/AddCinemaModal";

import { AddMovieModal } from "../../../components/Admin/Movies/AddMovieModal";
import { EditMovieModal } from "../../../components/Admin/Movies/EditMovieModal";

import { DeleteConfirm } from "../../../components/Common/DeleteConfirm";

import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { useState, useRef, useMemo } from "react";

export const CinemaDetail = () => {
  const { id } = useParams();
  const { data: cinemas } = useAdminCinemas();

  const [selectedId, setSelectedId] = useState(id);
  const cinema = useMemo(
    () => cinemas?.find((c) => c.id === selectedId),
    [selectedId, cinemas]
  );

  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [addCinemaOpen, setAddCinemaOpen] = useState(false);
  const [addMovieOpen, setAddMovieOpen] = useState(false);
  const [editMovieOpen, setEditMovieOpen] = useState(false);

  const [selectedMovie, setSelectedMovie] = useState<any>(null);

  const scrollRef = useRef<HTMLDivElement>(null);

  if (!cinema)
    return (
      <Typography sx={{ color: "white", mt: 4, fontSize: 24 }}>
        Không tìm thấy rạp
      </Typography>
    );

  return (
    <Box sx={{ color: "white", width: "100%", maxWidth: "100%" }}>
      {/* ================= HEADER ================= */}
      <Typography variant="h4" sx={{ fontWeight: 700 }}>
        Quản Lý Rạp
      </Typography>
      <Typography sx={{ opacity: 0.7, mb: 3 }}>
        Quản lý thông tin rạp và các phim đang chiếu
      </Typography>

      {/* ================= SELECT RẠP ================= */}
      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <TextField
          select
          value={selectedId}
          onChange={(e) => setSelectedId(e.target.value)}
          sx={{
            background: "#1b1f2e",
            borderRadius: "8px",
            minWidth: 300,
            ".MuiSelect-select": { color: "white" },
          }}
        >
          {cinemas?.map((c) => (
            <MenuItem key={c.id} value={c.id}>
              {c.name} – {c.city}
            </MenuItem>
          ))}
        </TextField>

        <Button
          variant="contained"
          sx={{ whiteSpace: "nowrap" }}
          onClick={() => setAddCinemaOpen(true)}
        >
          + Thêm Rạp Mới
        </Button>
      </Box>

      {/* ================= THÔNG TIN RẠP ================= */}
      <Card
        sx={{
          background: "#151925",
          p: 3,
          mb: 4,
          borderRadius: "12px",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", gap: 3 }}>
            <img
              src={cinema.image}
              width="350"
              height="210"
              style={{
                objectFit: "cover",
                borderRadius: "12px",
              }}
            />

            <Box>
              <Box
                sx={{
                  background: "#22c55e",
                  px: 2,
                  py: "4px",
                  borderRadius: "6px",
                  display: "inline-block",
                  mb: 1,
                }}
              >
                Hoạt động
              </Box>

              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                {cinema.name}
              </Typography>

              <Typography sx={{ opacity: 0.7, mt: 1 }}>
                {cinema.description}
              </Typography>

              <Box sx={{ mt: 2, lineHeight: 1.8 }}>
                <Typography>
                  📍 <b>Địa chỉ:</b> {cinema.address}
                </Typography>
                <Typography>
                  ☎ <b>Số điện thoại:</b> {cinema.phone}
                </Typography>
                <Typography>
                  ✉ <b>Email:</b> {cinema.email}
                </Typography>
                <Typography>
                  ⏰ <b>Giờ hoạt động:</b> {cinema.openingHours}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", gap: 4, mt: 2 }}>
                <Typography>
                  🎬 <b>Phòng chiếu:</b> {cinema.rooms}
                </Typography>

                <Typography>
                  💺 <b>Tổng ghế:</b> {cinema.seats}
                </Typography>

                <Typography>
                  🎞 <b>Phim đang chiếu:</b> {cinema.movies.length}
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              gap: 2,
              flexDirection: "column",
              justifyContent: "flex-start",
            }}
          >
            <Button variant="contained" onClick={() => setEditOpen(true)}>
              Sửa
            </Button>

            <Button
              variant="contained"
              color="error"
              onClick={() => setDeleteOpen(true)}
            >
              Xóa
            </Button>
          </Box>
        </Box>
      </Card>

      {/* ================= CAROUSEL PHIM ================= */}
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
        Phim đang chiếu tại {cinema.name}
      </Typography>

      <Button
        variant="contained"
        sx={{ mb: 3 }}
        onClick={() => setAddMovieOpen(true)}
      >
        + Thêm Phim
      </Button>

      {/* ⭐ CAROUSEL FIX FULL WIDTH + FIX CARD CUỐI NHỎ */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          maxWidth: "100%",
          overflow: "hidden",
          pb: 2,
        }}
      >
        {/* BUTTON TRÁI */}
        <IconButton
          onClick={() =>
            scrollRef.current?.scrollBy({ left: -400, behavior: "smooth" })
          }
          sx={{
            position: "absolute",
            left: 0,
            top: "45%",
            zIndex: 10,
            color: "white",
            background: "#1e293b",
            ":hover": { background: "#334155" },
          }}
        >
          <ArrowBackIos />
        </IconButton>

        {/* CAROUSEL */}
        <Box
          ref={scrollRef}
          sx={{
            display: "flex",
            gap: 3,
            overflowX: "auto",
            scrollBehavior: "smooth",
            "&::-webkit-scrollbar": { display: "none" },
            width: "100%",
            maxWidth: "100%",
          }}
        >
          {cinema.movies.map((m) => (
            <Card
              key={m.id}
              sx={{
                flex: "0 0 280px", // ⭐ cố định width, không co card cuối
                minWidth: 280,
                maxWidth: 280,
                background: "#151925",
                borderRadius: "10px",
                overflow: "hidden",
              }}
            >
              <img
                src={m.image}
                alt={m.title}
                style={{
                  width: "100%",
                  height: "220px",
                  objectFit: "cover",
                }}
              />

              <CardContent>
                <Typography variant="h6">{m.title}</Typography>
                <Typography sx={{ opacity: 0.7 }}>{m.category}</Typography>
                <Typography sx={{ opacity: 0.8, mt: 1 }}>
                  {m.duration} phút
                </Typography>

                <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() => {
                      setSelectedMovie(m);
                      setEditMovieOpen(true);
                    }}
                  >
                    Sửa
                  </Button>

                  <Button
                    fullWidth
                    variant="contained"
                    color="error"
                    onClick={() => setDeleteOpen(true)}
                  >
                    Xóa
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* BUTTON PHẢI */}
        <IconButton
          onClick={() =>
            scrollRef.current?.scrollBy({ left: 400, behavior: "smooth" })
          }
          sx={{
            position: "absolute",
            right: 0,
            top: "45%",
            zIndex: 10,
            color: "white",
            background: "#1e293b",
            ":hover": { background: "#334155" },
          }}
        >
          <ArrowForwardIos />
        </IconButton>
      </Box>

      {/* ================= MODALS ================= */}
      <EditCinemaModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        cinema={cinema}
        onSave={(data) => console.log("save cinema", data)}
      />

      <AddCinemaModal
        open={addCinemaOpen}
        onClose={() => setAddCinemaOpen(false)}
        onCreate={(data) => console.log("new cinema:", data)}
      />

      <AddMovieModal
        open={addMovieOpen}
        onClose={() => setAddMovieOpen(false)}
        onCreate={(data) => {
          console.log("Movie created:", data);
          setAddMovieOpen(false);
        }}
      />

      <EditMovieModal
        open={editMovieOpen}
        onClose={() => setEditMovieOpen(false)}
        movie={selectedMovie}
        onSave={(updatedMovie) => {
          console.log("Cập nhật phim:", updatedMovie);
          setEditMovieOpen(false);
        }}
      />

      <DeleteConfirm
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={() => console.log("Deleted!")}
      />
    </Box>
  );
};
