import { useNavigate, Link, useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useMutation } from '@tanstack/react-query'
import { useAuthStore } from '@/store/authStore'
import api from '@/modules/shared/services/api'
import type { ILoginResponse } from '@/modules/shared/types'

// ── Schema ─────────────────────────────────────────────────────────────────

const loginSchema = z.object({
  email: z.string().email('Correo electrónico inválido'),
  password: z.string().min(6, 'Mínimo 6 caracteres'),
})

type TLoginForm = z.infer<typeof loginSchema>

// ── Servicio ────────────────────────────────────────────────────────────────

async function loginRequest(credentials: TLoginForm): Promise<ILoginResponse> {
  const { data } = await api.post<ILoginResponse>('/auth/login', credentials)
  return data
}

// ─────────────────────────────────────────────────────────────────────────────

export function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const setAuth = useAuthStore((s) => s.setAuth)

  const from = (location.state as { from?: Location })?.from?.pathname ?? '/dashboard'

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginForm>({
    resolver: zodResolver(loginSchema),
  })

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: loginRequest,
    onSuccess: ({ user, accessToken }) => {
      setAuth(user, accessToken)
      navigate(from, { replace: true })
    },
  })

  const onSubmit = (data: TLoginForm) => mutate(data)

  const serverError =
    isError && error instanceof Error ? error.message : null

  return (
    <div className="auth-form">
      <div className="auth-form__header">
        <h1 className="auth-form__title">Bienvenido de vuelta</h1>
        <p className="auth-form__subtitle">Ingresa a tu cuenta de LogísticaPro</p>
      </div>

      <form
        id="login-form"
        className="auth-form__form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        {serverError && (
          <div className="auth-form__server-error" role="alert">
            {serverError}
          </div>
        )}

        <div className="form-field">
          <label htmlFor="login-email" className="form-field__label">
            Correo electrónico
          </label>
          <input
            id="login-email"
            type="email"
            className={['form-field__input', errors.email ? 'form-field__input--error' : ''].join(' ')}
            placeholder="tu@correo.com"
            autoComplete="email"
            {...register('email')}
          />
          {errors.email && (
            <p className="form-field__error" role="alert">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="form-field">
          <div className="form-field__label-row">
            <label htmlFor="login-password" className="form-field__label">
              Contraseña
            </label>
            <Link to="/auth/forgot-password" className="form-field__link">
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
          <input
            id="login-password"
            type="password"
            className={['form-field__input', errors.password ? 'form-field__input--error' : ''].join(' ')}
            placeholder="••••••••"
            autoComplete="current-password"
            {...register('password')}
          />
          {errors.password && (
            <p className="form-field__error" role="alert">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          id="login-submit-btn"
          type="submit"
          className="auth-form__submit-btn"
          disabled={isPending}
          aria-busy={isPending}
        >
          {isPending ? (
            <span className="btn-spinner" aria-hidden="true" />
          ) : null}
          {isPending ? 'Iniciando sesión...' : 'Iniciar sesión'}
        </button>
      </form>

      <p className="auth-form__switch">
        ¿No tienes cuenta?{' '}
        <Link to="/auth/register" className="auth-form__switch-link">
          Regístrate gratis
        </Link>
      </p>
    </div>
  )
}
