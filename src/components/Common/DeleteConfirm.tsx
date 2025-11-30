import { Dialog, DialogTitle, DialogActions, Button } from "@mui/material";

interface DeleteConfirmProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const DeleteConfirm = ({
  open,
  onClose,
  onConfirm,
}: DeleteConfirmProps) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Bạn có chắc muốn xóa?</DialogTitle>

      <DialogActions>
        <Button onClick={onClose}>Hủy</Button>
        <Button color="error" onClick={onConfirm} variant="contained">
          Xóa
        </Button>
      </DialogActions>
    </Dialog>
  );
};
