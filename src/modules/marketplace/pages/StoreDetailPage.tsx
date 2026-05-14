import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import api from '@/modules/shared/services/api'
import type { IStore } from '@/modules/shared/types'

// ─────────────────────────────────────────────────────────────────────────────

async function fetchStore(id: string): Promise<IStore> {
  const { data } = await api.get(`/search/stores/${id}`)
  return data
}

// ─────────────────────────────────────────────────────────────────────────────

export function StoreDetailPage() {
  const { id } = useParams()

  const { data: store, isLoading, isError } = useQuery({
    queryKey: ['store', id],
    queryFn: () => fetchStore(id!),
    enabled: !!id,
  })

  if (isLoading) {
    return (
      <div className="store-detail-page page-container" aria-busy="true">
        <div className="skeleton-block" style={{ height: '300px', marginBottom: '24px' }} />
        <div className="skeleton-line skeleton-line--medium" />
        <div className="skeleton-line skeleton-line--short" />
      </div>
    )
  }

  if (isError || !store) {
    return (
      <div className="store-detail-page page-container search-empty" role="status">
        <h3 className="search-empty__title">Tienda no encontrada</h3>
        <p className="search-empty__desc">
          La tienda que buscas no existe o ha sido desactivada.
        </p>
        <Link to="/search" className="cta-btn cta-btn--primary">
          Volver al marketplace
        </Link>
      </div>
    )
  }

  const stars = Math.round(store.ratingAvg)

  return (
    <div className="store-detail-page">
      {/* ── Header ───────────────────────────────────────────────────────── */}
      <header className="store-detail-header">
        {store.coverUrl ? (
          <img
            src={store.coverUrl}
            alt="Portada de la tienda"
            className="store-detail-header__cover"
          />
        ) : (
          <div className="store-detail-header__cover-placeholder" aria-hidden="true" />
        )}
        <div className="page-container store-detail-header__inner">
          <div className="store-detail-header__logo">
            {store.logoUrl ? (
              <img src={store.logoUrl} alt={`Logo de ${store.name}`} />
            ) : (
              <span aria-hidden="true">{store.name.charAt(0)}</span>
            )}
          </div>
          <div className="store-detail-header__info">
            <h1 className="store-detail-header__name">{store.name}</h1>
            <div className="store-detail-header__meta">
              <div className="store-card__rating" aria-label={`Calificación: ${store.ratingAvg} de 5`}>
                <div className="store-card__stars" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg
                      key={i}
                      className={['star', i < stars ? 'star--filled' : 'star--empty'].join(' ')}
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill={i < stars ? '#1dbf73' : 'none'}
                      stroke={i < stars ? '#1dbf73' : '#c5c6c9'}
                      strokeWidth="2"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>
                <span className="store-card__rating-num">{store.ratingAvg.toFixed(1)}</span>
                <span className="store-card__rating-count">({store.ratingCount.toLocaleString('es-MX')} reseñas)</span>
              </div>
              <span className="store-detail-header__ports">
                📍 {store.ports.map((p) => p.name).join(', ')}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* ── Body ─────────────────────────────────────────────────────────── */}
      <main className="store-detail-body page-container">
        <div className="store-detail-body__main">
          {/* Descripción */}
          <section className="store-detail-section">
            <h2 className="store-detail-section__title">Acerca de nosotros</h2>
            <p className="store-detail-section__desc">{store.description}</p>
          </section>

          {/* Servicios */}
          <section className="store-detail-section">
            <h2 className="store-detail-section__title">Servicios ofrecidos</h2>
            {/* Aquí iría la lista de IStoreService (Sprint 06) */}
            <div className="store-services-grid">
               <div className="search-empty" role="status" style={{ padding: '40px', background: 'var(--color-cloud-white)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xl)' }}>
                  <p>La vista detallada de los servicios y el botón de cotizar se implementarán en el <strong>Sprint 06 y 07</strong>.</p>
               </div>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="store-detail-body__sidebar">
          <div className="store-detail-card">
            <h3 className="store-detail-card__title">Información</h3>
            <ul className="store-detail-card__list">
              <li>
                <strong>Tipos de servicio:</strong>
                <div className="store-card__types" style={{ marginTop: '8px' }}>
                  {store.serviceTypes.map((st) => (
                    <span key={st.id} className="store-card__type-badge">
                      {st.name}
                    </span>
                  ))}
                </div>
              </li>
              <li>
                <strong>Miembro desde:</strong>
                <span>{new Date(store.createdAt).toLocaleDateString('es-MX', { month: 'long', year: 'numeric' })}</span>
              </li>
            </ul>
          </div>
        </aside>
      </main>
    </div>
  )
}
