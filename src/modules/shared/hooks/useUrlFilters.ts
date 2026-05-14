import { useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import type { ISearchFilters } from '@/modules/shared/types'

/**
 * Hook que sincroniza los filtros de búsqueda con la URL.
 * Permite que los filtros sean compartibles y funcionen con el botón Back.
 *
 * Yelp/Airbnb-like: ?query=almacen&port=1,2&type=3&rating=4&price=0-5000
 */
export function useUrlFilters() {
  const [searchParams, setSearchParams] = useSearchParams()

  const filters: ISearchFilters = {
    query: searchParams.get('query') ?? undefined,
    portIds: parseIds(searchParams.get('port')),
    serviceTypeIds: parseIds(searchParams.get('type')),
    countryIds: parseIds(searchParams.get('country')),
    ratingMin: parseNum(searchParams.get('rating')),
    priceMin: parseNum(searchParams.get('priceMin')),
    priceMax: parseNum(searchParams.get('priceMax')),
    verifiedOnly: searchParams.get('verified') === 'true',
    sortBy: (searchParams.get('sort') as ISearchFilters['sortBy']) ?? 'rating',
    page: parseNum(searchParams.get('page')) ?? 1,
    limit: parseNum(searchParams.get('limit')) ?? 12,
  }

  const setFilter = useCallback(
    <K extends keyof ISearchFilters>(key: K, value: ISearchFilters[K]) => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev)

        if (value === undefined || value === null || value === '') {
          next.delete(keyToParam(key))
        } else if (Array.isArray(value)) {
          if (value.length === 0) {
            next.delete(keyToParam(key))
          } else {
            next.set(keyToParam(key), value.join(','))
          }
        } else {
          next.set(keyToParam(key), String(value))
        }

        // Resetear página al cambiar cualquier filtro (excepto page misma)
        if (key !== 'page') {
          next.set('page', '1')
        }

        return next
      })
    },
    [setSearchParams],
  )

  const resetFilters = useCallback(() => {
    setSearchParams(new URLSearchParams())
  }, [setSearchParams])

  const setFilters = useCallback(
    (partial: Partial<ISearchFilters>) => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev)
        for (const [key, value] of Object.entries(partial)) {
          const param = keyToParam(key as keyof ISearchFilters)
          if (value === undefined || value === null || value === '') {
            next.delete(param)
          } else if (Array.isArray(value)) {
            if (value.length) {
              next.set(param, value.join(','))
            } else {
              next.delete(param)
            }
          } else {
            next.set(param, String(value))
          }
        }
        next.set('page', '1')
        return next
      })
    },
    [setSearchParams],
  )

  return { filters, setFilter, setFilters, resetFilters }
}

// ── Helpers ───────────────────────────────────────────────────────────────

function parseIds(value: string | null): number[] | undefined {
  if (!value) return undefined
  const ids = value.split(',').map(Number).filter(Boolean)
  return ids.length ? ids : undefined
}

function parseNum(value: string | null): number | undefined {
  if (!value) return undefined
  const n = Number(value)
  return isNaN(n) ? undefined : n
}

/** Mapea keys del objeto ISearchFilters a params de URL */
function keyToParam(key: keyof ISearchFilters): string {
  const map: Record<keyof ISearchFilters, string> = {
    query: 'query',
    portIds: 'port',
    serviceTypeIds: 'type',
    countryIds: 'country',
    ratingMin: 'rating',
    priceMin: 'priceMin',
    priceMax: 'priceMax',
    verifiedOnly: 'verified',
    sortBy: 'sort',
    page: 'page',
    limit: 'limit',
  }
  return map[key]
}
