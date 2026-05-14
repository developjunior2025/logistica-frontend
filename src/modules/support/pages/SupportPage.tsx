import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LifeBuoy, Plus, Search, MessageCircle, Clock, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

const mockTickets = [
  {
    id: 'TKT-001',
    subject: 'Comprobante de pago rechazado sin justificación',
    orderId: 'ORD-2026-001',
    priority: 'HIGH',
    status: 'OPEN',
    createdAt: '14 May 2026 - 09:12 AM',
    lastUpdate: 'Hace 2 horas',
    messages: 3,
  },
  {
    id: 'TKT-002',
    subject: 'Mercancía con avería visible al momento de la recepción en WMS',
    orderId: 'ORD-2026-002',
    priority: 'HIGH',
    status: 'IN_PROGRESS',
    createdAt: '13 May 2026 - 03:45 PM',
    lastUpdate: 'Hace 1 día',
    messages: 7,
  },
  {
    id: 'TKT-003',
    subject: 'Consulta sobre la factura de comisiones del período Abril-Mayo',
    orderId: null,
    priority: 'LOW',
    status: 'RESOLVED',
    createdAt: '10 May 2026 - 11:00 AM',
    lastUpdate: 'Hace 4 días',
    messages: 5,
  },
];

export function SupportPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'HIGH':
        return <Badge className="bg-rose-100 text-rose-800 border-rose-200">Alta Prioridad</Badge>;
      case 'MEDIUM':
        return <Badge className="bg-amber-100 text-amber-800 border-amber-200">Media</Badge>;
      case 'LOW':
        return <Badge className="bg-slate-100 text-slate-700 border-slate-200">Baja</Badge>;
      default:
        return null;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'OPEN':
        return <AlertCircle className="h-5 w-5 text-rose-500" />;
      case 'IN_PROGRESS':
        return <Clock className="h-5 w-5 text-amber-500" />;
      case 'RESOLVED':
        return <CheckCircle2 className="h-5 w-5 text-emerald-500" />;
      default:
        return null;
    }
  };

  const getStatusLabel = (status: string) => {
    const map: Record<string, string> = {
      OPEN: 'Abierto',
      IN_PROGRESS: 'En Proceso',
      RESOLVED: 'Resuelto',
    };
    return map[status] || status;
  };

  const filteredTickets = mockTickets.filter(
    (t) =>
      t.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-slate-50 min-h-[calc(100vh-64px)] p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-6">

        <div className="flex flex-col md:flex-row justify-between md:items-end gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
              <LifeBuoy className="h-8 w-8 text-blue-600" /> Soporte y Tickets
            </h1>
            <p className="text-slate-500 mt-1">Gestiona incidencias, reclamos y consultas con el equipo del Marketplace.</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2 self-start md:self-auto">
            <Plus className="h-4 w-4" /> Nuevo Ticket
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Abiertos', count: 1, icon: <AlertCircle className="h-5 w-5 text-rose-500" />, bg: 'bg-rose-50 border-rose-100' },
            { label: 'En Proceso', count: 1, icon: <Clock className="h-5 w-5 text-amber-500" />, bg: 'bg-amber-50 border-amber-100' },
            { label: 'Resueltos', count: 1, icon: <CheckCircle2 className="h-5 w-5 text-emerald-500" />, bg: 'bg-emerald-50 border-emerald-100' },
          ].map((stat) => (
            <Card key={stat.label} className={`border ${stat.bg} shadow-sm`}>
              <CardContent className="p-4 flex items-center gap-3">
                {stat.icon}
                <div>
                  <p className="text-xs text-slate-500 font-medium">{stat.label}</p>
                  <p className="text-2xl font-bold text-slate-900">{stat.count}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Buscar por folio o asunto..."
            className="pl-9 bg-white h-11"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Ticket List */}
        <div className="space-y-4">
          {filteredTickets.map((ticket) => (
            <Link key={ticket.id} to={`/support/tickets/${ticket.id}`}>
              <Card className={`border shadow-sm hover:shadow-lg transition-all cursor-pointer group ${
                ticket.status === 'RESOLVED' ? 'border-slate-200 bg-white opacity-70 hover:opacity-100' : 'border-slate-200 bg-white'
              }`}>
                <CardContent className="p-5">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="mt-0.5">{getStatusIcon(ticket.status)}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className="text-xs font-mono font-bold text-slate-400">{ticket.id}</span>
                          {getPriorityBadge(ticket.priority)}
                          <Badge variant="outline" className="text-xs">{getStatusLabel(ticket.status)}</Badge>
                        </div>
                        <h3 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                          {ticket.subject}
                        </h3>
                        <div className="flex flex-wrap gap-4 mt-2 text-xs text-slate-400">
                          {ticket.orderId && (
                            <span>Ref: <span className="font-medium text-slate-600">{ticket.orderId}</span></span>
                          )}
                          <span>Creado: <span className="font-medium text-slate-600">{ticket.createdAt}</span></span>
                          <span>Última actualización: <span className="font-medium text-slate-600">{ticket.lastUpdate}</span></span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full whitespace-nowrap self-center">
                      <MessageCircle className="h-4 w-4" />
                      {ticket.messages} mensajes
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}
