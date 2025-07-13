import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, Search, Zap, Truck, Users, CreditCard } from 'lucide-react';
import { Logo } from '@/components/icons';

const features = [
  {
    icon: <Package className="h-8 w-8 text-primary" />,
    title: 'Curated Product Showcase',
    description: 'Browse high-quality products from top vendors with stunning visuals.',
  },
  {
    icon: <Search className="h-8 w-8 text-primary" />,
    title: 'Smart Search',
    description: 'Quickly find what you need with powerful search and filtering options.',
  },
  {
    icon: <Zap className="h-8 w-8 text-primary" />,
    title: 'AI-Powered Suggestions',
    description: 'Get smart recommendations for products and ordering schedules.',
  },
  {
    icon: <Truck className="h-8 w-8 text-primary" />,
    title: 'Real-Time Tracking',
    description: 'Stay updated with live tracking of your orders from dispatch to delivery.',
  },
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    title: 'Verified Vendors',
    description: 'Connect with trusted vendors and explore their specialties and ratings.',
  },
  {
    icon: <CreditCard className="h-8 w-8 text-primary" />,
    title: 'Secure Payments',
    description: 'Experience a smooth and secure checkout process with multiple payment options.',
  },
];

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Logo className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold">Corpeas</span>
        </Link>
        <nav className="flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link href="/dashboard">Log In</Link>
          </Button>
          <Button asChild>
            <Link href="/dashboard">Get Started</Link>
          </Button>
        </nav>
      </header>
      <main className="flex-1">
        <section className="relative py-24 md:py-32 lg:py-40">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-10"
            style={{ backgroundImage: 'url(https://placehold.co/1920x1080.png)' }}
            data-ai-hint="warehouse food"
          ></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter fade-in-up">
              The Future of B2B Supply is Here
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground fade-in-up [animation-delay:0.2s]">
              Corpeas connects you with the best vendors, streamlines your ordering process, and optimizes your inventory with AI-powered insights.
            </p>
            <div className="mt-8 fade-in-up [animation-delay:0.4s]">
              <Button size="lg" asChild>
                <Link href="/dashboard">Explore the Marketplace</Link>
              </Button>
            </div>
          </div>
        </section>

        <section id="features" className="py-16 md:py-24 bg-background/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight">Why Choose Corpeas?</h2>
              <p className="mt-2 text-lg text-muted-foreground">Everything you need to manage your supply chain efficiently.</p>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, i) => (
                <Card key={feature.title} className="text-center transition-all duration-300 ease-in-out hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2 fade-in-up" style={{animationDelay: `${i * 0.1}s`}}>
                  <CardHeader className="items-center">{feature.icon}</CardHeader>
                  <CardContent>
                    <h3 className="text-xl font-semibold">{feature.title}</h3>
                    <p className="mt-2 text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="py-6 bg-card border-t">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Corpeas. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
