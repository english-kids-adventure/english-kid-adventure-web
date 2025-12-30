import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { profileService } from '@/features/profile/services/profileService';

export const useProfile = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['profile'],
    queryFn: profileService.getProfile,
    staleTime: 1000 * 60 * 5,
  });

  const updateMutation = useMutation({
    mutationFn: profileService.updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });

  return {
    user: data?.data ?? null,
    isLoading,
    isError,
    isUpdating: updateMutation.isPending,
    updateProfile: updateMutation.mutate,
    refreshProfile: refetch,
  };
};
