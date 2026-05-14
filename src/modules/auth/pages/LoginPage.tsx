import { LoginForm } from '../components/LoginForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Ship } from 'lucide-react';
import { Link } from 'react-router-dom';

export function LoginPage() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Visual / Branding Side */}
      <div className="relative hidden lg:flex flex-col justify-between bg-slate-900 p-12 text-white overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-30 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent"></div>
        
        {/* Glassmorphism Accents */}
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-50 animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-50 animate-pulse delay-1000"></div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 font-bold text-2xl tracking-tight">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 shadow-lg shadow-blue-500/30">
              <Ship className="h-6 w-6 text-white" />
            </div>
            Marketplace Logístico
          </div>
        </div>
        
        <div className="relative z-10 space-y-5 max-w-lg">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            El sistema operativo del comercio marítimo.
          </h1>
          <p className="text-slate-300 text-lg leading-relaxed">
            Conecta, gestiona y escala tus operaciones portuarias. Un ecosistema unificado para puertos, agentes aduanales y empresas de transporte.
          </p>
          <div className="flex items-center gap-4 pt-4">
            <div className="flex -space-x-4">
              {[1, 2, 3, 4].map((i) => (
                <img
                  key={i}
                  className="w-10 h-10 rounded-full border-2 border-slate-900 object-cover"
                  src={`https://i.pravatar.cc/100?img=${i + 10}`}
                  alt="User avatar"
                />
              ))}
            </div>
            <p className="text-sm font-medium text-slate-300">
              Más de <span className="text-white font-bold">2,000+</span> empresas operando hoy.
            </p>
          </div>
        </div>
      </div>

      {/* Form Side */}
      <div className="flex flex-col justify-center p-8 lg:p-14 bg-slate-50">
        <div className="mx-auto w-full max-w-md space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          
          <div className="flex items-center gap-3 font-bold text-xl tracking-tight lg:hidden">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
              <Ship className="h-5 w-5 text-white" />
            </div>
            Marketplace
          </div>

          <Card className="border-slate-200/60 shadow-xl shadow-slate-200/40 bg-white/80 backdrop-blur-xl">
            <CardHeader className="space-y-2 pb-6">
              <CardTitle className="text-2xl font-bold tracking-tight text-slate-900">
                Bienvenido de nuevo
              </CardTitle>
              <CardDescription className="text-slate-500 text-base">
                Ingresa tus credenciales para acceder a tu panel de control.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <LoginForm />
              
              <div className="mt-8 text-center text-sm text-slate-500">
                ¿No tienes una cuenta?{' '}
                <Link to="/auth/register" className="font-semibold text-blue-600 hover:text-blue-500 hover:underline transition-all">
                  Solicita acceso
                </Link>
              </div>
            </CardContent>
          </Card>
          
          <p className="text-center text-sm text-slate-400">
            Al iniciar sesión, aceptas nuestros <a href="#" className="underline hover:text-slate-600">Términos de Servicio</a> y <a href="#" className="underline hover:text-slate-600">Política de Privacidad</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
