import { useState } from 'react'
import { useNavigate } from 'react-router-dom'


// Servicios destacados del homepage
const FEATURED_SERVICES = [
  'Almacenaje',
  'Transporte',
  'Aduana',
  'Maniobras',
  'Consolidación',
  'Seguro de carga',
]

// Estadísticas del marketplace
const STATS = [
  { value: '500+', label: 'Tiendas activas' },
  { value: '12', label: 'Puertos conectados' },
  { value: '98%', label: 'Satisfacción' },
  { value: '24h', label: 'Respuesta promedio' },
]

// ─────────────────────────────────────────────────────────────────────────────

export function MarketplacePage() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (query.trim()) params.set('query', query.trim())
    navigate(`/search?${params.toString()}`)
  }

  return (
    <div className="marketplace-home">
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="marketplace-hero" aria-labelledby="hero-headline">
        <div className="marketplace-hero__overlay" aria-hidden="true" />
        <div className="marketplace-hero__content page-container">
          <div className="marketplace-hero__text">
            <p className="marketplace-hero__eyebrow">Marketplace Logístico</p>
            <h1 id="hero-headline" className="marketplace-hero__headline">
              Conecta con las mejores
              <span className="marketplace-hero__headline-accent"> operadoras portuarias</span>
            </h1>
            <p className="marketplace-hero__subline">
              Busca, compara y cotiza servicios logísticos en los principales puertos
              de México y Latinoamérica.
            </p>

            {/* Search form */}
            <form
              className="marketplace-hero__search"
              onSubmit={handleSubmit}
              role="search"
              aria-label="Buscar tiendas logísticas"
            >
              <div className="hero-search__input-wrap">
                <svg
                  className="hero-search__icon"
                  width="20"
                  height="20"
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
                  id="hero-search-input"
                  type="search"
                  className="hero-search__input"
                  placeholder="Busca almacenaje, transporte, aduana..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  autoComplete="off"
                  aria-label="Buscar servicios logísticos"
                />
              </div>
              <button
                type="submit"
                id="hero-search-btn"
                className="hero-search__btn"
              >
                Buscar
              </button>
            </form>

            {/* Trending tags */}
            <div className="marketplace-hero__trending" aria-label="Búsquedas populares">
              <span className="trending__label">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1dbf73" strokeWidth="2.5" aria-hidden="true">
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                  <polyline points="17 6 23 6 23 12" />
                </svg>
                Trending:
              </span>
              {FEATURED_SERVICES.map((service) => (
                <button
                  key={service}
                  type="button"
                  className="trending__tag"
                  onClick={() => navigate(`/search?query=${encodeURIComponent(service)}`)}
                >
                  {service}
                </button>
              ))}
            </div>
          </div>

          {/* Hero decoration */}
          <div className="marketplace-hero__visual" aria-hidden="true">
            <div className="hero-visual__card hero-visual__card--1">
              <div className="hero-visual__card-icon">🚢</div>
              <p className="hero-visual__card-label">Almacenaje General</p>
              <p className="hero-visual__card-meta">⭐ 4.9 · 120 reseñas</p>
            </div>
            <div className="hero-visual__card hero-visual__card--2">
              <div className="hero-visual__card-icon">🏗️</div>
              <p className="hero-visual__card-label">Maniobras de Patio</p>
              <p className="hero-visual__card-meta">⭐ 4.7 · 89 reseñas</p>
            </div>
            <div className="hero-visual__card hero-visual__card--3">
              <div className="hero-visual__card-icon">📦</div>
              <p className="hero-visual__card-label">Despacho Aduanal</p>
              <p className="hero-visual__card-meta">⭐ 4.8 · 204 reseñas</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ────────────────────────────────────────────────────────── */}
      <section className="marketplace-stats" aria-label="Estadísticas del marketplace">
        <div className="page-container">
          <div className="marketplace-stats__grid">
            {STATS.map((stat) => (
              <div key={stat.label} className="stat-item">
                <p className="stat-item__value">{stat.value}</p>
                <p className="stat-item__label">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CATEGORÍAS ───────────────────────────────────────────────────── */}
      <section className="marketplace-categories" aria-labelledby="categories-title">
        <div className="page-container">
          <h2 id="categories-title" className="section-title">
            Servicios logísticos populares
          </h2>
          <div className="categories-grid">
            {CATEGORY_CARDS.map((cat) => (
              <button
                key={cat.title}
                type="button"
                className="category-card"
                onClick={() =>
                  navigate(`/search?type=${cat.typeId}`)
                }
                aria-label={`Ver ${cat.title}`}
              >
                <div className="category-card__emoji" aria-hidden="true">
                  {cat.emoji}
                </div>
                <div className="category-card__content">
                  <h3 className="category-card__title">{cat.title}</h3>
                  <p className="category-card__count">{cat.count} tiendas</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
      <section className="marketplace-how" aria-labelledby="how-title">
        <div className="page-container">
          <h2 id="how-title" className="section-title">
            ¿Cómo funciona?
          </h2>
          <div className="how-steps">
            {HOW_STEPS.map((step, i) => (
              <div key={step.title} className="how-step">
                <div className="how-step__number" aria-hidden="true">
                  {i + 1}
                </div>
                <div className="how-step__icon" aria-hidden="true">{step.icon}</div>
                <h3 className="how-step__title">{step.title}</h3>
                <p className="how-step__desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="marketplace-cta" aria-labelledby="cta-title">
        <div className="page-container">
          <div className="marketplace-cta__inner">
            <h2 id="cta-title" className="marketplace-cta__title">
              ¿Tienes una operadora logística?
            </h2>
            <p className="marketplace-cta__desc">
              Regístra tu tienda y llega a miles de importadores y exportadores
              en los principales puertos del país.
            </p>
            <div className="marketplace-cta__actions">
              <a href="/store/setup" id="cta-register-store" className="cta-btn cta-btn--primary">
                Registrar mi empresa
              </a>
              <a href="/search" className="cta-btn cta-btn--ghost">
                Explorar marketplace
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const CATEGORY_CARDS = [
  { emoji: '🏭', title: 'Almacenaje General', count: 124, typeId: 1 },
  { emoji: '🚛', title: 'Transporte Terrestre', count: 98, typeId: 2 },
  { emoji: '📋', title: 'Despacho Aduanal', count: 76, typeId: 3 },
  { emoji: '🏗️', title: 'Maniobras Portuarias', count: 45, typeId: 4 },
  { emoji: '📦', title: 'Consolidación de Carga', count: 38, typeId: 5 },
  { emoji: '🔒', title: 'Seguro de Mercancía', count: 29, typeId: 6 },
]

const HOW_STEPS = [
  {
    icon: '🔍',
    title: 'Busca y filtra',
    desc: 'Encuentra tiendas logísticas por puerto, tipo de servicio, calificación y precio.',
  },
  {
    icon: '💬',
    title: 'Solicita cotización',
    desc: 'Describe tu necesidad y recibe una propuesta detallada de la tienda en horas.',
  },
  {
    icon: '✅',
    title: 'Aprueba y opera',
    desc: 'Acepta la cotización, realiza el pago y sigue el estado de tu operación en tiempo real.',
  },
  {
    icon: '⭐',
    title: 'Califica el servicio',
    desc: 'Tu opinión ayuda a otros clientes a elegir los mejores proveedores.',
  },
]
