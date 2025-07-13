import { vendors } from '@/lib/data';
import { VendorCard } from '@/components/vendor-card';

export default function VendorsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Our Trusted Vendors</h1>
        <p className="text-muted-foreground">Partnering with the best to bring you quality products.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vendors.map((vendor) => (
          <VendorCard key={vendor.id} vendor={vendor} />
        ))}
      </div>
    </div>
  );
}
