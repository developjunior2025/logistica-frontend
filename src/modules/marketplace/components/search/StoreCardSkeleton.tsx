/** Skeleton de carga para StoreCard — mismo layout, sin datos */
export function StoreCardSkeleton() {
  return (
    <div className="store-card store-card--skeleton" aria-hidden="true">
      <div className="store-card__cover skeleton-block" />
      <div className="store-card__body">
        <div className="skeleton-line skeleton-line--short" />
        <div className="skeleton-line skeleton-line--medium" />
        <div className="skeleton-line skeleton-line--short" />
        <div className="skeleton-line skeleton-line--tags" />
        <div className="skeleton-line skeleton-line--footer" />
      </div>
    </div>
  )
}
