import { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '@/modules/shared/hooks/useAuth'
import { USER_ROLE_LABELS } from '@/modules/shared/types'

// ─────────────────────────────────────────────────────────────────────────────

export function Navbar() {
  const { isAuthenticated, user, logout } = useAuth()
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogout = async () => {
    logout()
    navigate('/auth/login')
  }

  return (
    <header
      className={[
        'navbar',
        scrolled ? 'navbar--scrolled' : '',
      ].join(' ')}
      role="banner"
    >
      <div className="navbar__inner page-container">
        {/* Logo */}
        <Link to="/" className="navbar__logo" aria-label="Marketplace Logístico — Inicio">
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
          <span className="navbar__brand-name">Logística<strong>Pro</strong></span>
        </Link>

        {/* Nav links (desktop) */}
        <nav className="navbar__nav" aria-label="Navegación principal">
          <NavLink
            to="/search"
            className={({ isActive }) =>
              ['navbar__link', isActive ? 'navbar__link--active' : ''].join(' ')
            }
          >
            Marketplace
          </NavLink>
          {isAuthenticated && (
            <>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  ['navbar__link', isActive ? 'navbar__link--active' : ''].join(' ')
                }
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/orders"
                className={({ isActive }) =>
                  ['navbar__link', isActive ? 'navbar__link--active' : ''].join(' ')
                }
              >
                Mis Órdenes
              </NavLink>
            </>
          )}
        </nav>

        {/* Right actions */}
        <div className="navbar__actions">
          {isAuthenticated && user ? (
            <div className="navbar__user">
              <span className="navbar__user-role">
                {USER_ROLE_LABELS[user.role]}
              </span>
              <div className="navbar__user-menu">
                <button
                  id="user-menu-btn"
                  className="navbar__avatar"
                  aria-expanded={menuOpen}
                  aria-haspopup="true"
                  onClick={() => setMenuOpen((v) => !v)}
                >
                  {user.name.charAt(0).toUpperCase()}
                </button>
                {menuOpen && (
                  <div className="navbar__dropdown" role="menu">
                    <div className="navbar__dropdown-header">
                      <p className="navbar__dropdown-name">{user.name}</p>
                      <p className="navbar__dropdown-email">{user.email}</p>
                    </div>
                    <Link
                      to="/dashboard"
                      className="navbar__dropdown-item"
                      role="menuitem"
                      onClick={() => setMenuOpen(false)}
                    >
                      Mi Panel
                    </Link>
                    <Link
                      to="/support"
                      className="navbar__dropdown-item"
                      role="menuitem"
                      onClick={() => setMenuOpen(false)}
                    >
                      Soporte
                    </Link>
                    <button
                      className="navbar__dropdown-item navbar__dropdown-item--danger"
                      role="menuitem"
                      onClick={handleLogout}
                    >
                      Cerrar sesión
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <>
              <Link to="/auth/login" className="navbar__btn-ghost">
                Iniciar sesión
              </Link>
              <Link to="/auth/register" className="navbar__btn-filled" id="nav-register-btn">
                Registrarse
              </Link>
            </>
          )}

          {/* Hamburger (mobile) */}
          <button
            className="navbar__hamburger"
            aria-label="Abrir menú"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="navbar__mobile-menu" role="dialog" aria-modal="true" aria-label="Menú de navegación">
          <NavLink to="/search" className="navbar__mobile-link" onClick={() => setMenuOpen(false)}>
            Marketplace
          </NavLink>
          {isAuthenticated ? (
            <>
              <NavLink to="/dashboard" className="navbar__mobile-link" onClick={() => setMenuOpen(false)}>
                Dashboard
              </NavLink>
              <NavLink to="/orders" className="navbar__mobile-link" onClick={() => setMenuOpen(false)}>
                Mis Órdenes
              </NavLink>
              <button className="navbar__mobile-link navbar__mobile-link--danger" onClick={handleLogout}>
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <Link to="/auth/login" className="navbar__mobile-link" onClick={() => setMenuOpen(false)}>
                Iniciar sesión
              </Link>
              <Link to="/auth/register" className="navbar__mobile-link" onClick={() => setMenuOpen(false)}>
                Registrarse
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  )
}
