import { apiClient } from '@/lib/api/axios';
import type { ILoginResponse, IRegisterResponse, IUser } from '../types/auth.types';

export const authService = {
  login: async (credentials: any): Promise<ILoginResponse> => {
    const { data } = await apiClient.post<ILoginResponse>('/auth/login', credentials);
    return data;
  },

  register: async (userData: any): Promise<IRegisterResponse> => {
    const { data } = await apiClient.post<IRegisterResponse>('/auth/register', userData);
    return data;
  },

  getProfile: async (): Promise<IUser> => {
    const { data } = await apiClient.get<IUser>('/auth/profile');
    return data;
  },
};
