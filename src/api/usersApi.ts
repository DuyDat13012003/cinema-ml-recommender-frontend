// ==========================
// MOCK API CHUẨN BACKEND
// ==========================

export type UserRole = "Khách hàng" | "Nhân viên" | "Quản trị viên";
export type UserStatus = "active" | "inactive";

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatarUrl?: string;
  joinDate: string;
  totalTickets: number;
  totalSpent: number;
  status: UserStatus;
}

// ==========================
// MOCK 30 USER
// ==========================

const roles: UserRole[] = ["Khách hàng", "Nhân viên", "Quản trị viên"];
const statuses: UserStatus[] = ["active", "inactive"];

const randomAvatar = (i: number) => `https://i.pravatar.cc/150?img=${i}`;

const mockUsers: User[] = Array.from({ length: 30 }).map((_, i) => {
  const role =
    i % 10 === 0
      ? "Quản trị viên"
      : i % 5 === 0
      ? "Nhân viên"
      : "Khách hàng";

  return {
    id: (i + 1).toString(),
    name: `Người dùng ${i + 1}`,
    email: `user${i + 1}@gmail.com`,
    phone: `09${Math.floor(10000000 + Math.random() * 89999999)}`,
    role,
    avatarUrl: randomAvatar(i + 1),
    joinDate: `2025-0${(i % 9) + 1}-${(i % 28) + 1}`,
    totalTickets: Math.floor(Math.random() * 30),
    totalSpent: Math.floor(Math.random() * 5000000),
    status: statuses[Math.floor(Math.random() * statuses.length)],
  };
});

// ==========================
// API-LIKE FUNCTIONS
// ==========================

interface QueryParams {
  role?: UserRole | "Tất cả";
  search?: string;
}

export const usersApi = {
  // ⭐ GET LIST USERS WITH FILTER + SEARCH
  async getUsers(params: QueryParams = {}): Promise<User[]> {
    const { role = "Tất cả", search = "" } = params;

    let result = [...mockUsers];

    // Filter theo role
    if (role !== "Tất cả") {
      result = result.filter((u) => u.role === role);
    }

    // Search theo tên hoặc email
    if (search.trim() !== "") {
      const lower = search.toLowerCase();
      result = result.filter(
        (u) =>
          u.name.toLowerCase().includes(lower) ||
          u.email.toLowerCase().includes(lower)
      );
    }

    return new Promise((resolve) =>
      setTimeout(() => resolve(result), 300)
    ); // delay 300ms cho giống API
  },

  // ⭐ GET USER BY ID
  async getUserById(id: string): Promise<User | undefined> {
    return mockUsers.find((u) => u.id === id);
  },

  // ⭐ UPDATE USER
  async updateUser(id: string, data: Partial<User>): Promise<User | undefined> {
    const index = mockUsers.findIndex((u) => u.id === id);
    if (index === -1) return undefined;

    mockUsers[index] = {
      ...mockUsers[index],
      ...data,
    };

    return mockUsers[index];
  },

  // ⭐ DELETE USER
  async deleteUser(id: string): Promise<boolean> {
    const index = mockUsers.findIndex((u) => u.id === id);
    if (index === -1) return false;

    mockUsers.splice(index, 1);
    return true;
  },

  // ⭐ SUMMARY STATS
  async getUserStats() {
    const total = mockUsers.length;
    const customers = mockUsers.filter((u) => u.role === "Khách hàng").length;
    const staff = mockUsers.filter((u) => u.role === "Nhân viên").length;
    const admins = mockUsers.filter((u) => u.role === "Quản trị viên").length;

    return {
      total,
      customers,
      staff,
      admins,
    };
  },
};
