import { Users, Store, DollarSign, BarChart3, Search, ShieldCheck, XCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const mockStores = [
  { id: 1, name: 'Logística Portuaria Global', category: 'Almacén (WMS)', status: 'ACTIVE', orders: 45, revenue: 68500 },
  { id: 2, name: 'TransCaribe Freight', category: 'Transporte', status: 'ACTIVE', orders: 32, revenue: 47200 },
  { id: 3, name: 'Terminal Pacífico Este', category: 'Terminal (TOS)', status: 'SUSPENDED', orders: 8, revenue: 12300 },
];

export function AdminStoresPage() {
  return (
    <div className="bg-slate-50 min-h-[calc(100vh-64px)] p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-6">

        <div className="flex flex-col md:flex-row justify-between md:items-end gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
              <Store className="h-8 w-8 text-blue-600" /> Gestión de Operadores
            </h1>
            <p className="text-slate-500 mt-1">Administra los operadores logísticos registrados en la plataforma.</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2 self-start md:self-auto">
            <Users className="h-4 w-4" /> Invitar Operador
          </Button>
        </div>

        {/* KPI Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: 'Operadores Activos', value: '24', icon: <Store className="h-5 w-5 text-blue-600" />, bg: 'bg-blue-50 border-blue-100' },
            { label: 'Usuarios Totales', value: '1,284', icon: <Users className="h-5 w-5 text-purple-600" />, bg: 'bg-purple-50 border-purple-100' },
            { label: 'Comisiones del Mes', value: '$12,540', icon: <DollarSign className="h-5 w-5 text-emerald-600" />, bg: 'bg-emerald-50 border-emerald-100' },
            { label: 'Órdenes Totales', value: '3,891', icon: <BarChart3 className="h-5 w-5 text-amber-600" />, bg: 'bg-amber-50 border-amber-100' },
          ].map((kpi) => (
            <Card key={kpi.label} className={`border ${kpi.bg} shadow-sm`}>
              <CardContent className="p-5 flex items-center gap-4">
                <div className="bg-white p-2.5 rounded-xl shadow-sm">{kpi.icon}</div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">{kpi.label}</p>
                  <p className="text-2xl font-extrabold text-slate-900">{kpi.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input placeholder="Buscar operador por nombre o RFC..." className="pl-9 bg-white h-11" />
        </div>

        {/* Stores Table */}
        <Card className="border-slate-200 shadow-sm overflow-hidden">
          <CardHeader className="bg-slate-50 border-b border-slate-200 flex-row justify-between items-center p-4">
            <CardTitle className="text-base">Directorio de Operadores</CardTitle>
          </CardHeader>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-500 border-b border-slate-100 uppercase text-xs font-medium">
                <tr>
                  <th className="px-6 py-4">Operador / Categoría</th>
                  <th className="px-6 py-4">Estado</th>
                  <th className="px-6 py-4 text-right">Órdenes</th>
                  <th className="px-6 py-4 text-right">Ingresos</th>
                  <th className="px-6 py-4 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {mockStores.map((store) => (
                  <tr key={store.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-slate-900">{store.name}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{store.category}</p>
                    </td>
                    <td className="px-6 py-4">
                      {store.status === 'ACTIVE'
                        ? <Badge className="bg-emerald-100 text-emerald-800 border-0">Activo</Badge>
                        : <Badge className="bg-rose-100 text-rose-800 border-0">Suspendido</Badge>
                      }
                    </td>
                    <td className="px-6 py-4 text-right font-semibold text-slate-700">{store.orders}</td>
                    <td className="px-6 py-4 text-right font-bold text-slate-900">${store.revenue.toLocaleString()}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button size="sm" variant="outline" className="gap-1.5">
                          <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" /> Verificar
                        </Button>
                        <Button size="sm" variant="outline" className="gap-1.5 border-rose-200 text-rose-600 hover:bg-rose-50">
                          <XCircle className="h-3.5 w-3.5" /> Suspender
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

      </div>
    </div>
  );
}
