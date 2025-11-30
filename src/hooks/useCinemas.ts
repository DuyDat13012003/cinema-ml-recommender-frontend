// src/hooks/useCinemas.ts
import { useQuery } from "@tanstack/react-query";

export const useCinemas = () => {
  return useQuery({
    queryKey: ["cinemas"],
    queryFn: async () => {
      // Mock chuẩn để khớp với showtimesMock
      return [
        { id: "cinema1", name: "CGV Vincom", address: "Vincom Đồng Khởi", distance: 2 },
        { id: "cinema2", name: "BHD Bitexco", address: "Bitexco Tower", distance: 4 },
        { id: "cinema3", name: "Galaxy Nguyễn Du", address: "116 Nguyễn Du", distance: 5 },
      ];
    },
    staleTime: 300000,
  });
};
