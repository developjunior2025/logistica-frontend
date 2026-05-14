import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const schema = z.object({
  email: z.string().email('Correo electrónico inválido'),
})
type TForm = z.infer<typeof schema>

export function ForgotPasswordPage() {
  const [sent, setSent] = useState(false)
  const { register, handleSubmit, formState: { errors }, getValues } = useForm<TForm>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (_data: TForm) => {
    // TODO: conectar con POST /auth/forgot-password
    setSent(true)
  }

  if (sent) {
    return (
      <div className="auth-form auth-form--success">
        <div className="auth-success__icon" aria-hidden="true">📧</div>
        <h1 className="auth-form__title">Revisa tu correo</h1>
        <p className="auth-form__subtitle">
          Enviamos las instrucciones de recuperación a{' '}
          <strong>{getValues('email')}</strong>
        </p>
        <Link to="/auth/login" className="auth-form__submit-btn" style={{ textAlign: 'center', display: 'block' }}>
          Volver al login
        </Link>
      </div>
    )
  }

  return (
    <div className="auth-form">
      <div className="auth-form__header">
        <h1 className="auth-form__title">Recuperar contraseña</h1>
        <p className="auth-form__subtitle">
          Te enviaremos un enlace para restablecer tu contraseña.
        </p>
      </div>
      <form id="forgot-password-form" className="auth-form__form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="form-field">
          <label htmlFor="forgot-email" className="form-field__label">Correo electrónico</label>
          <input
            id="forgot-email"
            type="email"
            className={['form-field__input', errors.email ? 'form-field__input--error' : ''].join(' ')}
            placeholder="tu@correo.com"
            {...register('email')}
          />
          {errors.email && <p className="form-field__error" role="alert">{errors.email.message}</p>}
        </div>
        <button id="forgot-submit-btn" type="submit" className="auth-form__submit-btn">
          Enviar instrucciones
        </button>
      </form>
      <p className="auth-form__switch">
        <Link to="/auth/login" className="auth-form__switch-link">← Volver al login</Link>
      </p>
    </div>
  )
}
