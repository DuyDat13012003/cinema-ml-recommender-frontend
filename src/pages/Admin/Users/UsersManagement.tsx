import {
  Box,
  Typography,
  Button,
  Tabs,
  Tab,
  TextField,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

import { useState } from "react";
import { useUsers } from "../../../hooks/useUsers";
import { User } from "../../../api/usersApi";

import { UserViewModal } from "../../../components/Admin/Users/UserViewModal";
import { UserEditModal } from "../../../components/Admin/Users/UserEditModal";

const roles = [
  "Tất cả",
  "Khách hàng",
  "Nhân viên",
  "Quản trị viên",
] as const;

export const UsersManagement = () => {
  const [tab, setTab] = useState<"Tất cả" | "Khách hàng" | "Nhân viên" | "Quản trị viên">("Tất cả");
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [deleteUser, setDeleteUser] = useState<User | null>(null);

  const { users, stats, isLoading, deleteUser: deleteUserApi } = useUsers({
    role: tab,
    search,
  });

  // ============================
  // EXPORT CSV
  // ============================
  const handleExportCSV = () => {
    const header = [
      "ID",
      "Tên",
      "Email",
      "Số điện thoại",
      "Vai trò",
      "Trạng thái",
      "Ngày tham gia",
      "Tổng vé",
      "Tổng chi tiêu",
    ];

    const rows = users.map((u) => [
      u.id,
      u.name,
      u.email,
      u.phone,
      u.role,
      u.status,
      u.joinDate,
      u.totalTickets,
      u.totalSpent,
    ]);

    const csv =
      header.join(",") +
      "\n" +
      rows.map((r) => r.join(",")).join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "users.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  // ============================
  // DELETE CONFIRM
  // ============================
  const confirmDelete = async () => {
    if (!deleteUser) return;

    await deleteUserApi(deleteUser.id);
    setDeleteUser(null);
  };

  // ============================
  // BADGE ROLE
  // ============================
  const renderRoleBadge = (role: string) => {
    const map: Record<string, string> = {
      "Khách hàng": "#3b82f6",
      "Nhân viên": "#10b981",
      "Quản trị viên": "#ef4444",
    };

    return (
      <Chip
        label={role}
        sx={{
          backgroundColor: map[role],
          color: "white",
          fontWeight: 600,
        }}
      />
    );
  };

  // ============================
  // STATUS BADGE
  // ============================
  const renderStatusBadge = (status: string) => (
    <Chip
      label={status === "active" ? "Đang hoạt động" : "Vô hiệu hóa"}
      sx={{
        backgroundColor: status === "active" ? "#4ade80" : "#ef4444",
        color: "#000",
        fontWeight: 600,
      }}
    />
  );

  return (
    <Box sx={{ color: "white", p: 3 }}>
      <Typography variant="h4" fontWeight={800} sx={{ mb: 3 }}>
        👥 Quản lý người dùng
      </Typography>

      {/* ============================ */}
      {/* STATS CARDS */}
      {/* ============================ */}
      <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
        <Paper sx={{ p: 2, background: "#1e293b", flex: 1 }}>
          <Typography>Tổng người dùng</Typography>
          <Typography variant="h5">{stats?.total ?? 0}</Typography>
        </Paper>

        <Paper sx={{ p: 2, background: "#1e293b", flex: 1 }}>
          <Typography>Khách hàng</Typography>
          <Typography variant="h5">{stats?.customers ?? 0}</Typography>
        </Paper>

        <Paper sx={{ p: 2, background: "#1e293b", flex: 1 }}>
          <Typography>Nhân viên</Typography>
          <Typography variant="h5">{stats?.staff ?? 0}</Typography>
        </Paper>

        <Paper sx={{ p: 2, background: "#1e293b", flex: 1 }}>
          <Typography>Quản trị viên</Typography>
          <Typography variant="h5">{stats?.admins ?? 0}</Typography>
        </Paper>
      </Box>

      {/* ============================ */}
      {/* TABS */}
      {/* ============================ */}
      <Tabs
        value={tab}
        onChange={(e, newValue) => setTab(newValue)}
        sx={{
          mb: 3,
          "& .MuiTab-root": { color: "#fff", textTransform: "none" },
          "& .Mui-selected": { color: "#3b82f6" },
          "& .MuiTabs-indicator": { backgroundColor: "#3b82f6" },
        }}
      >
        {roles.map((r) => (
          <Tab key={r} label={r} value={r} />
        ))}
      </Tabs>

      {/* ============================ */}
      {/* SEARCH + EXPORT */}
      {/* ============================ */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 3, gap: 2 }}>
        <TextField
          placeholder="Tìm kiếm người dùng..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: <SearchIcon sx={{ mr: 1 }} />,
          }}
          sx={{
            input: { color: "white" },
            width: "300px",
            background: "#1e293b",
            borderRadius: 1,
          }}
        />

        <Button
          variant="outlined"
          sx={{
            borderColor: "#3b82f6",
            color: "#3b82f6",
            "&:hover": {
              background: "rgba(59,130,246,0.2)",
              borderColor: "#60a5fa",
            },
          }}
          onClick={handleExportCSV}
          startIcon={<FileDownloadIcon />}
        >
          Xuất CSV
        </Button>
      </Box>

      {/* ============================ */}
      {/* TABLE */}
      {/* ============================ */}
      <TableContainer component={Paper} sx={{ background: "#1e293b" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "#fff" }}>Người dùng</TableCell>
              <TableCell sx={{ color: "#fff" }}>Email</TableCell>
              <TableCell sx={{ color: "#fff" }}>Số điện thoại</TableCell>
              <TableCell sx={{ color: "#fff" }}>Vai trò</TableCell>
              <TableCell sx={{ color: "#fff" }}>Tổng vé</TableCell>
              <TableCell sx={{ color: "#fff" }}>Tổng chi tiêu</TableCell>
              <TableCell sx={{ color: "#fff" }}>Ngày tham gia</TableCell>
              <TableCell sx={{ color: "#fff" }}>Trạng thái</TableCell>
              <TableCell sx={{ color: "#fff" }}>Hành động</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={10} sx={{ color: "white", textAlign: "center" }}>
                  Đang tải dữ liệu...
                </TableCell>
              </TableRow>
            ) : users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={10} sx={{ color: "white", textAlign: "center" }}>
                  Không có người dùng trong mục này.
                </TableCell>
              </TableRow>
            ) : (
              users.map((u) => (
                <TableRow key={u.id}>
                  <TableCell sx={{ color: "white" }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <img
                        src={u.avatarUrl}
                        alt=""
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: "50%",
                        }}
                      />
                      {u.name}
                    </Box>
                  </TableCell>

                  <TableCell sx={{ color: "white" }}>{u.email}</TableCell>
                  <TableCell sx={{ color: "white" }}>{u.phone}</TableCell>
                  <TableCell>{renderRoleBadge(u.role)}</TableCell>
                  <TableCell sx={{ color: "white" }}>{u.totalTickets}</TableCell>
                  <TableCell sx={{ color: "white" }}>{u.totalSpent.toLocaleString()}đ</TableCell>
                  <TableCell sx={{ color: "white" }}>{u.joinDate}</TableCell>
                  <TableCell>{renderStatusBadge(u.status)}</TableCell>

                  {/* ACTION BUTTONS */}
                  <TableCell>
                    <IconButton onClick={() => setSelectedUser(u)}>
                      <VisibilityIcon sx={{ color: "#3b82f6" }} />
                    </IconButton>

                    <IconButton onClick={() => setEditUser(u)}>
                      <EditIcon sx={{ color: "#10b981" }} />
                    </IconButton>

                    <IconButton onClick={() => setDeleteUser(u)}>
                      <DeleteIcon sx={{ color: "#ef4444" }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* ============================ */}
      {/* VIEW MODAL */}
      {/* ============================ */}
      {selectedUser && (
        <UserViewModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}

      {/* ============================ */}
      {/* EDIT MODAL */}
      {/* ============================ */}
      {editUser && (
        <UserEditModal
          user={editUser}
          onClose={() => setEditUser(null)}
        />
      )}

      {/* ============================ */}
      {/* DELETE CONFIRM */}
      {/* ============================ */}
      <Dialog open={!!deleteUser} onClose={() => setDeleteUser(null)}>
        <DialogTitle>Xóa người dùng?</DialogTitle>
        <DialogContent>Bạn có chắc muốn xóa người dùng này?</DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteUser(null)}>Hủy</Button>
          <Button color="error" onClick={confirmDelete}>
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
