import { Star, MapPin, ShieldCheck, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

export interface IStoreMock {
  id: number;
  name: string;
  description: string;
  rating: number;
  reviews: number;
  category: string;
  location: string;
  image: string;
  verified: boolean;
  lat: number;
  lng: number;
  priceFrom: number;
}

interface StoreCardProps {
  store: IStoreMock;
  onHover?: (id: number | null) => void;
}

export function StoreCard({ store, onHover }: StoreCardProps) {
  return (
    <Card 
      className="overflow-hidden group hover:shadow-xl hover:border-blue-200 transition-all duration-300 bg-white"
      onMouseEnter={() => onHover?.(store.id)}
      onMouseLeave={() => onHover?.(null)}
    >
      <div className="flex flex-col sm:flex-row h-full">
        {/* Image Section */}
        <div className="relative sm:w-2/5 h-48 sm:h-auto overflow-hidden">
          <img 
            src={store.image} 
            alt={store.name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 left-3 flex gap-2">
            <Badge className="bg-white/90 text-slate-900 hover:bg-white border-0 shadow-sm backdrop-blur-sm font-semibold">
              {store.category}
            </Badge>
          </div>
        </div>

        {/* Content Section */}
        <CardContent className="flex-1 p-5 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1 flex items-center gap-2">
                  {store.name}
                  {store.verified && <ShieldCheck className="h-4 w-4 text-blue-500" />}
                </h3>
                <div className="flex items-center text-slate-500 text-sm mt-1 gap-1">
                  <MapPin className="h-4 w-4" />
                  <span className="truncate">{store.location}</span>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <div className="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded-md">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  <span className="font-bold text-sm text-slate-700">{store.rating}</span>
                </div>
                <span className="text-xs text-slate-400 mt-1">({store.reviews})</span>
              </div>
            </div>

            <p className="text-sm text-slate-600 line-clamp-2">
              {store.description}
            </p>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-500 block">Tarifa desde</span>
              <span className="font-bold text-lg text-slate-900">${store.priceFrom}</span>
            </div>
            <Link 
              to={`/stores/${store.id}`} 
              className="flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-full transition-colors"
            >
              Ver perfil <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
