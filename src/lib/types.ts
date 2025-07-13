export type Product = {
  id: string;
  name: string;
  vendor: string;
  price: number;
  category: 'Produce' | 'Dairy' | 'Bakery' | 'Meat' | 'Pantry';
  imageUrl: string;
  dietary: ('Vegan' | 'Gluten-Free' | 'Organic')[];
  aiHint: string;
};

export type Vendor = {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  imageUrl: string;
  aiHint: string;
};

export type Order = {
  id: string;
  date: string;
  total: number;
  status: 'Delivered' | 'Shipped' | 'Processing';
};
