import { useState } from 'react';
import { FileText, Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

// Dummy data for visual representation
const mockOrders = [
  {
    id: 'ORD-2026-001',
    storeName: 'Logística Portuaria Global',
    serviceName: 'Almacenamiento Refrigerado',
    date: '15 May 2026',
    status: 'PAYMENT_PENDING',
    amount: 1500.00,
  },
  {
    id: 'ORD-2026-002',
    storeName: 'Terminal Pacífico Este',
    serviceName: 'Maniobra de Descarga',
    date: '14 May 2026',
    status: 'IN_PROGRESS',
    amount: 320.00,
  },
  {
    id: 'ORD-2026-003',
    storeName: 'TransCaribe Freight',
    serviceName: 'Transporte Terrestre Carga Especial',
    date: '10 May 2026',
    status: 'COMPLETED',
    amount: 2500.00,
  },
];

export function OrdersListPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'PAYMENT_PENDING':
        return <Badge className="bg-rose-100 text-rose-800 border-rose-200">Pago Pendiente</Badge>;
      case 'PAYMENT_VERIFYING':
        return <Badge className="bg-amber-100 text-amber-800 border-amber-200">Verificando Pago</Badge>;
      case 'IN_PROGRESS':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">En Operación</Badge>;
      case 'COMPLETED':
        return <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">Completada</Badge>;
      default:
        return <Badge variant="outline">Desconocido</Badge>;
    }
  };

  return (
    <div className="bg-slate-50 min-h-[calc(100vh-64px)] p-6 md:p-10">
      <div className="max-w-6xl mx-auto space-y-6">
        
        <div className="flex flex-col md:flex-row justify-between md:items-end gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
              <FileText className="h-8 w-8 text-blue-600" /> Control de Órdenes
            </h1>
            <p className="text-slate-500 mt-1">Sigue el estado de tus operaciones logísticas y gestiona tus pagos.</p>
          </div>
          
          <div className="flex gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input 
                placeholder="Buscar orden..." 
                className="pl-9 h-10 bg-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" className="bg-white"><Filter className="h-4 w-4 mr-2"/> Filtros</Button>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 font-medium uppercase text-xs">
                <tr>
                  <th className="px-6 py-4">Orden</th>
                  <th className="px-6 py-4">Servicio Contratado</th>
                  <th className="px-6 py-4">Fecha Emisión</th>
                  <th className="px-6 py-4">Estado</th>
                  <th className="px-6 py-4 text-right">Total USD</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {mockOrders.map((o) => (
                  <tr key={o.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-900 whitespace-nowrap">{o.id}</td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-slate-900">{o.serviceName}</p>
                      <p className="text-slate-500 text-xs mt-0.5">{o.storeName}</p>
                    </td>
                    <td className="px-6 py-4 text-slate-600 whitespace-nowrap">
                      {o.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(o.status)}
                    </td>
                    <td className="px-6 py-4 text-right font-bold text-slate-900 whitespace-nowrap">
                      ${o.amount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link 
                        to={`/orders/${o.id}`} 
                        className={`font-semibold transition-colors ${o.status === 'PAYMENT_PENDING' ? 'text-rose-600 hover:text-rose-800' : 'text-blue-600 hover:text-blue-800'}`}
                      >
                        {o.status === 'PAYMENT_PENDING' ? 'Pagar Ahora' : 'Ver Detalles'}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
