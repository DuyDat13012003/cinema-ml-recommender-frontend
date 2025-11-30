// src/components/Admin/Promotions/PromotionFilterBar.tsx
import { Box, Tabs, Tab } from "@mui/material";

interface Props {
  tab: string;
  onChange: (v: string) => void;
}

export const PromotionFilterBar = ({ tab, onChange }: Props) => {
  return (
    <Box sx={{ mb: 3 }}>
      <Tabs
        value={tab}
        onChange={(_, v) => onChange(v)}
        textColor="inherit"
        TabIndicatorProps={{
          style: { backgroundColor: "#3b82f6" },
        }}
        sx={{
          "& .MuiTab-root": {
            color: "#ccc",
            textTransform: "none",
            fontSize: 16,
            "&.Mui-selected": { color: "#fff", fontWeight: 600 },
          },
        }}
      >
        <Tab label="Tất cả" value="all" />
        <Tab label="Đang diễn ra" value="active" />
        <Tab label="Sắp diễn ra" value="upcoming" />
        <Tab label="Đã kết thúc" value="expired" />
        <Tab label="Flash Sale" value="flash" />
      </Tabs>
    </Box>
  );
};
