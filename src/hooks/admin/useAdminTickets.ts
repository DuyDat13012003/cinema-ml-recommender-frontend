import { useMemo, useState } from "react";
import dayjs from "dayjs";

// ======================= TYPES =======================
export type TicketStatus = "confirmed" | "pending" | "cancelled";

export interface Ticket {
  id: string;
  customer: string;
  email: string;
  movie: string;
  showtime: string; // dạng "10/11/2025 14:30"
  room: string;
  seats: string;
  price: number;
  status: TicketStatus;
}

// ======================= MOCK DATA =======================
const mockTickets: Ticket[] = [
  {
    id: "TK001247",
    customer: "Nguyễn Văn A",
    email: "nguyenvana@email.com",
    movie: "Godzilla x Kong",
    showtime: "2025-11-10 14:30",
    room: "P1",
    seats: "A5, A6",
    price: 180000,
    status: "confirmed",
  },
  {
    id: "TK001248",
    customer: "Trần Thị B",
    email: "tranthib@email.com",
    movie: "Dune: Part Two",
    showtime: "2025-11-10 15:00",
    room: "P3",
    seats: "D7, D8",
    price: 200000,
    status: "confirmed",
  },
  {
    id: "TK001249",
    customer: "Lê Văn C",
    email: "levanc@email.com",
    movie: "Kung Fu Panda 4",
    showtime: "2025-11-10 15:30",
    room: "P2",
    seats: "C3, C4, C5",
    price: 240000,
    status: "pending",
  },
  {
    id: "TK001250",
    customer: "Phạm Thị D",
    email: "phamthid@email.com",
    movie: "Civil War",
    showtime: "2025-11-10 16:00",
    room: "P4",
    seats: "H8, H9",
    price: 220000,
    status: "cancelled",
  },
  {
    id: "TK001251",
    customer: "Hoàng Văn E",
    email: "hoangvane@email.com",
    movie: "Godzilla x Kong",
    showtime: "2025-11-10 18:00",
    room: "P1",
    seats: "E10, E11",
    price: 220000,
    status: "confirmed",
  },
];

// ======================= FILTER OPTIONS =======================
export type DateFilter =
  | "today"
  | "yesterday"
  | "last7days"
  | "thisMonth"
  | "lastMonth"
  | "all";

// ======================= MAIN HOOK =======================
export const useAdminTickets = () => {
  const [filterDate, setFilterDate] = useState<DateFilter>("all");
  const [filterStatus, setFilterStatus] = useState<"all" | TicketStatus>("all");
  const [search, setSearch] = useState("");

  // ======================= FILTER BY DATE =======================
  const filterByDate = (ticket: Ticket) => {
    const t = dayjs(ticket.showtime);
    const today = dayjs();

    switch (filterDate) {
      case "today":
        return t.isSame(today, "day");

      case "yesterday":
        return t.isSame(today.subtract(1, "day"), "day");

      case "last7days":
        return t.isAfter(today.subtract(7, "day"));

      case "thisMonth":
        return t.isSame(today, "month");

      case "lastMonth":
        return t.isSame(today.subtract(1, "month"), "month");

      default:
        return true;
    }
  };

  // ======================= FILTERED RESULTS =======================
  const filteredTickets = useMemo(() => {
    return mockTickets.filter((t) => {
      const matchDate = filterByDate(t);
      const matchStatus =
        filterStatus === "all" || t.status === filterStatus;
      const matchSearch =
        t.id.toLowerCase().includes(search.toLowerCase()) ||
        t.customer.toLowerCase().includes(search.toLowerCase()) ||
        t.movie.toLowerCase().includes(search.toLowerCase());

      return matchDate && matchStatus && matchSearch;
    });
  }, [filterDate, filterStatus, search]);

  // ======================= STATISTICS =======================
  const stats = useMemo(() => {
    return {
      total: filteredTickets.length,
      confirmed: filteredTickets.filter((t) => t.status === "confirmed").length,
      pending: filteredTickets.filter((t) => t.status === "pending").length,
      cancelled: filteredTickets.filter((t) => t.status === "cancelled").length,
      totalRevenue: filteredTickets.reduce((sum, t) => sum + t.price, 0),
    };
  }, [filteredTickets]);

  return {
    tickets: filteredTickets,
    stats,
    filterDate,
    setFilterDate,
    filterStatus,
    setFilterStatus,
    search,
    setSearch,
  };
};
