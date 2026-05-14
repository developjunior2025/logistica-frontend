import { RegisterForm } from '../components/RegisterForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Ship, Link as LinkIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

export function RegisterPage() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Form Side */}
      <div className="flex flex-col justify-center p-8 lg:p-14 bg-slate-50 order-2 lg:order-1">
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
                Crea tu cuenta
              </CardTitle>
              <CardDescription className="text-slate-500 text-base">
                Únete a la red logística más grande de la región y digitaliza tus operaciones.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RegisterForm />
              
              <div className="mt-8 text-center text-sm text-slate-500">
                ¿Ya tienes una cuenta?{' '}
                <Link to="/auth/login" className="font-semibold text-blue-600 hover:text-blue-500 hover:underline transition-all">
                  Inicia sesión aquí
                </Link>
              </div>
            </CardContent>
          </Card>
          
          <p className="text-center text-sm text-slate-400">
            Al registrarte, aceptas nuestros <a href="#" className="underline hover:text-slate-600">Términos de Servicio</a> y <a href="#" className="underline hover:text-slate-600">Política de Privacidad</a>.
          </p>
        </div>
      </div>

      {/* Visual / Branding Side */}
      <div className="relative hidden lg:flex flex-col justify-between bg-slate-900 p-12 text-white overflow-hidden order-1 lg:order-2">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1586528116311-ad8ed7c83a7f?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-30 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent"></div>
        
        {/* Glassmorphism Accents */}
        <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-indigo-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-50 animate-pulse"></div>
        <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-50 animate-pulse delay-700"></div>

        <div className="relative z-10 flex justify-end">
          <div className="flex items-center gap-3 font-bold text-2xl tracking-tight">
            Marketplace Logístico
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 shadow-lg shadow-blue-500/30">
              <Ship className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
        
        <div className="relative z-10 space-y-6 max-w-lg self-end text-right">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Expande tu alcance marítimo y terrestre.
          </h1>
          <p className="text-slate-300 text-lg leading-relaxed">
            Publica tus servicios, recibe cotizaciones y administra despachos aduaneros desde un solo lugar.
          </p>
          <div className="flex items-center justify-end gap-4 pt-4">
            <div className="flex items-center gap-2 bg-slate-800/50 backdrop-blur-md px-4 py-2 rounded-full border border-slate-700/50">
              <LinkIcon className="h-4 w-4 text-blue-400" />
              <span className="text-sm font-medium text-slate-200">Integración nativa con WMS y TOS</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
