import { useState } from 'react';
import { ClipboardList, Plus, Search, Truck, FileCheck, ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const mockReceipts = [
  {
    id: 'REC-001',
    orderId: 'ORD-2026-003',
    client: 'TransCaribe Freight',
    truckPlates: 'MX-994-AB',
    date: '14 May 2026 - 10:30 AM',
    status: 'IN_PROCESS',
    operator: 'Carlos M.',
  },
  {
    id: 'REC-002',
    orderId: 'ORD-2026-001',
    client: 'Logística Portuaria Global',
    truckPlates: 'TZ-212-WW',
    date: '13 May 2026 - 04:15 PM',
    status: 'COMPLETED',
    operator: 'Ana P.',
  },
];

export function WmsReceiptsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'IN_PROCESS':
        return <Badge className="bg-amber-100 text-amber-800 border-amber-200">Descargando</Badge>;
      case 'COMPLETED':
        return <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">Recepción Cerrada</Badge>;
      default:
        return <Badge variant="outline">Pendiente</Badge>;
    }
  };

  return (
    <div className="bg-slate-50 min-h-[calc(100vh-64px)] p-6 md:p-10">
      <div className="max-w-6xl mx-auto space-y-6">
        
        <div className="flex flex-col md:flex-row justify-between md:items-end gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
              <ClipboardList className="h-8 w-8 text-blue-600" /> Entradas y Recepciones
            </h1>
            <p className="text-slate-500 mt-1">Registra la llegada de transporte y verifica la integridad de la carga.</p>
          </div>
          
          <div className="flex gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input 
                placeholder="Buscar folio o placas..." 
                className="pl-9 h-10 bg-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
              <Plus className="h-4 w-4"/> Nueva Recepción
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Active Process Side */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-bold text-slate-900 text-lg">Recepciones del Día</h3>
            {mockReceipts.map((rec) => (
              <div key={rec.id} className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex gap-4">
                  <div className={`p-3 rounded-xl h-12 w-12 flex items-center justify-center ${rec.status === 'IN_PROCESS' ? 'bg-amber-100 text-amber-600' : 'bg-emerald-100 text-emerald-600'}`}>
                    {rec.status === 'IN_PROCESS' ? <Truck className="h-6 w-6" /> : <FileCheck className="h-6 w-6" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-slate-900">{rec.id}</h4>
                      {getStatusBadge(rec.status)}
                    </div>
                    <p className="text-sm text-slate-500 mt-1">Cliente: <span className="font-medium text-slate-700">{rec.client}</span></p>
                    <div className="flex gap-3 mt-2 text-xs font-medium text-slate-400">
                      <span>Ref: {rec.orderId}</span>
                      <span>•</span>
                      <span>Placas: {rec.truckPlates}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-3">
                  <span className="text-xs text-slate-500">{rec.date}</span>
                  <Button variant="outline" size="sm" className="gap-2">
                    {rec.status === 'IN_PROCESS' ? 'Continuar Escaneo' : 'Ver Reporte'} <ArrowRight className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions Side */}
          <div className="space-y-4">
            <h3 className="font-bold text-slate-900 text-lg">Acciones de Andén</h3>
            
            <div className="bg-slate-900 rounded-xl p-6 text-white shadow-lg relative overflow-hidden group hover:-translate-y-1 transition-transform cursor-pointer">
              <div className="absolute right-[-10%] top-[-10%] opacity-10">
                <Search className="h-32 w-32" />
              </div>
              <h4 className="font-bold text-lg mb-2">Escanear Código de Barras</h4>
              <p className="text-slate-400 text-sm mb-4">Usa la cámara del dispositivo para dar ingreso rápido a paletas.</p>
              <Button className="w-full bg-white text-slate-900 hover:bg-slate-100 font-bold">Abrir Escáner</Button>
            </div>

            <div className="bg-blue-50 rounded-xl p-6 border border-blue-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <h4 className="font-bold text-blue-900 text-lg mb-2">Asignar Cortina</h4>
              <p className="text-blue-700/80 text-sm mb-4">Verifica disponibilidad de puertas de descarga en el patio.</p>
              <Button variant="outline" className="w-full border-blue-200 text-blue-700 hover:bg-blue-100">Ver Mapa de Patio</Button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
