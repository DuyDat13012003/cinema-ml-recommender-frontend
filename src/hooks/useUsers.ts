import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { usersApi, User, UserRole } from "../api/usersApi";

interface UseUsersParams {
  role: UserRole | "Tất cả";
  search: string;
}

export const useUsers = ({ role, search }: UseUsersParams) => {
  const queryClient = useQueryClient();

  // ⭐ FETCH USERS
  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users", role, search],
    queryFn: () => usersApi.getUsers({ role, search }),
  });

  // ⭐ FETCH STATS
  const { data: stats } = useQuery({
    queryKey: ["userStats"],
    queryFn: () => usersApi.getUserStats(),
  });

  // ⭐ UPDATE USER
  const updateUserMutation = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<User>;
    }) => usersApi.updateUser(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["userStats"] });
    },
  });

  // ⭐ DELETE USER
  const deleteUserMutation = useMutation({
    mutationFn: (id: string) => usersApi.deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["userStats"] });
    },
  });

  return {
    users,
    stats,
    isLoading,
    refetch,
    updateUser: updateUserMutation.mutateAsync,
    deleteUser: deleteUserMutation.mutateAsync,
  };
};
