import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, Lock, Mail, User } from 'lucide-react';
import { useRegister } from '../hooks/useAuth';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const registerSchema = z.object({
  name: z.string().min(3, { message: 'El nombre debe tener al menos 3 caracteres' }),
  email: z.string().email({ message: 'Ingrese un correo electrónico válido' }),
  password: z.string().min(6, { message: 'La contraseña debe tener al menos 6 caracteres' }),
});

type TRegisterForm = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const { mutate: registerUser, isPending } = useRegister();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TRegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: TRegisterForm) => {
    setErrorMsg(null);
    registerUser(data, {
      onError: (error: any) => {
        setErrorMsg(
          error?.response?.data?.message || 'Error al registrar el usuario. Intenta nuevamente.'
        );
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {errorMsg && (
        <div className="p-3 text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded-lg">
          {errorMsg}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="name" className="text-slate-700">Nombre Completo</Label>
        <div className="relative">
          <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
          <Input
            id="name"
            placeholder="Ej. Juan Pérez"
            className={`pl-10 h-11 transition-all focus:ring-2 focus:ring-blue-500/20 ${
              errors.name ? 'border-red-500 focus-visible:ring-red-500/20' : ''
            }`}
            {...register('name')}
          />
        </div>
        {errors.name && (
          <p className="text-xs text-red-500 animate-in fade-in slide-in-from-top-1">
            {errors.name.message}
          </p>
        )}
      </div>

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
        <Label htmlFor="password" className="text-slate-700">Contraseña</Label>
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
        className="w-full h-11 mt-2 bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/25 transition-all active:scale-[0.98]"
        disabled={isPending}
      >
        {isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Creando cuenta...
          </>
        ) : (
          'Crear Cuenta'
        )}
      </Button>
    </form>
  );
}
