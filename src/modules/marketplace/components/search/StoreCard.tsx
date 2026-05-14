import { Link } from 'react-router-dom'
import type { IStore } from '@/modules/shared/types'

interface IStoreCardProps {
  store: IStore
}

export function StoreCard({ store }: IStoreCardProps) {
  const stars = Math.round(store.ratingAvg)

  return (
    <article className="store-card" role="listitem">
      {/* Cover / Header */}
      <div className="store-card__cover">
        {store.coverUrl ? (
          <img
            src={store.coverUrl}
            alt={`${store.name} — imagen de portada`}
            className="store-card__cover-img"
            loading="lazy"
          />
        ) : (
          <div className="store-card__cover-placeholder" aria-hidden="true">
            🏭
          </div>
        )}

        {/* Logo sobre la portada */}
        <div className="store-card__logo">
          {store.logoUrl ? (
            <img src={store.logoUrl} alt={store.name} />
          ) : (
            <span aria-hidden="true">{store.name.charAt(0)}</span>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="store-card__body">
        {/* Rating */}
        <div className="store-card__rating" aria-label={`Calificación: ${store.ratingAvg} de 5`}>
          <div className="store-card__stars" aria-hidden="true">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg
                key={i}
                className={['star', i < stars ? 'star--filled' : 'star--empty'].join(' ')}
                width="14"
                height="14"
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
          <span className="store-card__rating-count">({store.ratingCount.toLocaleString('es-MX')})</span>
        </div>

        {/* Name */}
        <h3 className="store-card__name">
          <Link
            to={`/stores/${store.id}`}
            className="store-card__name-link"
          >
            {store.name}
          </Link>
        </h3>

        {/* Puertos */}
        <p className="store-card__ports">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          {store.ports.slice(0, 2).map((p) => p.name).join(' · ')}
          {store.ports.length > 2 && ` +${store.ports.length - 2}`}
        </p>

        {/* Tipos de servicio */}
        <div className="store-card__types" aria-label="Tipos de servicio">
          {store.serviceTypes.slice(0, 3).map((st) => (
            <span key={st.id} className="store-card__type-badge">
              {st.name}
            </span>
          ))}
          {store.serviceTypes.length > 3 && (
            <span className="store-card__type-badge store-card__type-badge--more">
              +{store.serviceTypes.length - 3}
            </span>
          )}
        </div>

        {/* Price + CTA */}
        <div className="store-card__footer">
          <div className="store-card__price">
            {store.priceFrom ? (
              <>
                <span className="store-card__price-from">Desde</span>
                <strong className="store-card__price-value">
                  ${store.priceFrom.toLocaleString('es-MX')}
                </strong>
                <span className="store-card__price-currency">
                  {store.currency?.code ?? 'MXN'}
                </span>
              </>
            ) : (
              <span className="store-card__price-consult">Consultar precio</span>
            )}
          </div>

          <Link
            to={`/stores/${store.id}`}
            className="store-card__cta"
            id={`store-card-cta-${store.id}`}
          >
            Ver servicios
          </Link>
        </div>
      </div>
    </article>
  )
}
