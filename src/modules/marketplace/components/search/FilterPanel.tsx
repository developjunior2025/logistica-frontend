import type { ISearchFilters } from '@/modules/shared/types'

// Datos mock de filtros (se reemplazarán con API en Sprint 03)
const SERVICE_TYPES = [
  { id: 1, name: 'Almacenaje General' },
  { id: 2, name: 'Transporte Terrestre' },
  { id: 3, name: 'Despacho Aduanal' },
  { id: 4, name: 'Maniobras Portuarias' },
  { id: 5, name: 'Consolidación de Carga' },
  { id: 6, name: 'Seguro de Mercancía' },
]

const PORTS = [
  { id: 1, name: 'Manzanillo', country: 'MX' },
  { id: 2, name: 'Veracruz', country: 'MX' },
  { id: 3, name: 'Lázaro Cárdenas', country: 'MX' },
  { id: 4, name: 'Altamira', country: 'MX' },
  { id: 5, name: 'Ensenada', country: 'MX' },
  { id: 6, name: 'Guaymas', country: 'MX' },
  { id: 7, name: 'Puerto Limón', country: 'CR' },
  { id: 8, name: 'Callao', country: 'PE' },
]

const RATING_OPTIONS = [
  { value: 4.5, label: '4.5+ ⭐⭐⭐⭐⭐' },
  { value: 4.0, label: '4.0+ ⭐⭐⭐⭐' },
  { value: 3.5, label: '3.5+ ⭐⭐⭐' },
]

// ─────────────────────────────────────────────────────────────────────────────

interface IFilterPanelProps {
  filters: ISearchFilters
  onFilterChange: <K extends keyof ISearchFilters>(
    key: K,
    value: ISearchFilters[K],
  ) => void
  onFiltersChange: (partial: Partial<ISearchFilters>) => void
  onReset: () => void
  isOpen: boolean
  onClose: () => void
}

