import { useQuery } from '@tanstack/react-query';
import { dashboardService } from '../services/dashboard.service';
import { useAuthStore } from '@/store/useAuthStore';

export function useDashboardMetrics() {
  const user = useAuthStore((state) => state.user);
  const role = user?.role || 'PROF-CLI-001';

  return useQuery({
    queryKey: ['dashboard', 'metrics', role],
    queryFn: async () => {
      if (role === 'PROF-CLI-001') {
        return dashboardService.getClientMetrics();
      }
      if (role === 'PROF-TIE-002') {
        return dashboardService.getStoreMetrics();
      }
      if (role === 'PROF-SUP-003' || role === 'PROF-OPE-004') {
        return dashboardService.getAdminMetrics();
      }
      // Default fallback
      return { activeOrders: 0, pendingPayments: 0 };
    },
    enabled: !!user,
  });
}
