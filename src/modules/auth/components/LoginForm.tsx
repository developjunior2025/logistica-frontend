import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, Lock, Mail } from 'lucide-react';
import { useLogin } from '../hooks/useAuth';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const loginSchema = z.object({
  email: z.string().email({ message: 'Ingrese un correo electrónico válido' }),
  password: z.string().min(6, { message: 'La contraseña debe tener al menos 6 caracteres' }),
});

type TLoginForm = z.infer<typeof loginSchema>;

export function LoginForm() {
  const { mutate: login, isPending } = useLogin();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: TLoginForm) => {
    setErrorMsg(null);
    login(data, {
      onError: (error: any) => {
        setErrorMsg(
          error?.response?.data?.message || 'Error de autenticación. Verifica tus credenciales.'
        );
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {errorMsg && (
        <div className="p-3 text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded-lg">
          {errorMsg}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="email" className="text-slate-700">Correo Electrónico</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
          <Input
            id="email"
            type="email"
            placeholder="correo@ejemplo.com"
            className={`pl-10 h-11 transition-all focus:ring-2 focus:ring-blue-500/20 ${
              errors.email ? 'border-red-500 focus-visible:ring-red-500/20' : ''
            }`}
            {...register('email')}
          />
        </div>
        {errors.email && (
          <p className="text-xs text-red-500 animate-in fade-in slide-in-from-top-1">
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password" className="text-slate-700">Contraseña</Label>
          <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-500">
            ¿Olvidaste tu contraseña?
          </a>
        </div>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            className={`pl-10 h-11 transition-all focus:ring-2 focus:ring-blue-500/20 ${
              errors.password ? 'border-red-500 focus-visible:ring-red-500/20' : ''
            }`}
            {...register('password')}
          />
        </div>
        {errors.password && (
          <p className="text-xs text-red-500 animate-in fade-in slide-in-from-top-1">
            {errors.password.message}
          </p>
        )}
      </div>

      <Button 
        type="submit" 
        className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/25 transition-all active:scale-[0.98]"
        disabled={isPending}
      >
        {isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Iniciando sesión...
          </>
        ) : (
          'Ingresar al Marketplace'
        )}
      </Button>
    </form>
  );
}
