import { apiClient } from '@/lib/api/axios';

export interface IClientMetrics {
  activeOrders: number;
  pendingPayments: number;
}

export interface IStoreMetrics {
  newOrders: number;
  pendingCommissions: number;
}

export interface IAdminMetrics {
  totalOrders: number;
  pendingValidations: number;
  pendingCommissions: number;
}

export const dashboardService = {
  getClientMetrics: async (): Promise<IClientMetrics> => {
    const { data } = await apiClient.get<IClientMetrics>('/dashboard/client');
    return data;
  },

  getStoreMetrics: async (): Promise<IStoreMetrics> => {
    const { data } = await apiClient.get<IStoreMetrics>('/dashboard/store');
    return data;
  },

  getAdminMetrics: async (): Promise<IAdminMetrics> => {
    const { data } = await apiClient.get<IAdminMetrics>('/dashboard/admin');
    return data;
  },
};
