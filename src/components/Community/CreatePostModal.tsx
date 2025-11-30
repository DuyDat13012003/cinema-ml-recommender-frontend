import {
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Box,
} from "@mui/material";
import { useState } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  onPost: (content: string, image?: string) => void;
}

export const CreatePostModal = ({ open, onClose, onPost }: Props) => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");

  const submit = () => {
    if (content.trim() === "") return;
    onPost(content, image);
    setContent("");
    setImage("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Tạo bài viết mới</DialogTitle>

      <DialogContent>
        <TextField
          fullWidth
          multiline
          minRows={3}
          label="Bạn đang nghĩ gì?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          sx={{ mt: 2 }}
        />

        <TextField
          fullWidth
          label="URL hình ảnh (kh optional)"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          sx={{ mt: 2 }}
        />

        <Box sx={{ mt: 3, textAlign: "right" }}>
          <Button onClick={submit} variant="contained">
            Đăng bài
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