export function FilterPanel({
  filters,
  onFilterChange,
  onReset,
  isOpen,
  onClose,
}: IFilterPanelProps) {
  const activeCount = countActive(filters)

  return (
    <aside
      className={['filter-panel', isOpen ? 'filter-panel--open' : ''].join(' ')}
      aria-label="Panel de filtros"
      aria-hidden={!isOpen ? 'true' : undefined}
    >
      {/* Header del panel */}
      <div className="filter-panel__header">
        <h2 className="filter-panel__title">
          Filtros
          {activeCount > 0 && (
            <span className="filter-panel__count" aria-label={`${activeCount} filtros activos`}>
              {activeCount}
            </span>
          )}
        </h2>
        <div className="filter-panel__header-actions">
          {activeCount > 0 && (
            <button
              type="button"
              className="filter-panel__reset"
              onClick={onReset}
            >
              Limpiar todo
            </button>
          )}
          {/* Cerrar (solo visible en mobile) */}
          <button
            type="button"
            className="filter-panel__close"
            onClick={onClose}
            aria-label="Cerrar panel de filtros"
          >
            ✕
          </button>
        </div>
      </div>

      <div className="filter-panel__body">
        {/* ── Tipo de servicio ───────────────────────────────────────────── */}
        <FilterSection title="Tipo de servicio">
          {SERVICE_TYPES.map((st) => (
            <CheckboxFilter
              key={st.id}
              id={`filter-type-${st.id}`}
              label={st.name}
              checked={(filters.serviceTypeIds ?? []).includes(st.id)}
              onChange={(checked) => {
                const current = filters.serviceTypeIds ?? []
                onFilterChange(
                  'serviceTypeIds',
                  checked
                    ? [...current, st.id]
                    : current.filter((id) => id !== st.id),
                )
              }}
            />
          ))}
        </FilterSection>

        {/* ── Puerto de operación ────────────────────────────────────────── */}
        <FilterSection title="Puerto de operación">
          {PORTS.map((port) => (
            <CheckboxFilter
              key={port.id}
              id={`filter-port-${port.id}`}
              label={`${port.name} (${port.country})`}
              checked={(filters.portIds ?? []).includes(port.id)}
              onChange={(checked) => {
                const current = filters.portIds ?? []
                onFilterChange(
                  'portIds',
                  checked
                    ? [...current, port.id]
                    : current.filter((id) => id !== port.id),
                )
              }}
            />
          ))}
        </FilterSection>

        {/* ── Calificación mínima ────────────────────────────────────────── */}
        <FilterSection title="Calificación">
          {RATING_OPTIONS.map((opt) => (
            <RadioFilter
              key={opt.value}
              id={`filter-rating-${opt.value}`}
              name="rating-filter"
              label={opt.label}
              checked={filters.ratingMin === opt.value}
              onChange={() => onFilterChange('ratingMin', opt.value)}
            />
          ))}
          {filters.ratingMin && (
            <button
              type="button"
              className="filter-clear-single"
              onClick={() => onFilterChange('ratingMin', undefined)}
            >
              Cualquier calificación
            </button>
          )}
        </FilterSection>

        {/* ── Rango de precio ────────────────────────────────────────────── */}
        <FilterSection title="Precio base (MXN)">
          <div className="filter-price-range">
            <div className="filter-price-range__input-group">
              <label htmlFor="price-min" className="filter-price-range__label">
                Mínimo
              </label>
              <input
                id="price-min"
                type="number"
                className="filter-price-range__input"
                placeholder="0"
                min={0}
                value={filters.priceMin ?? ''}
                onChange={(e) =>
                  onFilterChange(
                    'priceMin',
                    e.target.value ? Number(e.target.value) : undefined,
                  )
                }
              />
            </div>
            <span className="filter-price-range__separator" aria-hidden="true">—</span>
            <div className="filter-price-range__input-group">
              <label htmlFor="price-max" className="filter-price-range__label">
                Máximo
              </label>
              <input
                id="price-max"
                type="number"
                className="filter-price-range__input"
                placeholder="Sin límite"
                min={0}
                value={filters.priceMax ?? ''}
                onChange={(e) =>
                  onFilterChange(
                    'priceMax',
                    e.target.value ? Number(e.target.value) : undefined,
                  )
                }
              />
            </div>
          </div>
        </FilterSection>

        {/* ── Solo verificadas ───────────────────────────────────────────── */}
        <FilterSection title="Verificación">
          <CheckboxFilter
            id="filter-verified"
            label="Solo tiendas verificadas"
            checked={!!filters.verifiedOnly}
            onChange={(checked) => onFilterChange('verifiedOnly', checked)}
          />
        </FilterSection>
      </div>

      {/* Footer con botón Aplicar (mobile) */}
      <div className="filter-panel__footer">
        <button
          type="button"
          id="apply-filters-btn"
          className="filter-panel__apply-btn"
          onClick={onClose}
        >
          Ver resultados
        </button>
      </div>
    </aside>
  )
}

// ─── Sub-componentes ──────────────────────────────────────────────────────────

function FilterSection({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="filter-section">
      <h3 className="filter-section__title">{title}</h3>
      <div className="filter-section__options">{children}</div>
    </div>
  )
}

function CheckboxFilter({
  id,
  label,
  checked,
  onChange,
}: {
  id: string
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
}) {
  return (
    <label htmlFor={id} className="filter-checkbox">
      <input
        type="checkbox"
        id={id}
        className="filter-checkbox__input"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className="filter-checkbox__custom" aria-hidden="true" />
      <span className="filter-checkbox__label">{label}</span>
    </label>
  )
}

function RadioFilter({
  id,
  name,
  label,
  checked,
  onChange,
}: {
  id: string
  name: string
  label: string
  checked: boolean
  onChange: () => void
}) {
  return (
    <label htmlFor={id} className="filter-radio">
      <input
        type="radio"
        id={id}
        name={name}
        className="filter-radio__input"
        checked={checked}
        onChange={onChange}
      />
      <span className="filter-radio__custom" aria-hidden="true" />
      <span className="filter-radio__label">{label}</span>
    </label>
  )
}

function countActive(filters: ISearchFilters): number {
  let n = 0
  if (filters.portIds?.length) n++
  if (filters.serviceTypeIds?.length) n++
  if (filters.ratingMin) n++
  if (filters.priceMin || filters.priceMax) n++
  if (filters.verifiedOnly) n++
  return n
}
