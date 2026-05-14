import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, FileText, Package, BarChart3, LifeBuoy,
  Layers, ClipboardList, ShieldCheck, Truck, Ship, Store,
  ChevronDown, LogOut, User, Settings, Menu, X,
} from 'lucide-react'
import { useAuthStore } from '@/store/useAuthStore'

// ── Definición de menús por rol ───────────────────────────────────────────────

interface INavItem {
  label: string
  href: string
  icon: React.ReactNode
}

const NAV_CLIENT: INavItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: <LayoutDashboard className="h-4 w-4" /> },
  { label: 'Cotizaciones', href: '/quotations', icon: <FileText className="h-4 w-4" /> },
  { label: 'Mis Órdenes', href: '/orders', icon: <Package className="h-4 w-4" /> },
  { label: 'Soporte', href: '/support', icon: <LifeBuoy className="h-4 w-4" /> },
]

const NAV_STORE: INavItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: <LayoutDashboard className="h-4 w-4" /> },
  { label: 'Cotizaciones', href: '/quotations', icon: <FileText className="h-4 w-4" /> },
  { label: 'Órdenes', href: '/orders', icon: <Package className="h-4 w-4" /> },
  { label: 'Mi Tienda', href: '/store/profile', icon: <Store className="h-4 w-4" /> },
  { label: 'Soporte', href: '/support', icon: <LifeBuoy className="h-4 w-4" /> },
]

const NAV_OPERATOR: INavItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: <LayoutDashboard className="h-4 w-4" /> },
  { label: 'Garita TOS', href: '/tos/gate', icon: <ShieldCheck className="h-4 w-4" /> },
  { label: 'Inventario WMS', href: '/wms/inventory', icon: <Layers className="h-4 w-4" /> },
  { label: 'Recepciones', href: '/wms/receipts', icon: <ClipboardList className="h-4 w-4" /> },
  { label: 'Viajes', href: '/transport/trips', icon: <Truck className="h-4 w-4" /> },
]

const NAV_ADMIN: INavItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: <LayoutDashboard className="h-4 w-4" /> },
  { label: 'Órdenes', href: '/orders', icon: <Package className="h-4 w-4" /> },
  { label: 'Operadores', href: '/admin/stores', icon: <Store className="h-4 w-4" /> },
  { label: 'Reportes', href: '/reports', icon: <BarChart3 className="h-4 w-4" /> },
  { label: 'Garita TOS', href: '/tos/gate', icon: <ShieldCheck className="h-4 w-4" /> },
  { label: 'Soporte', href: '/support', icon: <LifeBuoy className="h-4 w-4" /> },
]

const ROLE_LABELS: Record<string, string> = {
  'PROF-CLI-001': 'Cliente',
  'PROF-TIE-002': 'Operador',
  'PROF-SUP-003': 'Administrador',
  'PROF-OPE-004': 'Op. Interno',
  'PROF-TRP-006': 'Transportista',
  'PROF-INS-005': 'Inspector',
}

// ── Component ─────────────────────────────────────────────────────────────────

