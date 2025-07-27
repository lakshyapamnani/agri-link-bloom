import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Shield, Truck, Star, ArrowRight, Users, Zap } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

interface LandingPageProps {
  onUserTypeSelect: (type: 'farmer' | 'consumer') => void;
}

const LandingPage = ({ onUserTypeSelect }: LandingPageProps) => {
  return (
    <div className="min-h-screen bg-gradient-fresh">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-4">
                <Badge className="badge-organic animate-bounce-subtle">
                  🚀 10-Minute Delivery Available
                </Badge>
                <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
                  Fresh from 
                  <span className="bg-gradient-organic bg-clip-text text-transparent"> Farm </span>
                  to Your Table
                </h1>
                <p className="text-xl text-muted-foreground max-w-lg">
                  Connect directly with local farmers for the freshest produce. 
                  No middlemen, just pure farm-fresh quality delivered fast.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  className="btn-hero text-lg px-8 py-4 animate-glow"
                  onClick={() => onUserTypeSelect('consumer')}
                >
                  Start Shopping
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  variant="outline" 
                  className="text-lg px-8 py-4 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  onClick={() => onUserTypeSelect('farmer')}
                >
                  Join as Farmer
                </Button>
              </div>

              <div className="flex items-center space-x-8 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Star className="h-4 w-4 text-accent fill-current" />
                  <span>4.9/5 Rating</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-primary" />
                  <span>500+ Farmers</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Zap className="h-4 w-4 text-warning" />
                  <span>Fast Delivery</span>
                </div>
              </div>
            </div>

            <div className="relative animate-slide-up">
              <div className="relative rounded-2xl overflow-hidden shadow-[var(--shadow-glow)]">
                <img 
                  src={heroImage} 
                  alt="Fresh farm produce" 
                  className="w-full h-auto hover-lift"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose Agri-Link?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience the future of fresh food delivery with our innovative platform
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="product-card group">
              <CardContent className="p-8 text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                  <Clock className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Lightning Fast</h3>
                <p className="text-muted-foreground">
                  Get fresh produce delivered in as little as 10 minutes with our express delivery network
                </p>
              </CardContent>
            </Card>

            <Card className="product-card group">
              <CardContent className="p-8 text-center">
                <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-accent/20 transition-colors duration-300">
                  <Shield className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Quality Guaranteed</h3>
                <p className="text-muted-foreground">
                  Every product is quality-checked and comes with our freshness guarantee
                </p>
              </CardContent>
            </Card>

            <Card className="product-card group">
              <CardContent className="p-8 text-center">
                <div className="bg-success/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-success/20 transition-colors duration-300">
                  <Truck className="h-8 w-8 text-success" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Direct from Farm</h3>
                <p className="text-muted-foreground">
                  Skip the middleman and get produce directly from local farmers at the best prices
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-organic text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to Experience Fresh?
            </h2>
            <p className="text-xl opacity-90">
              Join thousands of satisfied customers and farmers who trust Agri-Link for fresh, quality produce
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="secondary"
                className="text-lg px-8 py-4 bg-white text-foreground hover:bg-white/90"
                onClick={() => onUserTypeSelect('consumer')}
              >
                Shop Now
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-foreground"
                onClick={() => onUserTypeSelect('farmer')}
              >
                Become a Farmer
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;