import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useMutation } from '@tanstack/react-query'
import api from '@/modules/shared/services/api'

// ── Schema ─────────────────────────────────────────────────────────────────

const registerSchema = z
  .object({
    name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
    email: z.string().email('Correo electrónico inválido'),
    password: z
      .string()
      .min(8, 'La contraseña debe tener al menos 8 caracteres')
      .regex(/[A-Z]/, 'Debe incluir al menos una mayúscula')
      .regex(/[0-9]/, 'Debe incluir al menos un número'),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  })

type TRegisterForm = z.infer<typeof registerSchema>

// ─────────────────────────────────────────────────────────────────────────────

export function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TRegisterForm>({
    resolver: zodResolver(registerSchema),
  })

  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationFn: async (data: TRegisterForm) => {
      const { confirmPassword: _cp, ...body } = data
      await api.post('/auth/register', body)
    },
  })

  const onSubmit = (data: TRegisterForm) => mutate(data)

  if (isSuccess) {
    return (
      <div className="auth-form auth-form--success">
        <div className="auth-success__icon" aria-hidden="true">✅</div>
        <h1 className="auth-form__title">¡Cuenta creada!</h1>
        <p className="auth-form__subtitle">
          Revisa tu correo para confirmar tu cuenta y luego inicia sesión.
        </p>
        <Link to="/auth/login" className="auth-form__submit-btn" style={{ textAlign: 'center', display: 'block' }}>
          Ir al login
        </Link>
      </div>
    )
  }

  return (
    <div className="auth-form">
      <div className="auth-form__header">
        <h1 className="auth-form__title">Crear cuenta</h1>
        <p className="auth-form__subtitle">Es gratis. Únete al marketplace logístico.</p>
      </div>

      <form
        id="register-form"
        className="auth-form__form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        {isError && (
          <div className="auth-form__server-error" role="alert">
            Este correo ya está registrado o hubo un error. Intenta de nuevo.
          </div>
        )}

        <div className="form-field">
          <label htmlFor="reg-name" className="form-field__label">Nombre completo</label>
          <input
            id="reg-name"
            type="text"
            className={['form-field__input', errors.name ? 'form-field__input--error' : ''].join(' ')}
            placeholder="Juan Pérez"
            autoComplete="name"
            {...register('name')}
          />
          {errors.name && <p className="form-field__error" role="alert">{errors.name.message}</p>}
        </div>

        <div className="form-field">
          <label htmlFor="reg-email" className="form-field__label">Correo electrónico</label>
          <input
            id="reg-email"
            type="email"
            className={['form-field__input', errors.email ? 'form-field__input--error' : ''].join(' ')}
            placeholder="tu@correo.com"
            autoComplete="email"
            {...register('email')}
          />
          {errors.email && <p className="form-field__error" role="alert">{errors.email.message}</p>}
        </div>

        <div className="form-field">
          <label htmlFor="reg-password" className="form-field__label">Contraseña</label>
          <input
            id="reg-password"
            type="password"
            className={['form-field__input', errors.password ? 'form-field__input--error' : ''].join(' ')}
            placeholder="Mínimo 8 caracteres"
            autoComplete="new-password"
            {...register('password')}
          />
          {errors.password && <p className="form-field__error" role="alert">{errors.password.message}</p>}
        </div>

        <div className="form-field">
          <label htmlFor="reg-confirm" className="form-field__label">Confirmar contraseña</label>
          <input
            id="reg-confirm"
            type="password"
            className={['form-field__input', errors.confirmPassword ? 'form-field__input--error' : ''].join(' ')}
            placeholder="Repite tu contraseña"
            autoComplete="new-password"
            {...register('confirmPassword')}
          />
          {errors.confirmPassword && (
            <p className="form-field__error" role="alert">{errors.confirmPassword.message}</p>
          )}
        </div>

        <p className="auth-form__terms">
          Al registrarte aceptas los{' '}
          <Link to="/terms" className="auth-form__switch-link">Términos de uso</Link>{' '}
          y la{' '}
          <Link to="/privacy" className="auth-form__switch-link">Política de privacidad</Link>.
        </p>

        <button
          id="register-submit-btn"
          type="submit"
          className="auth-form__submit-btn"
          disabled={isPending}
          aria-busy={isPending}
        >
          {isPending && <span className="btn-spinner" aria-hidden="true" />}
          {isPending ? 'Creando cuenta...' : 'Crear cuenta gratis'}
        </button>
      </form>

      <p className="auth-form__switch">
        ¿Ya tienes cuenta?{' '}
        <Link to="/auth/login" className="auth-form__switch-link">Iniciar sesión</Link>
      </p>
    </div>
  )
}
