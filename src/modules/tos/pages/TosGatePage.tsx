import { useState } from 'react';
import { Truck, ShieldCheck, Clock, Search, ScanLine, CheckCircle2, AlertTriangle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Mocked data representing trucks in the gate queue
const mockGateQueue = [
  {
    id: 'GATE-001',
    plates: 'MX-994-AB',
    driver: 'Ricardo López',
    company: 'TransCaribe Freight',
    orderId: 'ORD-2026-002',
    type: 'ENTRY',
    status: 'PENDING',
    time: '10:15 AM',
  },
  {
    id: 'GATE-002',
    plates: 'NL-451-CC',
    driver: 'María García',
    company: 'Logística Norte',
    orderId: 'ORD-2026-005',
    type: 'EXIT',
    status: 'IN_INSPECTION',
    time: '10:32 AM',
  },
  {
    id: 'GATE-003',
    plates: 'DF-120-ZZ',
    driver: 'Jorge Mendoza',
    company: 'Maniobras del Golfo',
    orderId: 'ORD-2026-007',
    type: 'ENTRY',
    status: 'APPROVED',
    time: '10:48 AM',
  },
];

export function TosGatePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [scanValue, setScanValue] = useState('');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PENDING':
        return <Badge className="bg-slate-100 text-slate-700 border-slate-200">En Cola</Badge>;
      case 'IN_INSPECTION':
        return <Badge className="bg-amber-100 text-amber-800 border-amber-200">Inspeccionando</Badge>;
      case 'APPROVED':
        return <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">Ingreso Autorizado</Badge>;
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
              <ShieldCheck className="h-8 w-8 text-blue-600" /> Control de Garita (TOS)
            </h1>
            <p className="text-slate-500 mt-1">Autorización de entradas y salidas de transporte en tiempo real.</p>
          </div>
        </div>

        {/* Stats Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'En Cola', value: 1, icon: <Clock className="h-5 w-5 text-slate-400" />, color: 'bg-white' },
            { label: 'Inspeccionando', value: 1, icon: <ScanLine className="h-5 w-5 text-amber-500" />, color: 'bg-amber-50' },
            { label: 'Autorizados Hoy', value: 12, icon: <CheckCircle2 className="h-5 w-5 text-emerald-500" />, color: 'bg-emerald-50' },
            { label: 'Rechazados Hoy', value: 2, icon: <AlertTriangle className="h-5 w-5 text-rose-500" />, color: 'bg-rose-50' },
          ].map((stat) => (
            <Card key={stat.label} className={`border-slate-200 shadow-sm ${stat.color}`}>
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-500">{stat.label}</p>
                  <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
                </div>
                {stat.icon}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Gate Queue Table */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-slate-900 text-lg">Cola de Acceso</h3>
              <div className="relative w-56">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Placas u Orden..."
                  className="pl-9 h-9 bg-white text-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-3">
              {mockGateQueue.map((entry) => (
                <div
                  key={entry.id}
                  className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-xl ${entry.type === 'ENTRY' ? 'bg-blue-100' : 'bg-rose-100'}`}>
                        <Truck className={`h-5 w-5 ${entry.type === 'ENTRY' ? 'text-blue-600' : 'text-rose-600'}`} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-bold text-slate-900 text-lg">{entry.plates}</span>
                          <Badge variant="outline" className={`text-xs ${entry.type === 'ENTRY' ? 'border-blue-300 text-blue-700' : 'border-rose-300 text-rose-700'}`}>
                            {entry.type === 'ENTRY' ? '↓ ENTRADA' : '↑ SALIDA'}
                          </Badge>
                          {getStatusBadge(entry.status)}
                        </div>
                        <p className="text-sm text-slate-500 mt-1">
                          <span className="font-medium text-slate-700">{entry.driver}</span> · {entry.company}
                        </p>
                        <p className="text-xs text-slate-400 mt-0.5">Ref: {entry.orderId} · {entry.time}</p>
                      </div>
                    </div>

                    <div className="flex gap-2 self-end sm:self-center">
                      {entry.status === 'PENDING' && (
                        <Button size="sm" className="bg-amber-500 hover:bg-amber-600 text-white">Inspeccionar</Button>
                      )}
                      {entry.status === 'IN_INSPECTION' && (
                        <>
                          <Button size="sm" variant="outline" className="border-rose-300 text-rose-600 hover:bg-rose-50">Rechazar</Button>
                          <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white">Autorizar</Button>
                        </>
                      )}
                      {entry.status === 'APPROVED' && (
                        <Button size="sm" variant="outline" className="text-slate-500">Ver Registro</Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Scanner Side Panel */}
          <div className="space-y-4">
            <h3 className="font-bold text-slate-900 text-lg">Acceso Rápido por Placa</h3>
            <Card className="border-slate-900 shadow-lg bg-slate-900 text-white overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-base">
                  <ScanLine className="h-5 w-5 text-blue-400" />
                  Verificar Placa / RFID
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-0">
                <Input
                  placeholder="Ej: MX-994-AB"
                  value={scanValue}
                  onChange={(e) => setScanValue(e.target.value)}
                  className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus-visible:ring-blue-500 h-12 text-lg font-mono"
                />
                <Button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold h-12">
                  Verificar en Sistema
                </Button>
                <p className="text-slate-400 text-xs text-center">Conectado a TOS · Socket activo</p>
              </CardContent>
            </Card>

            <Card className="border-slate-200 shadow-sm bg-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Últimos Autorizados</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 pt-0">
                {['TZ-212-WW', 'CV-880-MM', 'NL-451-CC'].map((plate, i) => (
                  <div key={plate} className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                      <span className="font-mono font-medium text-slate-700">{plate}</span>
                    </div>
                    <span className="text-xs text-slate-400">{`0${i + 1}:${i * 14 + 5}0 AM`}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </div>
  );
}
