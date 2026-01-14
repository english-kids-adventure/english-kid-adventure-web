import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { profileService } from '@features/profile/services/profileService';
import { useAuthStore } from '@store/useAuthStore';
import { useEffect } from 'react';

export const useProfile = () => {
  const queryClient = useQueryClient();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['profile'],
    queryFn: profileService.getProfile,
    enabled: false,
  });

  useEffect(() => {
    if (isAuthenticated) {
      refetch();
    }
  }, [isAuthenticated, refetch]);

  const updateMutation = useMutation({
    mutationFn: profileService.updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });

  return {
    user: data ?? null,
    isLoading,
    isError,
    isUpdating: updateMutation.isPending,
    updateProfile: updateMutation.mutate,
    refreshProfile: refetch,
  };
};
