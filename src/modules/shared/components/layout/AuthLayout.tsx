import { Outlet, Link } from 'react-router-dom'

/**
 * Layout para páginas de autenticación (login, register, reset-password).
 * Fondo Deep Moss con tarjeta centrada.
 */
export function AuthLayout() {
  return (
    <div className="auth-layout">
      {/* Fondo con patrón sutil */}
      <div className="auth-layout__bg" aria-hidden="true" />

      {/* Header mínimo */}
      <div className="auth-layout__header">
        <Link to="/" className="auth-layout__logo" aria-label="Ir al inicio">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
            <rect width="32" height="32" rx="8" fill="#003912" />
            <path
              d="M8 22L13 10L16 18L19 13L24 22"
              stroke="#1dbf73"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>LogísticaPro</span>
        </Link>
      </div>

      {/* Card central */}
      <main className="auth-layout__main" id="main-content">
        <div className="auth-layout__card">
          <Outlet />
        </div>
      </main>

      {/* Footer mínimo */}
      <div className="auth-layout__footer-links">
        <Link to="/terms">Términos de uso</Link>
        <span aria-hidden="true">·</span>
        <Link to="/privacy">Privacidad</Link>
        <span aria-hidden="true">·</span>
        <Link to="/support">Soporte</Link>
      </div>
    </div>
  )
}
