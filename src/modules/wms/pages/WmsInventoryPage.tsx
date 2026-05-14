import { useState } from 'react';
import { Package, Search, Filter, Layers, Thermometer, ShieldCheck } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

const mockInventory = [
  {
    id: 'INV-A-101',
    product: 'Pallets - Electrónicos',
    client: 'Tech Global Corp',
    quantity: 45,
    unit: 'Pallets',
    location: 'Pasillo A - Rack 03 - Nivel 2',
    status: 'AVAILABLE',
    temperature: 'Ambiente',
    daysInStore: 12,
  },
  {
    id: 'INV-B-205',
    product: 'Contenedor Reefer - Mariscos',
    client: 'Ocean Foods Inc.',
    quantity: 1,
    unit: 'TEU',
    location: 'Patio Frio - Toma 14',
    status: 'QUARANTINE',
    temperature: '-18°C',
    daysInStore: 3,
  },
  {
    id: 'INV-C-012',
    product: 'Bobinas de Acero',
    client: 'Metales del Pacífico',
    quantity: 8,
    unit: 'Bobinas',
    location: 'Patio General - Zona B',
    status: 'RESERVED',
    temperature: 'Ambiente',
    daysInStore: 45,
  },
];

export function WmsInventoryPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'AVAILABLE':
        return <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">Disponible</Badge>;
      case 'QUARANTINE':
        return <Badge className="bg-rose-100 text-rose-800 border-rose-200">Cuarentena</Badge>;
      case 'RESERVED':
        return <Badge className="bg-amber-100 text-amber-800 border-amber-200">Reservado / En Salida</Badge>;
      default:
        return <Badge variant="outline">Desconocido</Badge>;
    }
  };

  return (
    <div className="bg-slate-50 min-h-[calc(100vh-64px)] p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-6">
        
        <div className="flex flex-col md:flex-row justify-between md:items-end gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
              <Layers className="h-8 w-8 text-blue-600" /> Inventario General
            </h1>
            <p className="text-slate-500 mt-1">Control de existencias y ubicaciones en tiempo real dentro del almacén.</p>
          </div>
          
          <div className="flex gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input 
                placeholder="Buscar SKU o Cliente..." 
                className="pl-9 h-10 bg-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" className="bg-white"><Filter className="h-4 w-4 mr-2"/> Filtros</Button>
          </div>
        </div>

        {/* Dashboard Cards summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-blue-100 shadow-sm bg-blue-50/50">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-full"><Package className="h-6 w-6 text-blue-600" /></div>
              <div>
                <p className="text-sm font-medium text-slate-500">Ocupación Total</p>
                <p className="text-2xl font-bold text-slate-900">78%</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-emerald-100 shadow-sm bg-emerald-50/50">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="bg-emerald-100 p-3 rounded-full"><ShieldCheck className="h-6 w-6 text-emerald-600" /></div>
              <div>
                <p className="text-sm font-medium text-slate-500">Bultos Disponibles</p>
                <p className="text-2xl font-bold text-slate-900">4,521</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-amber-100 shadow-sm bg-amber-50/50">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="bg-amber-100 p-3 rounded-full"><Thermometer className="h-6 w-6 text-amber-600" /></div>
              <div>
                <p className="text-sm font-medium text-slate-500">Zonas Refrigeradas</p>
                <p className="text-2xl font-bold text-slate-900">92% <span className="text-sm font-normal text-slate-500">Ocupadas</span></p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 font-medium uppercase text-xs">
                <tr>
                  <th className="px-6 py-4">ID de Lote</th>
                  <th className="px-6 py-4">Producto / Cliente</th>
                  <th className="px-6 py-4">Ubicación Física</th>
                  <th className="px-6 py-4">Cantidad</th>
                  <th className="px-6 py-4">Estado</th>
                  <th className="px-6 py-4 text-right">Días</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {mockInventory.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-900 whitespace-nowrap">{item.id}</td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-slate-900">{item.product}</p>
                      <p className="text-slate-500 text-xs mt-0.5">{item.client}</p>
                    </td>
                    <td className="px-6 py-4 text-slate-600 whitespace-nowrap">
                      <span className="font-mono text-xs bg-slate-100 px-2 py-1 rounded">{item.location}</span>
                      {item.temperature !== 'Ambiente' && (
                        <span className="ml-2 text-xs text-blue-600 font-medium">{item.temperature}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 font-semibold text-slate-700 whitespace-nowrap">
                      {item.quantity} <span className="font-normal text-slate-500 text-xs">{item.unit}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(item.status)}
                    </td>
                    <td className="px-6 py-4 text-right text-slate-500 whitespace-nowrap">
                      {item.daysInStore}
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
