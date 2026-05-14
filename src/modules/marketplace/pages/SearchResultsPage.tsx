import { useEffect, useRef, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useUrlFilters } from '@/modules/shared/hooks/useUrlFilters'
import { useDebounce } from '@/modules/shared/hooks/useDebounce'
import { FilterPanel } from '../components/search/FilterPanel'
import { StoreGrid } from '../components/search/StoreGrid'
import { SearchResultsHeader } from '../components/search/SearchResultsHeader'
import type { IStore, IPaginatedResult } from '@/modules/shared/types'
import api from '@/modules/shared/services/api'

// ─────────────────────────────────────────────────────────────────────────────

async function fetchStores(
  params: Record<string, string>,
): Promise<IPaginatedResult<IStore>> {
  const { data } = await api.get('/search/stores', { params })
  return data
}

// ─────────────────────────────────────────────────────────────────────────────

export function SearchResultsPage() {
  const { filters, setFilter, setFilters, resetFilters } = useUrlFilters()
  const [localQuery, setLocalQuery] = useState(filters.query ?? '')
  const [filterPanelOpen, setFilterPanelOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  // Sincronizar input local cuando cambia la URL externamente
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLocalQuery(filters.query ?? '')
  }, [filters.query])

  // Debounce: actualizar URL query después de 300ms sin escribir
  const debouncedSetQuery = useDebounce((value: string) => {
    setFilter('query', value || undefined)
  }, 300)

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalQuery(e.target.value)
    debouncedSetQuery(e.target.value)
  }

  // Convertir filtros a query params para la API
  const queryParams: Record<string, string> = {}
  if (filters.query) queryParams.query = filters.query
  if (filters.portIds?.length) queryParams.portIds = filters.portIds.join(',')
  if (filters.serviceTypeIds?.length) queryParams.serviceTypeIds = filters.serviceTypeIds.join(',')
  if (filters.ratingMin) queryParams.ratingMin = String(filters.ratingMin)
  if (filters.priceMin) queryParams.priceMin = String(filters.priceMin)
  if (filters.priceMax) queryParams.priceMax = String(filters.priceMax)
  if (filters.sortBy) queryParams.sortBy = filters.sortBy
  queryParams.page = String(filters.page ?? 1)
  queryParams.limit = String(filters.limit ?? 12)

  const { data, isLoading, isError } = useQuery({
    queryKey: ['stores', queryParams],
    queryFn: () => fetchStores(queryParams),
    staleTime: 30_000,
    // Usar datos anteriores mientras carga la nueva página (no flash)
    placeholderData: (prev) => prev,
  })

  const totalCount = data?.total ?? 0
  const activeFiltersCount = countActiveFilters(filters)

  return (
    <div className="search-page">
      {/* ── Search bar superior ─────────────────────────────────────────── */}
      <div className="search-page__top-bar">
        <div className="page-container search-page__top-inner">
          <div className="search-topbar__input-wrap">
            <svg
              className="search-topbar__icon"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              id="search-top-input"
              ref={inputRef}
              type="search"
              className="search-topbar__input"
              placeholder="Busca almacenaje, transporte, aduana..."
              value={localQuery}
              onChange={handleQueryChange}
              aria-label="Buscar servicios logísticos"
              autoComplete="off"
            />
            {localQuery && (
              <button
                type="button"
                className="search-topbar__clear"
                onClick={() => {
                  setLocalQuery('')
                  setFilter('query', undefined)
                  inputRef.current?.focus()
                }}
                aria-label="Limpiar búsqueda"
              >
                ✕
              </button>
            )}
          </div>

          {/* Botón de filtros (mobile) */}
          <button
            id="filter-toggle-btn"
            type="button"
            className={[
              'search-topbar__filter-btn',
              activeFiltersCount > 0 ? 'search-topbar__filter-btn--active' : '',
            ].join(' ')}
            onClick={() => setFilterPanelOpen(true)}
            aria-expanded={filterPanelOpen}
            aria-label={`Filtros${activeFiltersCount > 0 ? ` (${activeFiltersCount} activos)` : ''}`}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="8" y1="12" x2="16" y2="12" />
              <line x1="11" y1="18" x2="13" y2="18" />
            </svg>
            Filtros
            {activeFiltersCount > 0 && (
              <span className="search-topbar__filter-count" aria-hidden="true">
                {activeFiltersCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* ── Contenido principal ─────────────────────────────────────────── */}
      <div className="search-page__body page-container">
        {/* Panel de filtros lateral (desktop) / bottom-sheet (mobile) */}
        <FilterPanel
          filters={filters}
          onFilterChange={setFilter}
          onFiltersChange={setFilters}
          onReset={resetFilters}
          isOpen={filterPanelOpen}
          onClose={() => setFilterPanelOpen(false)}
        />

        {/* Resultados */}
        <div className="search-page__results">
          <SearchResultsHeader
            total={totalCount}
            filters={filters}
            onSortChange={(sortBy) => setFilter('sortBy', sortBy)}
            isLoading={isLoading}
          />

          {isError ? (
            <div className="search-error" role="alert">
              <p>No se pudieron cargar los resultados. Intenta de nuevo.</p>
              <button type="button" onClick={() => window.location.reload()}>
                Reintentar
              </button>
            </div>
          ) : (
            <StoreGrid
              stores={data?.data ?? []}
              isLoading={isLoading}
              hasResults={(data?.total ?? 0) > 0}
              onPageChange={(page) => setFilter('page', page)}
              currentPage={filters.page ?? 1}
              totalPages={Math.ceil((data?.total ?? 0) / (filters.limit ?? 12))}
            />
          )}
        </div>
      </div>

      {/* Overlay para el bottom-sheet en mobile */}
      {filterPanelOpen && (
        <div
          className="filter-overlay"
          onClick={() => setFilterPanelOpen(false)}
          aria-hidden="true"
        />
      )}
    </div>
  )
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function countActiveFilters(filters: ReturnType<typeof useUrlFilters>['filters']): number {
  let count = 0
  if (filters.portIds?.length) count++
  if (filters.serviceTypeIds?.length) count++
  if (filters.countryIds?.length) count++
  if (filters.ratingMin) count++
  if (filters.priceMin || filters.priceMax) count++
  if (filters.verifiedOnly) count++
  return count
}
