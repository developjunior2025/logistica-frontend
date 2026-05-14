import { useAuthStore } from '@/store/authStore'
import type { TUserRole } from '@/modules/shared/types'

/**
 * Hook de autenticación — expone el estado del usuario y helpers de permisos.
 */
export function useAuth() {
  const { user, accessToken, isAuthenticated, logout } = useAuthStore()

  const hasRole = (...roles: TUserRole[]): boolean => {
    if (!user) return false
    return roles.includes(user.role)
  }

  const isSuperadmin = hasRole('PROF-SUP-003')
  const isOperator = hasRole('PROF-OPE-004')
  const isStore = hasRole('PROF-TIE-002')
  const isClient = hasRole('PROF-CLI-001')
  const isAuditor = hasRole('PROF-AUD-008')
  const isTransporter = hasRole('PROF-TRP-006')
  const isInspector = hasRole('PROF-INS-005')

  return {
    user,
    accessToken,
    isAuthenticated,
    logout,
    hasRole,
    isSuperadmin,
    isOperator,
    isStore,
    isClient,
    isAuditor,
    isTransporter,
    isInspector,
  }
}
