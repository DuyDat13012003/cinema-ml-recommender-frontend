import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

interface CancelTicketModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  ticketId: string;
}

export const CancelTicketModal = ({
  open,
  onClose,
  onConfirm,
  ticketId,
}: CancelTicketModalProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      PaperProps={{
        sx: {
          background: "#151925",
          color: "white",
          borderRadius: "12px",
          p: 2,
        },
      }}
    >
      <DialogTitle>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Xác nhận hủy vé
        </Typography>
      </DialogTitle>

      <DialogContent>
        <Typography>
          Bạn có chắc chắn muốn hủy vé{" "}
          <strong style={{ color: "#ef4444" }}>{ticketId}</strong> không?
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button variant="outlined" onClick={onClose} sx={{ color: "white" }}>
          Đóng
        </Button>

        <Button
          variant="contained"
          color="error"
          onClick={onConfirm}
          sx={{ fontWeight: 600 }}
        >
          Hủy vé
        </Button>
      </DialogActions>
    </Dialog>
  );
};
