import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios'
import { useAuthStore } from '@/store/authStore'

// ── Instancia base de Axios ────────────────────────────────────────────────

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api/v1',
  withCredentials: true, // Necesario para httpOnly cookies (refresh token)
  timeout: 15_000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

// ── Request interceptor: inyectar Access Token ────────────────────────────

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = useAuthStore.getState().accessToken
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

// ── Response interceptor: manejar 401 y refrescar token ──────────────────

let isRefreshing = false
let refreshQueue: Array<(token: string) => void> = []

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean
    }

    // Si no es 401 o ya se reintentó, rechazar directo
    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error)
    }

    if (isRefreshing) {
      // Encolar peticiones mientras se refresca
      return new Promise((resolve) => {
        refreshQueue.push((token: string) => {
          originalRequest.headers['Authorization'] = `Bearer ${token}`
          resolve(api(originalRequest))
        })
      })
    }

    originalRequest._retry = true
    isRefreshing = true

    try {
      // El refresh token está en la httpOnly cookie, se envía automáticamente
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api/v1'}/auth/refresh`,
        {},
        { withCredentials: true },
      )

      const newToken: string = data.accessToken
      useAuthStore.getState().setAccessToken(newToken)

      // Resolver la cola pendiente
      refreshQueue.forEach((cb) => cb(newToken))
      refreshQueue = []

      originalRequest.headers['Authorization'] = `Bearer ${newToken}`
      return api(originalRequest)
    } catch (_refreshError) {
      // Refresh falló → logout
      useAuthStore.getState().logout()
      refreshQueue = []
      window.location.href = '/auth/login'
      return Promise.reject(_refreshError)
    } finally {
      isRefreshing = false
    }
  },
)

export default api
