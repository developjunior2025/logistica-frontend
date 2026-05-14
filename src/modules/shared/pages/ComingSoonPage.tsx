import { Link } from 'react-router-dom'

interface IComingSoonPageProps {
  title?: string
}

export function ComingSoonPage({ title = 'Próximamente' }: IComingSoonPageProps) {
  return (
    <div className="coming-soon">
      <div className="coming-soon__icon" aria-hidden="true">🚧</div>
      <h1 className="coming-soon__title">{title}</h1>
      <p className="coming-soon__desc">
        Este módulo está en desarrollo. Será implementado en los próximos sprints.
      </p>
      <Link to="/" className="coming-soon__link">
        ← Volver al inicio
      </Link>
    </div>
  )
}
