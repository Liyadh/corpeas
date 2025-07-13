import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import type { Vendor } from '@/lib/types';
import { Star } from 'lucide-react';

export function VendorCard({ vendor }: { vendor: Vendor }) {
  return (
    <Card className="transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <CardHeader className="flex flex-row items-center gap-4">
        <Image
          src={vendor.imageUrl}
          alt={vendor.name}
          width={64}
          height={64}
          className="rounded-full aspect-square object-cover"
          data-ai-hint={vendor.aiHint}
        />
        <div>
          <CardTitle className="text-xl">{vendor.name}</CardTitle>
          <p className="text-sm text-muted-foreground">{vendor.specialty}</p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-1 text-amber-500">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`h-5 w-5 ${i < Math.floor(vendor.rating) ? 'fill-current' : ''}`} />
          ))}
          <span className="ml-2 text-foreground font-semibold">{vendor.rating.toFixed(1)}</span>
        </div>
      </CardContent>
    </Card>
  );
}
