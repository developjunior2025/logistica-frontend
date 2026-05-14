import { Link } from 'react-router-dom'
import { useAuth } from '@/modules/shared/hooks/useAuth'
import { USER_ROLE_LABELS } from '@/modules/shared/types'

/** Dashboard placeholder — Sprint 18 lo completará con métricas reales */
export function DashboardPage() {
  const { user, isSuperadmin, isStore, isOperator, isAuditor } = useAuth()

  if (!user) return null

  return (
    <div className="dashboard-page page-container">
      <div className="dashboard-header">
        <div className="dashboard-header__greeting">
          <h1 className="dashboard-header__title">
            Hola, <span>{user.name.split(' ')[0]}</span> 👋
          </h1>
          <p className="dashboard-header__role">
            {USER_ROLE_LABELS[user.role]}
          </p>
        </div>
      </div>

      {/* Quick actions por rol */}
      <div className="dashboard-quick-actions">
        <h2 className="dashboard-section-title">Acceso rápido</h2>
        <div className="quick-actions-grid">
          <QuickActionCard
            icon="📋"
            title="Mis Cotizaciones"
            desc="Ver solicitudes de cotización pendientes"
            href="/quotations"
            id="qa-quotations"
          />
          <QuickActionCard
            icon="📦"
            title="Mis Órdenes"
            desc="Seguimiento de órdenes activas"
            href="/orders"
            id="qa-orders"
          />
          {isStore && (
            <QuickActionCard
              icon="🏭"
              title="Mi Tienda"
              desc="Gestionar perfil y servicios"
              href="/store/profile"
              id="qa-store"
            />
          )}
          {(isSuperadmin || isOperator) && (
            <QuickActionCard
              icon="✅"
              title="Comprobantes"
              desc="Validar pagos pendientes"
              href="/orders?filter=payment_pending"
              id="qa-payments"
            />
          )}
          {isSuperadmin && (
            <QuickActionCard
              icon="🏪"
              title="Gestión de Tiendas"
              desc="Aprobar y administrar tiendas"
              href="/admin/stores"
              id="qa-admin-stores"
            />
          )}
          {isAuditor && (
            <QuickActionCard
              icon="🔍"
              title="Auditoría"
              desc="Consultar registro de eventos"
              href="/admin/audit"
              id="qa-audit"
            />
          )}
          <QuickActionCard
            icon="🎧"
            title="Soporte"
            desc="Crear o consultar tickets"
            href="/support"
            id="qa-support"
          />
          <QuickActionCard
            icon="📊"
            title="Reportes"
            desc="Descargar reportes en CSV"
            href="/reports"
            id="qa-reports"
          />
        </div>
      </div>

      {/* Aviso de construcción */}
      <div className="dashboard-wip-notice" role="status">
        <span aria-hidden="true">🚧</span>
        <p>
          Las métricas y gráficas del dashboard se implementarán en el{' '}
          <strong>Sprint 18</strong>. Las acciones rápidas ya funcionan.
        </p>
      </div>
    </div>
  )
}

function QuickActionCard({
  icon,
  title,
  desc,
  href,
  id,
}: {
  icon: string
  title: string
  desc: string
  href: string
  id: string
}) {
  return (
    <Link to={href} className="quick-action-card" id={id}>
      <div className="quick-action-card__icon" aria-hidden="true">{icon}</div>
      <div className="quick-action-card__content">
        <h3 className="quick-action-card__title">{title}</h3>
        <p className="quick-action-card__desc">{desc}</p>
      </div>
      <svg
        className="quick-action-card__arrow"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
      >
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    </Link>
  )
}
