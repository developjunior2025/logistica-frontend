import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CheckCircle2, Clock, FileText, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

// Dummy data for visual representation
const mockQuotations = [
  {
    id: 'COT-2026-001',
    storeName: 'Logística Portuaria Global',
    serviceName: 'Almacenamiento Refrigerado',
    date: '14 May 2026',
    status: 'PENDING_STORE_RESPONSE',
    amount: null,
  },
  {
    id: 'COT-2026-002',
    storeName: 'Terminal Pacífico Este',
    serviceName: 'Maniobra de Descarga',
    date: '12 May 2026',
    status: 'QUOTED',
    amount: 320.00,
  },
  {
    id: 'COT-2026-003',
    storeName: 'TransCaribe Freight',
    serviceName: 'Transporte Terrestre Carga Especial',
    date: '10 May 2026',
    status: 'ACCEPTED',
    amount: 1500.00,
  },
];

export function QuotationsListPage() {
  const [searchParams] = useSearchParams();
  const showSuccess = searchParams.get('success');
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'PENDING_STORE_RESPONSE':
        return <Badge className="bg-amber-100 text-amber-800 border-amber-200">En Espera (Tienda)</Badge>;
      case 'QUOTED':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Cotizada (Revisar)</Badge>;
      case 'ACCEPTED':
        return <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">Aceptada / Orden Creada</Badge>;
      default:
        return <Badge variant="outline">Desconocido</Badge>;
    }
  };

  return (
    <div className="bg-slate-50 min-h-[calc(100vh-64px)] p-6 md:p-10">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {showSuccess && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
            <CheckCircle2 className="h-5 w-5 text-emerald-600" />
            <p className="font-medium">¡Cotización enviada exitosamente! El operador ha sido notificado.</p>
          </div>
        )}

        <div className="flex flex-col md:flex-row justify-between md:items-end gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
              <FileText className="h-8 w-8 text-blue-600" /> Mis Cotizaciones
            </h1>
            <p className="text-slate-500 mt-1">Gestiona las respuestas de los operadores y conviértelas en Órdenes de Trabajo.</p>
          </div>
          
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input 
              placeholder="Buscar por folio o tienda..." 
              className="pl-9 h-10 bg-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 font-medium uppercase text-xs">
                <tr>
                  <th className="px-6 py-4">Folio</th>
                  <th className="px-6 py-4">Operador / Servicio</th>
                  <th className="px-6 py-4">Fecha Solicitud</th>
                  <th className="px-6 py-4">Estado</th>
                  <th className="px-6 py-4 text-right">Monto Estimado</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {mockQuotations.map((q) => (
                  <tr key={q.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-900 whitespace-nowrap">{q.id}</td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-slate-900">{q.storeName}</p>
                      <p className="text-slate-500 text-xs mt-0.5">{q.serviceName}</p>
                    </td>
                    <td className="px-6 py-4 text-slate-600 flex items-center gap-1.5 whitespace-nowrap">
                      <Clock className="h-3.5 w-3.5 text-slate-400" /> {q.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(q.status)}
                    </td>
                    <td className="px-6 py-4 text-right font-bold text-slate-900 whitespace-nowrap">
                      {q.amount ? `$${q.amount.toFixed(2)}` : <span className="text-slate-400 font-normal">--</span>}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <a href={`/quotations/${q.id}`} className="font-semibold text-blue-600 hover:text-blue-800 transition-colors">
                        Ver Detalles
                      </a>
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
