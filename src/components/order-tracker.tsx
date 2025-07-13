'use client';

import { cn } from '@/lib/utils';
import type { Order } from '@/lib/types';
import { CheckCircle2, Loader, Truck, Home } from 'lucide-react';

const steps = [
  { status: 'Processing', icon: Loader },
  { status: 'Shipped', icon: Truck },
  { status: 'Delivered', icon: Home },
];

export function OrderTracker({ order }: { order: Order }) {
  const currentStepIndex = steps.findIndex((step) => step.status === order.status);

  return (
    <div className="w-full py-4">
      <div className="flex justify-between items-center relative">
        <div className="absolute left-0 top-1/2 h-0.5 w-full bg-border -translate-y-1/2"></div>
        <div
          className="absolute left-0 top-1/2 h-0.5 bg-primary -translate-y-1/2 transition-all duration-500"
          style={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
        ></div>
        {steps.map((step, index) => {
          const isActive = index <= currentStepIndex;
          const isCurrent = index === currentStepIndex;
          return (
            <div key={step.status} className="z-10 flex flex-col items-center gap-2">
              <div
                className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300',
                  isActive ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                )}
              >
                {order.status === 'Delivered' && isActive ? (
                  <CheckCircle2 className="w-6 h-6" />
                ) : (
                  <step.icon className={cn('w-6 h-6', isCurrent && step.status === 'Processing' && 'animate-spin')} />
                )}
              </div>
              <p className={cn('text-sm font-medium', isActive ? 'text-foreground' : 'text-muted-foreground')}>
                {step.status}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
