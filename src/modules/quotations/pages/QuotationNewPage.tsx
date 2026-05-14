import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { PackageSearch, ArrowLeft, Loader2, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const quotationSchema = z.object({
  cargoType: z.string().min(2, { message: 'Especifica el tipo de carga' }),
  weight: z.string().min(1, { message: 'El peso es requerido' }),
  volume: z.string().min(1, { message: 'El volumen es requerido' }),
  expectedDate: z.string().min(1, { message: 'Selecciona una fecha estimada' }),
  comments: z.string().optional(),
});

type TQuotationForm = z.infer<typeof quotationSchema>;

export function QuotationNewPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const storeId = searchParams.get('store');
  const serviceId = searchParams.get('service');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TQuotationForm>({
    resolver: zodResolver(quotationSchema),
  });

  const onSubmit = (data: TQuotationForm) => {
    setIsSubmitting(true);
    // Simulating API call
    setTimeout(() => {
      console.log('Quotation requested:', { storeId, serviceId, ...data });
      setIsSubmitting(false);
      navigate('/quotations?success=true');
    }, 1500);
  };

  return (
    <div className="bg-slate-50 min-h-[calc(100vh-64px)] p-6 md:p-10">
      <div className="max-w-3xl mx-auto space-y-6">
        
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Volver al operador
        </button>

        <div className="flex items-center gap-4 mb-8">
          <div className="bg-blue-600 p-3 rounded-xl shadow-lg shadow-blue-500/30">
            <PackageSearch className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Solicitar Cotización</h1>
            <p className="text-slate-500 mt-1">Completa los detalles de tu carga para que el operador te envíe una propuesta formal.</p>
          </div>
        </div>

        <Card className="border-slate-200 shadow-xl shadow-slate-200/40 bg-white/80 backdrop-blur-xl">
          <CardHeader className="bg-slate-50/50 border-b border-slate-100 rounded-t-xl">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Info className="h-5 w-5 text-blue-500" /> Información del Requerimiento
            </CardTitle>
            <CardDescription>
              Asegúrate de proporcionar pesos y volúmenes precisos para evitar recargos operativos posteriores.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="cargoType">Tipo de Mercancía</Label>
                  <Input
                    id="cargoType"
                    placeholder="Ej. Electrónicos, Perecederos..."
                    className={errors.cargoType ? 'border-red-500' : ''}
                    {...register('cargoType')}
                  />
                  {errors.cargoType && <p className="text-xs text-red-500">{errors.cargoType.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="expectedDate">Fecha Estimada de Operación</Label>
                  <Input
                    id="expectedDate"
                    type="date"
                    className={errors.expectedDate ? 'border-red-500' : ''}
                    {...register('expectedDate')}
                  />
                  {errors.expectedDate && <p className="text-xs text-red-500">{errors.expectedDate.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="weight">Peso Total Estimado (KGs)</Label>
                  <Input
                    id="weight"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    className={errors.weight ? 'border-red-500' : ''}
                    {...register('weight')}
                  />
                  {errors.weight && <p className="text-xs text-red-500">{errors.weight.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="volume">Volumen Total (CBM)</Label>
                  <Input
                    id="volume"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    className={errors.volume ? 'border-red-500' : ''}
                    {...register('volume')}
                  />
                  {errors.volume && <p className="text-xs text-red-500">{errors.volume.message}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="comments">Comentarios Adicionales (Opcional)</Label>
                <Textarea
                  id="comments"
                  placeholder="Instrucciones especiales, temperatura requerida, peligrosidad..."
                  className="min-h-[100px] resize-none"
                  {...register('comments')}
                />
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <Button 
                  type="submit" 
                  className="bg-blue-600 hover:bg-blue-700 text-white shadow-md active:scale-95 transition-all w-full md:w-auto px-8"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Procesando...
                    </>
                  ) : (
                    'Enviar Solicitud de Cotización'
                  )}
                </Button>
              </div>

            </form>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
