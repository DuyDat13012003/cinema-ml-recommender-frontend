// ======================== CreatePostBar.tsx ========================
import { Box, Avatar, Button } from "@mui/material";

export const CreatePostBar = ({ onClick }: { onClick: () => void }) => {
  return (
    <Box
      sx={{
        background: "rgba(255,255,255,0.05)",
        borderRadius: 4,
        p: 2,
        display: "flex",
        alignItems: "center",
        gap: 2,
        cursor: "pointer",
        "&:hover": { background: "rgba(255,255,255,0.08)" },
      }}
      onClick={onClick}
    >
      <Avatar src="https://i.pravatar.cc/150?img=12" />
      <Box
        sx={{
          flex: 1,
          background: "rgba(255,255,255,0.08)",
          borderRadius: 3,
          p: 1.4,
          color: "#aaa",
        }}
      >
        Bạn đang nghĩ gì?
      </Box>
    </Box>
  );
};
