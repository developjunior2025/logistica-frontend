import { useState } from 'react';
import { MapPin, Truck, Clock, Navigation, Package, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const mockTrips = [
  {
    id: 'VIA-2026-041',
    driver: 'Ramón Espinoza',
    plates: 'MX-994-AB',
    origin: 'Puerto de Veracruz',
    destination: 'CEDIS Norte — Monterrey',
    cargo: 'Contenedor 40ft - Electrónicos',
    orderId: 'ORD-2026-002',
    status: 'IN_TRANSIT',
    eta: '16 May 2026 - 06:00 AM',
    distanceLeft: '312 km',
  },
  {
    id: 'VIA-2026-038',
    driver: 'Patricia Soto',
    plates: 'NL-451-CC',
    origin: 'CEDIS Sur — CDMX',
    destination: 'Puerto de Manzanillo',
    cargo: 'Carga General — 8 Pallets',
    orderId: 'ORD-2026-005',
    status: 'AT_DESTINATION',
    eta: '14 May 2026 - 10:30 AM',
    distanceLeft: '0 km',
  },
  {
    id: 'VIA-2026-035',
    driver: 'Jorge Mendoza',
    plates: 'DF-120-ZZ',
    origin: 'Puerto de Altamira',
    destination: 'Zona Industrial Vallejo',
    cargo: 'Bobinas de Acero — 8 unidades',
    orderId: 'ORD-2026-007',
    status: 'INCIDENT',
    eta: 'Retrasado',
    distanceLeft: '98 km',
  },
];

export function TransportTripsPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'in_transit' | 'completed'>('all');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'IN_TRANSIT':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">En Tránsito</Badge>;
      case 'AT_DESTINATION':
        return <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">En Destino</Badge>;
      case 'INCIDENT':
        return <Badge className="bg-rose-100 text-rose-800 border-rose-200">Incidente Reportado</Badge>;
      default:
        return <Badge variant="outline">Desconocido</Badge>;
    }
  };

  return (
    <div className="bg-slate-50 min-h-[calc(100vh-64px)] p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-6">

        <div className="flex flex-col md:flex-row justify-between md:items-end gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
              <Truck className="h-8 w-8 text-blue-600" /> Gestión de Viajes
            </h1>
            <p className="text-slate-500 mt-1">Monitorea el estado de cada unidad de transporte en tiempo real.</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2 self-start md:self-auto">
            <Navigation className="h-4 w-4" /> Asignar Nuevo Viaje
          </Button>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: 'Unidades en Tránsito', value: 8, icon: <Truck className="h-5 w-5 text-blue-500" />, color: 'bg-blue-50 border-blue-100' },
            { label: 'Llegadas Confirmadas Hoy', value: 5, icon: <CheckCircle2 className="h-5 w-5 text-emerald-500" />, color: 'bg-emerald-50 border-emerald-100' },
            { label: 'Incidentes Activos', value: 1, icon: <AlertCircle className="h-5 w-5 text-rose-500" />, color: 'bg-rose-50 border-rose-100' },
          ].map((s) => (
            <Card key={s.label} className={`border ${s.color} shadow-sm`}>
              <CardContent className="p-5 flex items-center gap-4">
                <div className="bg-white p-3 rounded-full shadow-sm">{s.icon}</div>
                <div>
                  <p className="text-xs font-medium text-slate-500">{s.label}</p>
                  <p className="text-3xl font-extrabold text-slate-900">{s.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-white border border-slate-200 p-1 rounded-xl w-fit shadow-sm">
          {(['all', 'in_transit', 'completed'] as const).map((tab) => {
            const labels = { all: 'Todos', in_transit: 'En Tránsito', completed: 'Completados' };
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                  activeTab === tab
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {labels[tab]}
              </button>
            );
          })}
        </div>

        {/* Trip Cards */}
        <div className="space-y-4">
          {mockTrips.map((trip) => (
            <Card
              key={trip.id}
              className={`border shadow-sm hover:shadow-lg transition-all ${
                trip.status === 'INCIDENT' ? 'border-rose-200 bg-rose-50/30' : 'border-slate-200 bg-white'
              }`}
            >
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row justify-between gap-4">
                  
                  {/* Left: Trip Info */}
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center flex-wrap gap-3">
                      <h3 className="font-bold text-slate-900 text-lg">{trip.id}</h3>
                      {getStatusBadge(trip.status)}
                      <span className="text-sm text-slate-500 font-mono">{trip.plates}</span>
                    </div>

                    {/* Route visualization */}
                    <div className="flex items-center gap-2 text-sm">
                      <div className="flex items-center gap-1.5 text-slate-600">
                        <MapPin className="h-4 w-4 text-slate-400" />
                        <span className="font-medium">{trip.origin}</span>
                      </div>
                      <div className="flex-1 border-t-2 border-dashed border-slate-200 mx-2 relative">
                        {trip.status === 'IN_TRANSIT' && (
                          <Truck className="h-4 w-4 text-blue-500 absolute -top-2 left-1/3 bg-slate-50 rounded" />
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-600">
                        <span className="font-medium">{trip.destination}</span>
                        <MapPin className="h-4 w-4 text-blue-500" />
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                      <div className="flex items-center gap-1.5">
                        <Package className="h-4 w-4 text-slate-400" />
                        {trip.cargo}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-4 w-4 text-slate-400" />
                        ETA: <span className="font-medium text-slate-700">{trip.eta}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Driver Card */}
                  <div className="flex flex-col items-start lg:items-end gap-3">
                    <div className="text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 space-y-1">
                      <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">Operador</p>
                      <p className="font-bold text-slate-900">{trip.driver}</p>
                      <p className="text-xs text-slate-500">{trip.distanceLeft} restantes</p>
                    </div>
                    <div className="flex gap-2">
                      {trip.status === 'INCIDENT' && (
                        <Button size="sm" className="bg-rose-600 hover:bg-rose-700 text-white gap-1.5">
                          <AlertCircle className="h-4 w-4" /> Ver Incidente
                        </Button>
                      )}
                      <Button size="sm" variant="outline">Historial GPS</Button>
                    </div>
                  </div>

                </div>
              </CardContent>
            </Card>
          ))}
        </div>

      </div>
    </div>
  );
}
