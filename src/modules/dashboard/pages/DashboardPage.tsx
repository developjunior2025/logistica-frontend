import { useAuthStore } from '@/store/useAuthStore';
import { useDashboardMetrics } from '../hooks/useDashboard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, CreditCard, Activity, AlertCircle, Clock, ShieldCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export function DashboardPage() {
  const user = useAuthStore((state) => state.user);
  const { data: metrics, isLoading, isError } = useDashboardMetrics();

  if (!user) return null;

  const roleLabels: Record<string, string> = {
    'PROF-CLI-001': 'Cliente Logístico',
    'PROF-TIE-002': 'Operador (Tienda)',
    'PROF-SUP-003': 'Superadmin',
    'PROF-OPE-004': 'Operador Interno',
  };

  const roleName = roleLabels[user.role] || user.role;

  // Render Skeleton or Loader
  if (isLoading) {
    return (
      <div className="p-8 space-y-6">
        <div className="h-10 w-1/3 bg-slate-200 animate-pulse rounded-lg"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 bg-slate-200 animate-pulse rounded-xl"></div>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[50vh]">
        <div className="text-center space-y-4">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto" />
          <h2 className="text-xl font-bold text-slate-900">Error al cargar métricas</h2>
          <p className="text-slate-500">No pudimos conectar con el servidor para obtener tus datos operativos.</p>
        </div>
      </div>
    );
  }

  // Type Casting based on what we know is returned
  const data: any = metrics || {};

  return (
    <div className="p-6 md:p-8 space-y-8 bg-slate-50 min-h-[calc(100vh-64px)]">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Hola, {user.name.split(' ')[0]} 👋
          </h1>
          <p className="text-slate-500 mt-1">Aquí está el resumen de tu operación logística al día de hoy.</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 border-0 px-3 py-1 font-semibold text-sm">
            {roleName}
          </Badge>
          <div className="h-10 w-10 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold">
            {user.name.charAt(0)}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* --- CLIENT METRICS --- */}
        {user.role === 'PROF-CLI-001' && (
          <>
            <MetricCard 
              title="Órdenes Activas" 
              value={data.activeOrders ?? 0} 
              icon={<Activity className="h-5 w-5 text-blue-600" />} 
              trend="+2 desde ayer" 
              color="bg-blue-50 border-blue-100" 
            />
            <MetricCard 
              title="Pagos Pendientes" 
              value={data.pendingPayments ?? 0} 
              icon={<CreditCard className="h-5 w-5 text-amber-600" />} 
              trend="Requieren acción" 
              color="bg-amber-50 border-amber-100" 
            />
            <MetricCard 
              title="Cotizaciones Recibidas" 
              value={3} 
              icon={<Package className="h-5 w-5 text-emerald-600" />} 
              trend="Listas para revisar" 
              color="bg-emerald-50 border-emerald-100" 
            />
          </>
        )}

        {/* --- STORE / OPERATOR METRICS --- */}
        {user.role === 'PROF-TIE-002' && (
          <>
            <MetricCard 
              title="Nuevas Órdenes" 
              value={data.newOrders ?? 0} 
              icon={<Package className="h-5 w-5 text-blue-600" />} 
              trend="Pendientes de procesar" 
              color="bg-blue-50 border-blue-100" 
            />
            <MetricCard 
              title="Comisiones Pendientes" 
              value={data.pendingCommissions ?? 0} 
              icon={<DollarSignIcon className="h-5 w-5 text-rose-600" />} 
              trend="Corte de mes próximo" 
              color="bg-rose-50 border-rose-100" 
            />
            <MetricCard 
              title="Servicios Activos" 
              value={12} 
              icon={<ShieldCheck className="h-5 w-5 text-emerald-600" />} 
              trend="Optimizados" 
              color="bg-emerald-50 border-emerald-100" 
            />
          </>
        )}

        {/* --- ADMIN METRICS --- */}
        {(user.role === 'PROF-SUP-003' || user.role === 'PROF-OPE-004') && (
          <>
            <MetricCard 
              title="Volumen Total de Órdenes" 
              value={data.totalOrders ?? 0} 
              icon={<Activity className="h-5 w-5 text-blue-600" />} 
              trend="Histórico global" 
              color="bg-blue-50 border-blue-100" 
            />
            <MetricCard 
              title="Validaciones Pendientes" 
              value={data.pendingValidations ?? 0} 
              icon={<Clock className="h-5 w-5 text-amber-600" />} 
              trend="Pagos en revisión" 
              color="bg-amber-50 border-amber-100" 
            />
            <MetricCard 
              title="Comisiones Pendientes" 
              value={data.pendingCommissions ?? 0} 
              icon={<DollarSignIcon className="h-5 w-5 text-rose-600" />} 
              trend="Por liquidar a tiendas" 
              color="bg-rose-50 border-rose-100" 
            />
            <MetricCard 
              title="Tickets de Soporte" 
              value={5} 
              icon={<AlertCircle className="h-5 w-5 text-slate-600" />} 
              trend="3 Alta prioridad" 
              color="bg-slate-100 border-slate-200" 
            />
          </>
        )}
      </div>

      {/* Decorative Placeholder for Recent Activity */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 mt-8 min-h-[300px]">
        <h3 className="text-lg font-bold text-slate-900 mb-4">Actividad Reciente</h3>
        <div className="flex flex-col items-center justify-center h-48 text-slate-400 space-y-3">
          <Activity className="h-8 w-8 opacity-50" />
          <p>Tu línea de tiempo operativa aparecerá aquí.</p>
        </div>
      </div>

    </div>
  );
}

function MetricCard({ title, value, icon, trend, color }: any) {
  return (
    <Card className={`border ${color} shadow-sm transition-all hover:shadow-md`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-slate-600">{title}</CardTitle>
        <div className={`p-2 rounded-lg bg-white bg-opacity-60`}>
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-extrabold text-slate-900">{value}</div>
        <p className="text-xs text-slate-500 font-medium mt-1">{trend}</p>
      </CardContent>
    </Card>
  );
}

function DollarSignIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" x2="12" y1="2" y2="22" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}
