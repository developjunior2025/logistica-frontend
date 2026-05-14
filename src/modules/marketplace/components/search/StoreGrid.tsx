import type { IStore } from '@/modules/shared/types'
import { StoreCard } from './StoreCard'
import { StoreCardSkeleton } from './StoreCardSkeleton'

interface IStoreGridProps {
  stores: IStore[]
  isLoading: boolean
  hasResults: boolean
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function StoreGrid({
  stores,
  isLoading,
  hasResults,
  currentPage,
  totalPages,
  onPageChange,
}: IStoreGridProps) {
  if (isLoading) {
    return (
      <div className="store-grid" aria-busy="true" aria-label="Cargando tiendas...">
        {Array.from({ length: 6 }).map((_, i) => (
          <StoreCardSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (!hasResults) {
    return (
      <div className="search-empty" role="status">
        <div className="search-empty__icon" aria-hidden="true">🔍</div>
        <h3 className="search-empty__title">Sin resultados</h3>
        <p className="search-empty__desc">
          No encontramos tiendas con esos filtros. Prueba con otros términos o
          amplía los criterios de búsqueda.
        </p>
      </div>
    )
  }

  return (
    <div>
      <div className="store-grid" role="list">
        {stores.map((store) => (
          <StoreCard key={store.id} store={store} />
        ))}
      </div>

      {/* Paginación */}
      {totalPages > 1 && (
        <nav className="pagination" aria-label="Paginación de resultados">
          <button
            type="button"
            className="pagination__btn"
            disabled={currentPage <= 1}
            onClick={() => onPageChange(currentPage - 1)}
            aria-label="Página anterior"
          >
            ‹
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter(
              (p) =>
                p === 1 ||
                p === totalPages ||
                Math.abs(p - currentPage) <= 2,
            )
            .reduce<(number | 'ellipsis')[]>((acc, p, idx, arr) => {
              if (idx > 0 && arr[idx - 1] !== p - 1) acc.push('ellipsis')
              acc.push(p)
              return acc
            }, [])
            .map((item, idx) =>
              item === 'ellipsis' ? (
                <span key={`ellipsis-${idx}`} className="pagination__ellipsis" aria-hidden="true">
                  …
                </span>
              ) : (
                <button
                  key={item}
                  type="button"
                  className={[
                    'pagination__btn',
                    currentPage === item ? 'pagination__btn--active' : '',
                  ].join(' ')}
                  onClick={() => onPageChange(item as number)}
                  aria-label={`Página ${item}`}
                  aria-current={currentPage === item ? 'page' : undefined}
                >
                  {item}
                </button>
              ),
            )}

          <button
            type="button"
            className="pagination__btn"
            disabled={currentPage >= totalPages}
            onClick={() => onPageChange(currentPage + 1)}
            aria-label="Página siguiente"
          >
            ›
          </button>
        </nav>
      )}
    </div>
  )
}
