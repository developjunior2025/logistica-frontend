import { Outlet } from 'react-router-dom'
import { Navbar } from './Navbar'

/**
 * Layout principal para páginas autenticadas y públicas del marketplace.
 * Incluye Navbar + Footer.
 */
export function AppLayout() {
  return (
    <div className="app-layout">
      <Navbar />
      <main className="app-layout__main" id="main-content">
        <Outlet />
      </main>
      <footer className="app-layout__footer">
        <div className="page-container">
          <div className="footer__inner">
            <div className="footer__brand">
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-hidden="true">
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
            </div>
            <p className="footer__copy">
              © {new Date().getFullYear()} Marketplace Logístico Antigravity. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
