import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface TicketDetailModalProps {
  open: boolean;
  onClose: () => void;
  ticket: any;
}

export const TicketDetailModal = ({
  open,
  onClose,
  ticket,
}: TicketDetailModalProps) => {
  if (!ticket) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          background: "#151925",
          color: "white",
          borderRadius: "12px",
          p: 2,
        },
      }}
    >
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Chi tiết vé – {ticket.id}
        </Typography>

        <IconButton onClick={onClose} sx={{ color: "white" }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Box sx={{ lineHeight: 2 }}>
          <Typography>
            <b>Khách hàng:</b> {ticket.customer}
          </Typography>
          <Typography sx={{ opacity: 0.7 }}>{ticket.email}</Typography>

          <Typography sx={{ mt: 2 }}>
            <b>Phim:</b> {ticket.movie}
          </Typography>

          <Typography>
            <b>Suất chiếu:</b> {ticket.showtime} – {ticket.room}
          </Typography>

          <Typography>
            <b>Ghế:</b> {ticket.seats}
          </Typography>

          <Typography sx={{ mt: 2 }}>
            <b>Tổng tiền:</b> {ticket.price.toLocaleString()} đ
          </Typography>

          <Typography>
            <b>Trạng thái:</b>{" "}
            <span style={{ color: "#3b82f6" }}>{ticket.status}</span>
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
