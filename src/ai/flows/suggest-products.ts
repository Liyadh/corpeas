'use server';

/**
 * @fileOverview An AI agent that suggests products, substitutions, and ordering schedules.
 *
 * - suggestProducts - A function that suggests products based on past purchases and inventory levels.
 * - SuggestProductsInput - The input type for the suggestProducts function.
 * - SuggestProductsOutput - The return type for the suggestProducts function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestProductsInputSchema = z.object({
  pastPurchases: z.string().describe('A list of past purchases, including product names and quantities.'),
  inventoryLevels: z.string().describe('A description of current inventory levels for relevant products.'),
  preferences: z.string().optional().describe('The description of the vendor.'),
});
export type SuggestProductsInput = z.infer<typeof SuggestProductsInputSchema>;

const SuggestProductsOutputSchema = z.object({
  suggestedProducts: z.string().describe('A list of suggested products to order.'),
  suggestedSubstitutions: z.string().describe('A list of suggested product substitutions.'),
  orderingSchedule: z.string().describe('A suggested ordering schedule to optimize inventory.'),
});
export type SuggestProductsOutput = z.infer<typeof SuggestProductsOutputSchema>;

export async function suggestProducts(input: SuggestProductsInput): Promise<SuggestProductsOutput> {
  return suggestProductsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestProductsPrompt',
  input: {schema: SuggestProductsInputSchema},
  output: {schema: SuggestProductsOutputSchema},
  prompt: `You are an AI assistant that suggests products, substitutions, and ordering schedules for a buyer, in order to optimize their orders and reduce waste.

  Consider the buyer's past purchases, current inventory levels, and stated preferences.

  Past Purchases: {{{pastPurchases}}}
  Inventory Levels: {{{inventoryLevels}}}
  Preferences: {{{preferences}}}

  Suggest products that the buyer should order, considering their needs and potential waste.
  Suggest possible substitutions for products that may be out of stock or difficult to obtain.
  Provide an ordering schedule to optimize inventory levels and reduce waste.
  Format the output as a JSON object.
`,
});

const suggestProductsFlow = ai.defineFlow(
  {
    name: 'suggestProductsFlow',
    inputSchema: SuggestProductsInputSchema,
    outputSchema: SuggestProductsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
