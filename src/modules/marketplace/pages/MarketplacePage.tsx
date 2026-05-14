import { useState } from 'react';
import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import { Search, Filter, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { StoreCard } from '../components/StoreCard';
import type { IStoreMock } from '../components/StoreCard';

// Dummy data for visual representation
const mockStores: IStoreMock[] = [
  {
    id: 1,
    name: 'Logística Portuaria Global',
    description: 'Servicios de almacenamiento general y depósito aduanero con control de temperatura.',
    rating: 4.8,
    reviews: 124,
    category: 'Almacén (WMS)',
    location: 'Puerto de Veracruz',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8ed7c83a7f?q=80&w=800&auto=format&fit=crop',
    verified: true,
    lat: 19.2001,
    lng: -96.1342,
    priceFrom: 150.0,
  },
  {
    id: 2,
    name: 'TransCaribe Freight',
    description: 'Transporte terrestre de carga pesada y sobredimensionada con trazabilidad GPS en tiempo real.',
    rating: 4.5,
    reviews: 89,
    category: 'Transporte',
    location: 'Puerto de Manzanillo',
    image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=800&auto=format&fit=crop',
    verified: true,
    lat: 19.0531,
    lng: -104.3161,
    priceFrom: 500.0,
  },
  {
    id: 3,
    name: 'Terminal Pacífico Este',
    description: 'Patio de contenedores con capacidad para 5000 TEUs y servicio de consolidación.',
    rating: 4.9,
    reviews: 210,
    category: 'Terminal (TOS)',
    location: 'Puerto de Lázaro Cárdenas',
    image: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?q=80&w=800&auto=format&fit=crop',
    verified: false,
    lat: 17.9254,
    lng: -102.1969,
    priceFrom: 220.0,
  },
  {
    id: 4,
    name: 'Agencia Aduanal R&M',
    description: 'Despacho aduanero, asesoría en comercio exterior y gestión de pedimentos rápidos.',
    rating: 4.6,
    reviews: 45,
    category: 'Agencia Aduanal',
    location: 'Puerto de Altamira',
    image: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=800&auto=format&fit=crop',
    verified: true,
    lat: 22.3922,
    lng: -97.9048,
    priceFrom: 350.0,
  },
];

const categories = ['Todos', 'Almacén (WMS)', 'Transporte', 'Terminal (TOS)', 'Agencia Aduanal', 'Servicios Especiales'];

export function MarketplacePage() {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [hoveredStore, setHoveredStore] = useState<number | null>(null);

  const filteredStores = mockStores.filter(
    (s) => activeCategory === 'Todos' || s.category === activeCategory
  );

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] overflow-hidden bg-slate-50">
      
      {/* Dynamic Search & Filter Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 shadow-sm z-10 shrink-0">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:max-w-md shadow-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <Input 
              placeholder="¿Qué servicio logístico buscas?" 
              className="pl-10 h-12 rounded-full border-slate-300 bg-slate-100 hover:bg-slate-50 focus:bg-white transition-colors"
            />
          </div>
          
          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
            {categories.map(cat => (
              <Badge 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`cursor-pointer px-4 py-2 text-sm whitespace-nowrap rounded-full transition-all ${
                  activeCategory === cat 
                  ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-500/20' 
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat}
              </Badge>
            ))}
            <Separator orientation="vertical" className="h-8 mx-2 hidden md:block" />
            <Button variant="outline" className="rounded-full gap-2 border-slate-300">
              <Filter className="h-4 w-4" /> Filtros
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content: Split View (Yelp/Airbnb Style) */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* Left Side: Store List */}
        <div className="w-full lg:w-[55%] xl:w-[50%] h-full overflow-y-auto p-4 md:p-6 pb-24">
          <div className="mb-6 flex justify-between items-end">
            <div>
              <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                {filteredStores.length} operadores encontrados
              </h1>
              <p className="text-slate-500 mt-1">Explora las mejores opciones para tu logística</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 xl:grid-cols-1 gap-6">
            {filteredStores.map((store) => (
              <StoreCard 
                key={store.id} 
                store={store} 
                onHover={setHoveredStore} 
              />
            ))}
          </div>
        </div>

        {/* Right Side: Interactive Map */}
        <div className="hidden lg:block lg:w-[45%] xl:w-[50%] h-full bg-slate-200 border-l border-slate-200 relative">
          <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'dummy_key_for_dev'}>
            <Map
              defaultZoom={5}
              defaultCenter={{ lat: 21.0, lng: -100.0 }}
              mapId="marketplace_map_id"
              disableDefaultUI={true}
              className="w-full h-full"
            >
              {filteredStores.map((store) => {
                const isHovered = hoveredStore === store.id;
                return (
                  <AdvancedMarker 
                    key={store.id} 
                    position={{ lat: store.lat, lng: store.lng }}
                    zIndex={isHovered ? 100 : 1}
                  >
                    <div className={`
                      transition-all duration-300 
                      ${isHovered ? 'scale-125 -translate-y-2' : 'scale-100'}
                    `}>
                      <Pin 
                        background={isHovered ? '#2563eb' : '#ffffff'} 
                        borderColor={isHovered ? '#1d4ed8' : '#cbd5e1'} 
                        glyphColor={isHovered ? '#ffffff' : '#334155'} 
                      >
                        {!isHovered && <MapPin className="h-4 w-4 text-slate-600" />}
                      </Pin>
                      {isHovered && (
                        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 bg-slate-900 text-white text-xs font-bold px-2 py-1 rounded shadow-lg whitespace-nowrap z-50">
                          ${store.priceFrom}
                        </div>
                      )}
                    </div>
                  </AdvancedMarker>
                );
              })}
            </Map>
          </APIProvider>
          
          {/* Decorative Map Gradient Overlay to blend edges */}
          <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-slate-200/50 to-transparent pointer-events-none"></div>
        </div>
        
      </div>
    </div>
  );
}
