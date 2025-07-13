'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { suggestProducts, type SuggestProductsOutput } from '@/ai/flows/suggest-products';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { SuggestionsDisplay } from './suggestions-display';
import { Loader2 } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';

const FormSchema = z.object({
  pastPurchases: z.string().min(10, { message: 'Please provide more detail about past purchases.' }),
  inventoryLevels: z.string().min(10, { message: 'Please provide more detail about inventory levels.' }),
  preferences: z.string().optional(),
});

export function SuggestionsForm() {
  const [suggestions, setSuggestions] = useState<SuggestProductsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pastPurchases: '',
      inventoryLevels: '',
      preferences: '',
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    setSuggestions(null);
    try {
      const result = await suggestProducts(data);
      setSuggestions(result);
    } catch (error) {
      console.error('AI Suggestion Error:', error);
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description: 'Failed to generate suggestions. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Generate Smart Suggestions</CardTitle>
          <CardDescription>
            Fill in the details below, and our AI will provide tailored recommendations to optimize your inventory and ordering process.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="pastPurchases"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Past Purchases</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="e.g., 2 cases of avocados (last week), 10 loaves of sourdough (2 days ago)..."
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="inventoryLevels"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Inventory</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="e.g., Low on tomatoes, have 5 gallons of milk left, plenty of olive oil..."
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="preferences"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preferences (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., Prefer organic produce, looking for gluten-free alternatives..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Generate Suggestions
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {isLoading && (
         <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
            <Card>
                <CardHeader><Skeleton className="h-5 w-32" /></CardHeader>
                <CardContent className="space-y-2"><Skeleton className="h-4 w-full" /><Skeleton className="h-4 w-5/6" /></CardContent>
            </Card>
            <Card>
                <CardHeader><Skeleton className="h-5 w-40" /></CardHeader>
                <CardContent className="space-y-2"><Skeleton className="h-4 w-full" /><Skeleton className="h-4 w-4/6" /></CardContent>
            </Card>
            <Card>
                <CardHeader><Skeleton className="h-5 w-28" /></CardHeader>
                <CardContent className="space-y-2"><Skeleton className="h-4 w-full" /><Skeleton className="h-4 w-2/3" /></CardContent>
            </Card>
         </div>
      )}
      
      {suggestions && <SuggestionsDisplay suggestions={suggestions} />}
    </div>
  );
}
