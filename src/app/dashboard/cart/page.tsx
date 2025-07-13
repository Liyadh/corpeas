import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';

export default function CartPage() {
  return (
    <div className="flex flex-col gap-6 items-center">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Your Shopping Cart</CardTitle>
          <CardDescription>Review items in your cart before proceeding to checkout.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-center flex-col gap-4 text-center text-muted-foreground h-48">
            <ShoppingCart className="h-12 w-12" />
            <p>Your cart is currently empty.</p>
            <Button asChild>
                <Link href="/dashboard">Continue Shopping</Link>
            </Button>
          </div>
          <Separator />
           <div className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>$0.00</span>
            </div>
            <div className="flex justify-between">
              <span>Taxes</span>
              <span>$0.00</span>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>$0.00</span>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" disabled>
            Proceed to Checkout
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
