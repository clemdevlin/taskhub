import { fetchData, updateData } from "@/lib/fetch-util";
import type {
  ChangePasswordFormData,
  ProfileFormData,
} from "@/routes/user/profile";
import { useMutation, useQuery, useQueryClient, type QueryKey } from "@tanstack/react-query";

const queryKey: QueryKey = ["user"];
const queryClient = useQueryClient();

export const useUserProfileQuery = () => {
  return useQuery({
    queryKey,
    queryFn: () => fetchData("/users/profile"),
  });
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: (data: ChangePasswordFormData) =>
      updateData("/users/change-password", data),
  });
};

export const useUpdateUserProfile = () => {
  return useMutation({
    mutationFn: (data: ProfileFormData) => updateData("/users/profile", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    }
  });
};
