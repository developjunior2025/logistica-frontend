import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Star, ShieldCheck, FileText, Anchor } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ServiceCard } from '../components/ServiceCard';
import type { IServiceMock } from '../components/ServiceCard';

// Dummy data
const mockStoreInfo = {
  id: 1,
  name: 'Logística Portuaria Global',
  description: 'Somos el operador logístico líder en el Golfo de México. Especializados en almacenamiento refrigerado, gestión de contenedores y despacho aduanero integral. Contamos con certificaciones OEA e ISO 9001, garantizando la trazabilidad total de tu mercancía desde que toca el puerto hasta su destino final.',
  rating: 4.8,
  reviews: 124,
  category: 'Almacén (WMS)',
  location: 'Puerto de Veracruz',
  coverImage: 'https://images.unsplash.com/photo-1586528116311-ad8ed7c83a7f?q=80&w=2070&auto=format&fit=crop',
  logo: 'https://i.pravatar.cc/150?u=logistica',
  verified: true,
  established: 2010,
};

const mockServices: IServiceMock[] = [
  {
    id: 101,
    name: 'Almacenamiento Refrigerado',
    description: 'Espacio en rack con control de temperatura de -20°C a 4°C. Incluye monitoreo 24/7 y reportes automáticos de WMS.',
    price: 150,
    unit: 'Tarima/Mes',
    estimatedTime: 'Inmediato',
    isPopular: true,
  },
  {
    id: 102,
    name: 'Maniobra de Descarga (Desconsolidación)',
    description: 'Descarga manual o paletizada de contenedor de 20 o 40 pies. Incluye inspección fotográfica (WMS Receipt).',
    price: 320,
    unit: 'Contenedor',
    estimatedTime: '4 horas',
  },
  {
    id: 103,
    name: 'Expedición de Certificado de Depósito',
    description: 'Emisión de título de crédito representativo de la mercancía, válido ante instituciones financieras (AGD).',
    price: 50,
    unit: 'Certificado',
    estimatedTime: '24 horas',
    isPopular: true,
  },
];

export function StoreDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // En producción, aquí haríamos fetch usando React Query con el ID
  
  const handleQuote = (serviceId: number) => {
    // Redirige al wizard de cotización (Sprint posterior)
    navigate(`/quotations/new?store=${id}&service=${serviceId}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      
      {/* Cover Header */}
      <div className="relative h-64 md:h-80 w-full overflow-hidden">
        <img 
          src={mockStoreInfo.coverImage} 
          alt="Cover" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start md:items-end">
          
          <Avatar className="h-32 w-32 border-4 border-white shadow-lg bg-white rounded-2xl">
            <AvatarImage src={mockStoreInfo.logo} className="object-cover rounded-xl" />
            <AvatarFallback className="rounded-xl text-3xl font-bold bg-blue-100 text-blue-700">LP</AvatarFallback>
          </Avatar>

          <div className="flex-1 space-y-2 mb-2">
            <div className="flex flex-wrap items-center gap-3">
              <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 border-0">{mockStoreInfo.category}</Badge>
              {mockStoreInfo.verified && (
                <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border-0 flex items-center gap-1">
                  <ShieldCheck className="h-3 w-3" /> Verificado
                </Badge>
              )}
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              {mockStoreInfo.name}
            </h1>
            <div className="flex flex-wrap items-center text-slate-500 text-sm gap-4">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {mockStoreInfo.location}
              </div>
              <div className="flex items-center gap-1 font-medium text-slate-700">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                {mockStoreInfo.rating} <span className="text-slate-400 font-normal">({mockStoreInfo.reviews} reseñas)</span>
              </div>
              <div className="flex items-center gap-1">
                <Anchor className="h-4 w-4" />
                Desde {mockStoreInfo.established}
              </div>
            </div>
          </div>
        </div>

        {/* Content Tabs */}
        <div className="mt-8">
          <Tabs defaultValue="services" className="w-full">
            <TabsList className="bg-transparent border-b border-slate-200 w-full justify-start rounded-none h-auto p-0 space-x-6">
              <TabsTrigger 
                value="services" 
                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none px-0 py-3 font-medium text-slate-500 data-[state=active]:text-blue-600 transition-colors"
              >
                Servicios Disponibles
              </TabsTrigger>
              <TabsTrigger 
                value="about" 
                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none px-0 py-3 font-medium text-slate-500 data-[state=active]:text-blue-600 transition-colors"
              >
                Sobre Nosotros
              </TabsTrigger>
              <TabsTrigger 
                value="reviews" 
                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none px-0 py-3 font-medium text-slate-500 data-[state=active]:text-blue-600 transition-colors"
              >
                Reseñas
              </TabsTrigger>
            </TabsList>

            <TabsContent value="services" className="mt-8 space-y-6 outline-none">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Catálogo de Servicios</h3>
                  <p className="text-slate-500 mt-1 text-sm">Selecciona el servicio que necesitas para iniciar tu cotización.</p>
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {mockServices.map(service => (
                  <ServiceCard 
                    key={service.id} 
                    service={service} 
                    onQuote={handleQuote} 
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="about" className="mt-8 outline-none">
              <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-600" /> Descripción de la empresa
                </h3>
                <p className="text-slate-600 leading-relaxed text-lg">
                  {mockStoreInfo.description}
                </p>
                
                <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-slate-100">
                  <div>
                    <h4 className="text-sm text-slate-500 font-medium">RFC</h4>
                    <p className="font-semibold text-slate-900 mt-1">LPG100523XYZ</p>
                  </div>
                  <div>
                    <h4 className="text-sm text-slate-500 font-medium">Certificaciones</h4>
                    <p className="font-semibold text-slate-900 mt-1">OEA, ISO 9001</p>
                  </div>
                  <div>
                    <h4 className="text-sm text-slate-500 font-medium">Horario</h4>
                    <p className="font-semibold text-slate-900 mt-1">24/7 (Operación)</p>
                  </div>
                  <div>
                    <h4 className="text-sm text-slate-500 font-medium">Tipo de Recinto</h4>
                    <p className="font-semibold text-slate-900 mt-1">Fiscalizado</p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="mt-8 outline-none">
              <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 border-dashed">
                <Star className="h-12 w-12 text-slate-200 mx-auto mb-3" />
                <h3 className="text-lg font-medium text-slate-900">Reseñas próximamente</h3>
                <p className="text-slate-500 max-w-sm mx-auto mt-2">
                  Las reseñas detalladas de otros usuarios logísticos estarán disponibles en el siguiente sprint.
                </p>
              </div>
            </TabsContent>

          </Tabs>
        </div>
      </div>
    </div>
  );
}
