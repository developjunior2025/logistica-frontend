import { Package, Clock, DollarSign, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export interface IServiceMock {
  id: number;
  name: string;
  description: string;
  price: number;
  unit: string;
  estimatedTime: string;
  isPopular?: boolean;
}

interface ServiceCardProps {
  service: IServiceMock;
  onQuote: (serviceId: number) => void;
}

export function ServiceCard({ service, onQuote }: ServiceCardProps) {
  return (
    <Card className="relative overflow-hidden group hover:border-blue-300 hover:shadow-lg transition-all duration-300">
      {service.isPopular && (
        <div className="absolute top-0 right-0 bg-amber-400 text-amber-950 text-xs font-bold px-3 py-1 rounded-bl-lg z-10">
          Más solicitado
        </div>
      )}
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-50 p-3 rounded-xl group-hover:bg-blue-100 transition-colors">
              <Package className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                {service.name}
              </h4>
              <p className="text-slate-500 text-sm line-clamp-2 mt-1 max-w-sm">
                {service.description}
              </p>
            </div>
          </div>
          
          <div className="text-right">
            <div className="flex items-center justify-end gap-1 text-slate-900 font-bold text-xl">
              <DollarSign className="h-5 w-5 text-slate-400" />
              {service.price}
            </div>
            <p className="text-xs text-slate-500">por {service.unit}</p>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
          <div className="flex items-center text-sm text-slate-500 gap-2">
            <Clock className="h-4 w-4" />
            Tiempo est.: {service.estimatedTime}
          </div>
          <Button 
            onClick={() => onQuote(service.id)}
            className="rounded-full bg-slate-900 hover:bg-blue-600 text-white transition-all shadow-md active:scale-95 gap-2"
          >
            Solicitar Cotización <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
