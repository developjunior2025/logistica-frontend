import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '@/modules/shared/hooks/useAuth'
import type { TUserRole } from '@/modules/shared/types'

interface IProtectedRouteProps {
  /** Roles permitidos. Si está vacío, solo requiere estar autenticado. */
  allowedRoles?: TUserRole[]
  /** Ruta a la que redirigir si no tiene permiso (default: /auth/login o /dashboard) */
  redirectTo?: string
}

/**
 * Guarda de rutas:
 * 1. Si no está autenticado → redirige a /auth/login con la ruta actual en `from`
 * 2. Si está autenticado pero no tiene el rol → redirige a /dashboard (403 suave)
 * 3. Si tiene permiso → renderiza el Outlet
 */
export function ProtectedRoute({
  allowedRoles = [],
  redirectTo,
}: IProtectedRouteProps) {
  const { isAuthenticated, hasRole } = useAuth()
  const location = useLocation()

  if (!isAuthenticated) {
    return (
      <Navigate
        to={redirectTo ?? '/auth/login'}
        state={{ from: location }}
        replace
      />
    )
  }

  if (allowedRoles.length > 0 && !hasRole(...allowedRoles)) {
    return (
      <Navigate
        to={redirectTo ?? '/dashboard'}
        replace
      />
    )
  }

  return <Outlet />
}
