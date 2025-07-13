import Image from 'next/image';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import type { Product } from '@/lib/types';
import { PlusCircle } from 'lucide-react';
import { Badge } from './ui/badge';

export function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <CardHeader className="p-0 relative">
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={400}
          height={300}
          className="aspect-[4/3] w-full object-cover"
          data-ai-hint={product.aiHint}
        />
        <div className="absolute top-2 right-2 flex gap-1">
          {product.dietary.map((tag) => (
            <Badge key={tag} variant="secondary" className="bg-background/80 backdrop-blur-sm">
              {tag}
            </Badge>
          ))}
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-sm text-muted-foreground">{product.vendor}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center p-4 pt-0">
        <p className="text-xl font-bold">${product.price.toFixed(2)}</p>
        <Button size="sm">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add
        </Button>
      </CardFooter>
    </Card>
  );
}
