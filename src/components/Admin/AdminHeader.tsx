// src/components/Admin/AdminHeader.tsx
import { AppBar, Toolbar, IconButton, Avatar, Menu, MenuItem, Typography, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";

export const AdminHeader = ({ onToggleSidebar }: { onToggleSidebar: () => void }) => {
  const { logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  return (
    <AppBar
      position="fixed"
      sx={{
        background: "#111827",
        left: 0,
        zIndex: 1300, // cao hơn sidebar
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        
        <IconButton onClick={onToggleSidebar} sx={{ color: "white" }}>
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          Admin Dashboard
        </Typography>

        <Box>
          <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
            <Avatar sx={{ bgcolor: "#6d28d9" }}>
              {(localStorage.getItem("email") || "A").slice(0, 1).toUpperCase()}
            </Avatar>
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
          >
            <MenuItem disabled>{localStorage.getItem("email")}</MenuItem>
            <MenuItem onClick={() => logout()}>
              <Typography color="error">Logout</Typography>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
