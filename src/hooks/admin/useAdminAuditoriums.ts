export interface Auditorium {
  id: string;
  name: string;
  seats: number;
  type: string;
}

export const useAdminAuditoriums = () => {
  const auditoriums: Auditorium[] = [
    { id: "A1", name: "Phòng 1", seats: 120, type: "2D" },
    { id: "A2", name: "Phòng 2", seats: 140, type: "IMAX" },
    { id: "A3", name: "Phòng 3", seats: 100, type: "4DX" },
  ];

  return {
    data: auditoriums,
    isLoading: false,
    error: null,
  };
};
