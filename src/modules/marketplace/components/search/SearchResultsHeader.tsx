import type { ISearchFilters, TStoreSortBy } from '@/modules/shared/types'

interface ISearchResultsHeaderProps {
  total: number
  filters: ISearchFilters
  onSortChange: (sort: TStoreSortBy) => void
  isLoading: boolean
}

const SORT_OPTIONS: { value: TStoreSortBy; label: string }[] = [
  { value: 'rating', label: 'Mejor calificadas' },
  { value: 'price_asc', label: 'Precio: menor a mayor' },
  { value: 'price_desc', label: 'Precio: mayor a menor' },
  { value: 'newest', label: 'Más recientes' },
]

export function SearchResultsHeader({
  total,
  filters,
  onSortChange,
  isLoading,
}: ISearchResultsHeaderProps) {
  const queryLabel = filters.query ? `"${filters.query}"` : 'logísticos'

  return (
    <div className="results-header">
      <div className="results-header__count">
        {isLoading ? (
          <span className="results-header__skeleton" aria-busy="true" />
        ) : (
          <h2 className="results-header__total">
            <span>{total.toLocaleString('es-MX')}</span>{' '}
            {total === 1 ? 'tienda' : 'tiendas'} para servicios {queryLabel}
          </h2>
        )}
      </div>

      <div className="results-header__controls">
        {/* Sort by */}
        <div className="results-sort">
          <label htmlFor="sort-select" className="results-sort__label">
            Ordenar por:
          </label>
          <select
            id="sort-select"
            className="results-sort__select"
            value={filters.sortBy ?? 'rating'}
            onChange={(e) => onSortChange(e.target.value as TStoreSortBy)}
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}
