import { useMutation, useQuery } from '@tanstack/react-query';
import { authService } from '../services/auth.service';
import { useAuthStore } from '@/store/useAuthStore';
import { useNavigate } from 'react-router-dom';

export function useLogin() {
  const setAuth = useAuthStore((state) => state.setAuth);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      setAuth(data.user, data.access_token);
      navigate('/dashboard'); // Navigate to dashboard after login
    },
  });
}

export function useRegister() {
  const setAuth = useAuthStore((state) => state.setAuth);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: authService.register,
    onSuccess: (data) => {
      setAuth(data.user, data.access_token);
      navigate('/dashboard');
    },
  });
}

export function useProfile() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return useQuery({
    queryKey: ['auth', 'profile'],
    queryFn: authService.getProfile,
    enabled: isAuthenticated, // Only fetch if we have a token
  });
}
