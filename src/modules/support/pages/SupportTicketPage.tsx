import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Send, AlertCircle, Clock, CheckCircle2, User, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const mockTicketDetail = {
  id: 'TKT-001',
  subject: 'Comprobante de pago rechazado sin justificación',
  orderId: 'ORD-2026-001',
  priority: 'HIGH',
  status: 'OPEN',
  createdAt: '14 May 2026 - 09:12 AM',
  messages: [
    {
      id: 1,
      author: 'Carlos Ramos',
      role: 'client',
      text: 'Buenos días, subí mi comprobante de transferencia el día de ayer y aparece como rechazado. No he recibido ninguna notificación explicando el motivo. ¿Pueden revisar el caso? La referencia de mi depósito es 20260513-4421.',
      time: '14 May - 09:12 AM',
    },
    {
      id: 2,
      author: 'Soporte Marketplace',
      role: 'support',
      text: 'Hola Carlos, gracias por comunicarte. Hemos revisado tu caso y el comprobante fue rechazado de forma automática porque el número de referencia no coincidía con el folio de la orden. Por favor sube nuevamente el comprobante asegurándote de que el monto sea exactamente $1,500.00 USD. Estamos para ayudarte.',
      time: '14 May - 11:45 AM',
    },
    {
      id: 3,
      author: 'Carlos Ramos',
      role: 'client',
      text: 'Entendido, acabo de subir el comprobante correcto. Quedo en espera de confirmación.',
      time: '14 May - 12:03 PM',
    },
  ],
};

export function SupportTicketPage() {
  const { id } = useParams();
  const [reply, setReply] = useState('');

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'OPEN': return <AlertCircle className="h-4 w-4 text-rose-500" />;
      case 'IN_PROGRESS': return <Clock className="h-4 w-4 text-amber-500" />;
      case 'RESOLVED': return <CheckCircle2 className="h-4 w-4 text-emerald-500" />;
      default: return null;
    }
  };

  return (
    <div className="bg-slate-50 min-h-[calc(100vh-64px)] p-6 md:p-10">
      <div className="max-w-4xl mx-auto space-y-6">

        <Link
          to="/support"
          className="flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors w-fit"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Volver a Soporte
        </Link>

        {/* Header */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col md:flex-row justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-mono text-sm font-bold text-slate-400">{id}</span>
              <Badge className="bg-rose-100 text-rose-800 border-0">Alta Prioridad</Badge>
              <Badge className="bg-slate-100 text-slate-700 border-0 flex items-center gap-1">
                {getStatusIcon('OPEN')} Abierto
              </Badge>
            </div>
            <h1 className="text-xl font-extrabold text-slate-900">{mockTicketDetail.subject}</h1>
            <p className="text-sm text-slate-500">
              Ref: <span className="font-medium text-slate-700">{mockTicketDetail.orderId}</span>
              &nbsp;·&nbsp; Creado el {mockTicketDetail.createdAt}
            </p>
          </div>
          <div className="flex gap-2 self-start">
            <Button variant="outline" className="border-emerald-300 text-emerald-700 hover:bg-emerald-50">
              Marcar Resuelto
            </Button>
          </div>
        </div>

        {/* Messages Thread */}
        <div className="space-y-4">
          {mockTicketDetail.messages.map((msg) => {
            const isSupport = msg.role === 'support';
            return (
              <div key={msg.id} className={`flex gap-4 ${isSupport ? 'flex-row-reverse' : ''}`}>
                <Avatar className="h-9 w-9 shrink-0">
                  <AvatarFallback className={`text-xs font-bold ${isSupport ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-700'}`}>
                    {isSupport ? <Shield className="h-4 w-4" /> : <User className="h-4 w-4" />}
                  </AvatarFallback>
                </Avatar>
                <div className={`flex-1 max-w-2xl ${isSupport ? 'items-end' : 'items-start'} flex flex-col`}>
                  <div className={`flex items-center gap-2 mb-1 ${isSupport ? 'flex-row-reverse' : ''}`}>
                    <span className="text-sm font-semibold text-slate-900">{msg.author}</span>
                    <span className="text-xs text-slate-400">{msg.time}</span>
                  </div>
                  <div className={`rounded-2xl px-5 py-4 text-sm leading-relaxed ${
                    isSupport
                      ? 'bg-blue-600 text-white rounded-tr-sm shadow-md shadow-blue-500/20'
                      : 'bg-white border border-slate-200 text-slate-700 rounded-tl-sm shadow-sm'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Reply Box */}
        <Card className="border-blue-200 shadow-lg shadow-blue-500/10">
          <CardHeader className="pb-3">
            <CardTitle className="text-base text-slate-900">Responder al Ticket</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Textarea
              placeholder="Escribe tu respuesta aquí..."
              className="min-h-[100px] resize-none focus:ring-blue-500/20"
              value={reply}
              onChange={(e) => setReply(e.target.value)}
            />
            <div className="flex justify-end">
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white gap-2"
                disabled={!reply.trim()}
              >
                <Send className="h-4 w-4" /> Enviar Respuesta
              </Button>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