export function Navbar() {
  const user = useAuthStore((s) => s.user)
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  const clearAuth = useAuthStore((s) => s.logout)
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const userMenuRef = useRef<HTMLDivElement>(null)

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleLogout = () => {
    clearAuth()
    setUserMenuOpen(false)
    setMenuOpen(false)
    navigate('/auth/login')
  }

  // Pick nav items based on role
  const navItems: INavItem[] = !isAuthenticated
    ? []
    : user?.role === 'PROF-SUP-003'
    ? NAV_ADMIN
    : user?.role === 'PROF-OPE-004' || user?.role === 'PROF-TRP-006' || user?.role === 'PROF-INS-005'
    ? NAV_OPERATOR
    : user?.role === 'PROF-TIE-002'
    ? NAV_STORE
    : NAV_CLIENT

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
          <div className="flex items-center justify-center h-8 w-8 bg-blue-600 rounded-lg shadow-md shadow-blue-500/30">
            <Ship className="h-5 w-5 text-white" />
          </div>
          <span className="navbar__brand-name">Logística<strong>Pro</strong></span>
        </Link>

        {/* Desktop Nav */}
        <nav className="navbar__nav" aria-label="Navegación principal">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              ['navbar__link', isActive ? 'navbar__link--active' : ''].join(' ')
            }
          >
            Marketplace
          </NavLink>

          {isAuthenticated && navItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                ['navbar__link', isActive ? 'navbar__link--active' : ''].join(' ')
              }
            >
              <span className="flex items-center gap-1.5">
                {item.icon} {item.label}
              </span>
            </NavLink>
          ))}
        </nav>

        {/* Right actions */}
        <div className="navbar__actions">
          {isAuthenticated && user ? (
            <div className="navbar__user" ref={userMenuRef}>
              <span className="navbar__user-role hidden sm:flex items-center gap-1.5 text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full">
                {ROLE_LABELS[user.role] || user.role}
              </span>
              <button
                id="user-menu-btn"
                className="navbar__avatar flex items-center gap-1.5"
                aria-expanded={userMenuOpen}
                aria-haspopup="true"
                onClick={() => setUserMenuOpen((v) => !v)}
              >
                <span className="h-8 w-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-sm shadow-md">
                  {user.name.charAt(0).toUpperCase()}
                </span>
                <ChevronDown className={`h-3.5 w-3.5 text-slate-500 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {userMenuOpen && (
                <div
                  className="navbar__dropdown animate-in fade-in slide-in-from-top-2 duration-200"
                  role="menu"
                >
                  <div className="navbar__dropdown-header">
                    <div className="h-10 w-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-base mx-auto mb-2 shadow">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <p className="navbar__dropdown-name">{user.name}</p>
                    <p className="navbar__dropdown-email">{user.email}</p>
                  </div>

                  <Link
                    to="/dashboard"
                    className="navbar__dropdown-item"
                    role="menuitem"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    <LayoutDashboard className="h-4 w-4" /> Mi Panel
                  </Link>

                  {(user.role === 'PROF-SUP-003') && (
                    <Link
                      to="/admin/stores"
                      className="navbar__dropdown-item"
                      role="menuitem"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <Settings className="h-4 w-4" /> Administración
                    </Link>
                  )}

                  <Link
                    to="/support"
                    className="navbar__dropdown-item"
                    role="menuitem"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    <LifeBuoy className="h-4 w-4" /> Soporte
                  </Link>

                  <div className="border-t border-slate-100 mt-1 pt-1">
                    <button
                      className="navbar__dropdown-item navbar__dropdown-item--danger w-full"
                      role="menuitem"
                      onClick={handleLogout}
                    >
                      <LogOut className="h-4 w-4" /> Cerrar sesión
                    </button>
                  </div>
                </div>
              )}
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
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="navbar__mobile-menu animate-in fade-in slide-in-from-top-2 duration-200"
          role="dialog"
          aria-modal="true"
          aria-label="Menú de navegación"
        >
          <NavLink to="/" end className="navbar__mobile-link" onClick={() => setMenuOpen(false)}>
            <Ship className="h-4 w-4" /> Marketplace
          </NavLink>

          {isAuthenticated ? (
            <>
              {navItems.map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  className="navbar__mobile-link"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.icon} {item.label}
                </NavLink>
              ))}

              {user && (
                <div className="border-t border-slate-100 mt-2 pt-2 px-4">
                  <p className="text-xs text-slate-400 font-medium mb-2 flex items-center gap-1.5">
                    <User className="h-3.5 w-3.5" /> {user.name} · {ROLE_LABELS[user.role] || user.role}
                  </p>
                </div>
              )}

              <button
                className="navbar__mobile-link navbar__mobile-link--danger"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4" /> Cerrar sesión
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
