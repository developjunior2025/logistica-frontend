import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// Layouts
import { AppLayout } from '@/modules/shared/components/layout/AppLayout'
import { AuthLayout } from '@/modules/shared/components/layout/AuthLayout'
import { ProtectedRoute } from '@/modules/shared/components/common/ProtectedRoute'

// Public pages
import { MarketplacePage } from '@/modules/marketplace/pages/MarketplacePage'
import { SearchResultsPage } from '@/modules/marketplace/pages/SearchResultsPage'
import { StoreDetailPage } from '@/modules/marketplace/pages/StoreDetailPage'

// Auth pages
import { LoginPage } from '@/modules/auth/pages/LoginPage'
import { RegisterPage } from '@/modules/auth/pages/RegisterPage'
import { ForgotPasswordPage } from '@/modules/auth/pages/ForgotPasswordPage'

// Protected pages (placeholders — se implementan en sprints siguientes)
import { DashboardPage } from '@/modules/dashboard/pages/DashboardPage'
import { ComingSoonPage } from '@/modules/shared/pages/ComingSoonPage'
import { QuotationsListPage } from '@/modules/quotations/pages/QuotationsListPage'
import { QuotationNewPage } from '@/modules/quotations/pages/QuotationNewPage'
import { OrdersListPage } from '@/modules/orders/pages/OrdersListPage'
import { OrderDetailPage } from '@/modules/orders/pages/OrderDetailPage'
import { WmsInventoryPage } from '@/modules/wms/pages/WmsInventoryPage'
import { WmsReceiptsPage } from '@/modules/wms/pages/WmsReceiptsPage'
import { TosGatePage } from '@/modules/tos/pages/TosGatePage'
import { TransportTripsPage } from '@/modules/transport/pages/TransportTripsPage'
import { SupportPage } from '@/modules/support/pages/SupportPage'
import { SupportTicketPage } from '@/modules/support/pages/SupportTicketPage'
import { AdminStoresPage } from '@/modules/admin/pages/AdminStoresPage'
import { ReportsPage } from '@/modules/reports/pages/ReportsPage'

// ─────────────────────────────────────────────────────────────────────────────

const router = createBrowserRouter([
  // ── Rutas públicas con AppLayout ─────────────────────────────────────────
  {
    element: <AppLayout />,
    children: [
      { path: '/', element: <MarketplacePage /> },
      { path: '/search', element: <SearchResultsPage /> },
      { path: '/stores/:id', element: <StoreDetailPage /> },
      { path: '/stores/:id/services/:serviceId', element: <ComingSoonPage title="Detalle del Servicio" /> },
    ],
  },

  // ── Rutas de autenticación ───────────────────────────────────────────────
  {
    element: <AuthLayout />,
    children: [
      { path: '/auth/login', element: <LoginPage /> },
      { path: '/auth/register', element: <RegisterPage /> },
      { path: '/auth/forgot-password', element: <ForgotPasswordPage /> },
      { path: '/auth/reset-password', element: <ComingSoonPage title="Restablecer contraseña" /> },
    ],
  },

  // ── Rutas protegidas (solo autenticados) ─────────────────────────────────
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          { path: '/dashboard', element: <DashboardPage /> },
          { path: '/quotations', element: <QuotationsListPage /> },
          { path: '/quotations/new', element: <QuotationNewPage /> },
          { path: '/quotations/:id', element: <ComingSoonPage title="Detalle de Cotización" /> },
          { path: '/orders', element: <OrdersListPage /> },
          { path: '/orders/:id', element: <OrderDetailPage /> },
          { path: '/reports', element: <ReportsPage /> },
          { path: '/support', element: <SupportPage /> },
          { path: '/support/tickets/:id', element: <SupportTicketPage /> },
        ],
      },
    ],
  },

  // ── Rutas de Tienda (requiere rol PROF-TIE-002) ──────────────────────────
  {
    element: <ProtectedRoute allowedRoles={['PROF-TIE-002', 'PROF-SUP-003']} />,
    children: [
      {
        element: <AppLayout />,
        children: [
          { path: '/store/setup', element: <ComingSoonPage title="Registro de Tienda" /> },
          { path: '/store/profile', element: <ComingSoonPage title="Mi Tienda" /> },
          { path: '/store/services', element: <ComingSoonPage title="Mis Servicios" /> },
          { path: '/store/quotations', element: <ComingSoonPage title="Cotizaciones Recibidas" /> },
        ],
      },
    ],
  },

  // ── Rutas Admin (requiere rol PROF-SUP-003) ──────────────────────────────
  {
    element: <ProtectedRoute allowedRoles={['PROF-SUP-003']} />,
    children: [
      {
        element: <AppLayout />,
        children: [
          { path: '/admin/stores', element: <AdminStoresPage /> },
          { path: '/admin/catalogs', element: <ComingSoonPage title="Catálogos" /> },
          { path: '/admin/commissions', element: <ComingSoonPage title="Comisiones" /> },
          { path: '/admin/audit', element: <ComingSoonPage title="Auditoría" /> },
        ],
      },
    ],
  },

  // ── Módulos Operativos (Operador + Admin) ────────────────────────────────
  {
    element: <ProtectedRoute allowedRoles={['PROF-OPE-004', 'PROF-SUP-003']} />,
    children: [
      {
        element: <AppLayout />,
        children: [
          { path: '/tos/yard/:id', element: <ComingSoonPage title="Mapa del Patio TOS" /> },
          { path: '/tos/gate', element: <TosGatePage /> },
          { path: '/wms/inventory', element: <WmsInventoryPage /> },
          { path: '/wms/receipts', element: <WmsReceiptsPage /> },
          { path: '/agd/certificates', element: <ComingSoonPage title="Certificados de Depósito" /> },
        ],
      },
    ],
  },

  // ── Transportista ────────────────────────────────────────────────────────
  {
    element: <ProtectedRoute allowedRoles={['PROF-TRP-006', 'PROF-OPE-004', 'PROF-SUP-003']} />,
    children: [
      {
        element: <AppLayout />,
        children: [
          { path: '/transport/trips', element: <TransportTripsPage /> },
        ],
      },
    ],
  },

  // ── Inspector ────────────────────────────────────────────────────────────
  {
    element: <ProtectedRoute allowedRoles={['PROF-INS-005', 'PROF-OPE-004', 'PROF-SUP-003']} />,
    children: [
      {
        element: <AppLayout />,
        children: [
          { path: '/inspections', element: <ComingSoonPage title="Inspecciones" /> },
        ],
      },
    ],
  },

  // ── 404 ──────────────────────────────────────────────────────────────────
  {
    path: '*',
    element: <AppLayout />,
    children: [
      { index: true, element: <ComingSoonPage title="Página no encontrada" /> },
    ],
  },
])

export function AppRouter() {
  return <RouterProvider router={router} />
}
