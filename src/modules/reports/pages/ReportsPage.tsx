import { BarChart3, Download, FileSpreadsheet, Receipt, TrendingUp, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const reports = [
  {
    id: 'orders',
    title: 'Reporte de Órdenes',
    description: 'Listado completo de órdenes con estados, montos y operadores. Exporta el historial operativo del período seleccionado.',
    icon: <FileSpreadsheet className="h-6 w-6 text-blue-600" />,
    bg: 'bg-blue-50 border-blue-100',
    endpoint: '/reports/orders',
    badge: 'CSV',
  },
  {
    id: 'payments',
    title: 'Reporte de Pagos',
    description: 'Detalle de todos los comprobantes subidos, montos validados y fechas de aprobación por el equipo administrativo.',
    icon: <Receipt className="h-6 w-6 text-emerald-600" />,
    bg: 'bg-emerald-50 border-emerald-100',
    endpoint: '/reports/payments',
    badge: 'CSV',
  },
  {
    id: 'commissions',
    title: 'Reporte de Comisiones',
    description: 'Cálculo de comisiones generadas por el Marketplace desglosadas por operador y período fiscal.',
    icon: <TrendingUp className="h-6 w-6 text-purple-600" />,
    bg: 'bg-purple-50 border-purple-100',
    endpoint: '/reports/commissions',
    badge: 'CSV',
  },
];

const recentActivity = [
  { label: 'Órdenes exportadas (semana)', value: 142, delta: '+18%' },
  { label: 'Pagos validados (mes)', value: 89, delta: '+7%' },
  { label: 'Comisiones generadas (mes)', value: '$12,540 USD', delta: '+23%' },
];

export function ReportsPage() {
  const handleExport = async (endpoint: string, title: string) => {
    try {
      const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:3000';
      const token = localStorage.getItem('auth-storage')
        ? JSON.parse(localStorage.getItem('auth-storage')!).state?.token
        : null;

      const res = await fetch(`${apiBase}${endpoint}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error('No se pudo exportar el reporte');

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${title.replace(/\s/g, '_').toLowerCase()}_${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error al exportar:', err);
    }
  };

  return (
    <div className="bg-slate-50 min-h-[calc(100vh-64px)] p-6 md:p-10">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* Header */}
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
            <BarChart3 className="h-8 w-8 text-blue-600" /> Centro de Reportes
          </h1>
          <p className="text-slate-500 mt-1">
            Exporta datos operativos en formato CSV directamente desde el backend del sistema.
          </p>
        </div>

        {/* Summary Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recentActivity.map((item) => (
            <Card key={item.label} className="border-slate-200 shadow-sm bg-white">
              <CardContent className="p-5 flex justify-between items-end">
                <div>
                  <p className="text-xs font-medium text-slate-500">{item.label}</p>
                  <p className="text-2xl font-extrabold text-slate-900 mt-1">{item.value}</p>
                </div>
                <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200 text-xs font-bold">
                  {item.delta}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Export Cards */}
        <div>
          <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Calendar className="h-5 w-5 text-slate-400" />
            Exportaciones Disponibles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reports.map((report) => (
              <Card key={report.id} className={`border ${report.bg} shadow-sm hover:shadow-lg transition-all`}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 bg-white rounded-xl shadow-sm">
                      {report.icon}
                    </div>
                    <Badge className="bg-white border-slate-200 text-slate-700 text-xs font-mono font-bold shadow-sm">
                      {report.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-base mt-4">{report.title}</CardTitle>
                  <CardDescription className="text-slate-500 text-sm leading-relaxed">
                    {report.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <Button
                    onClick={() => handleExport(report.endpoint, report.title)}
                    className="w-full bg-slate-900 hover:bg-blue-600 text-white transition-all gap-2 shadow-md active:scale-95"
                  >
                    <Download className="h-4 w-4" /> Exportar CSV
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Info Footer */}
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 flex items-start gap-4">
          <div className="p-2 bg-blue-100 rounded-full mt-0.5">
            <BarChart3 className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-bold text-blue-900">¿No encuentras el reporte que necesitas?</h3>
            <p className="text-blue-700 text-sm mt-1 leading-relaxed">
              Los reportes personalizados con filtros de fecha, operador y estado estarán disponibles en la próxima versión. 
              Mientras tanto, puedes solicitar uno específico abriendo un ticket de soporte.
            </p>
            <a href="/support" className="inline-flex mt-3 text-sm font-semibold text-blue-700 underline hover:text-blue-900">
              Ir a Soporte →
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
