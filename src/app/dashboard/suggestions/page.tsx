import { SuggestionsForm } from '@/components/suggestions/suggestions-form';

export default function SuggestionsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">AI-Powered Suggestions</h1>
        <p className="text-muted-foreground">
          Let our smart assistant help you optimize your orders and reduce waste.
        </p>
      </div>
      <SuggestionsForm />
    </div>
  );
}
