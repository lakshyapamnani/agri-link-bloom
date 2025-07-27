import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import ProductCard from "./ProductCard";
import AddProductForm from "./AddProductForm";
import { useProductStore } from "@/store/productStore";
import { toast } from "@/components/ui/use-toast";
import { 
  Search, 
  Filter, 
  Plus, 
  BarChart3, 
  ShoppingBag, 
  TrendingUp,
  Users,
  MessageCircle,
  Package
} from "lucide-react";

interface UserDashboardProps {
  userType: 'farmer' | 'consumer';
}

const UserDashboard = ({ userType }: UserDashboardProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const { products, addProduct, addToCart } = useProductStore();

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddProduct = (newProductData: Parameters<typeof addProduct>[0]) => {
    addProduct(newProductData);
  };

  if (userType === 'farmer') {
    return (
      <div className="min-h-screen bg-gradient-fresh p-6">
        <div className="container mx-auto space-y-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 animate-fade-in">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Farmer Dashboard</h1>
              <p className="text-muted-foreground">Manage your products and track your sales</p>
            </div>
            <Button 
              className="btn-hero"
              onClick={() => setIsAddProductOpen(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add New Product
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 animate-slide-up">
            <Card className="product-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Earnings</p>
                    <p className="text-2xl font-bold text-primary">₹12,450</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card className="product-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Active Products</p>
                    <p className="text-2xl font-bold text-accent">{products.length}</p>
                  </div>
                  <Package className="h-8 w-8 text-accent" />
                </div>
              </CardContent>
            </Card>

            <Card className="product-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Orders</p>
                    <p className="text-2xl font-bold text-success">147</p>
                  </div>
                  <ShoppingBag className="h-8 w-8 text-success" />
                </div>
              </CardContent>
            </Card>

            <Card className="product-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Customer Rating</p>
                    <p className="text-2xl font-bold text-warning">4.8</p>
                  </div>
                  <Users className="h-8 w-8 text-warning" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="product-card group">
              <CardContent className="p-6 text-center">
                <BarChart3 className="h-12 w-12 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold mb-2">View Analytics</h3>
                <p className="text-sm text-muted-foreground mb-4">Track your sales and performance</p>
                <Button variant="outline" className="w-full">View Details</Button>
              </CardContent>
            </Card>

            <Card className="product-card group">
              <CardContent className="p-6 text-center">
                <MessageCircle className="h-12 w-12 text-accent mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold mb-2">AI Assistant</h3>
                <p className="text-sm text-muted-foreground mb-4">Get pricing and market insights</p>
                <Button variant="outline" className="w-full">Ask AI</Button>
              </CardContent>
            </Card>

            <Card className="product-card group">
              <CardContent className="p-6 text-center">
                <ShoppingBag className="h-12 w-12 text-success mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold mb-2">Manage Orders</h3>
                <p className="text-sm text-muted-foreground mb-4">View and update order status</p>
                <Button variant="outline" className="w-full">View Orders</Button>
              </CardContent>
            </Card>
          </div>

          {/* Your Products */}
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-foreground">Your Products</h2>
              <div className="flex gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} userType="farmer" />
              ))}
            </div>
          </div>

          {/* Add Product Form */}
          <AddProductForm 
            isOpen={isAddProductOpen}
            onClose={() => setIsAddProductOpen(false)}
            onAddProduct={handleAddProduct}
          />
        </div>
      </div>
    );
  }

  // Consumer Dashboard
  return (
    <div className="min-h-screen bg-gradient-fresh p-6">
      <div className="container mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            Fresh Products from Local Farmers
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover the freshest produce, delivered straight from farm to your doorstep
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center animate-slide-up">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search for fresh produce..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            <Badge className="badge-organic">
              ⚡ Express Delivery Available
            </Badge>
          </div>
        </div>

        {/* Express Delivery Section */}
        <Card className="product-card bg-gradient-organic text-white">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              ⚡ 10-Minute Express Delivery
              <Badge variant="secondary" className="ml-3 text-foreground">
                Limited Time
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 opacity-90">
              Get your fresh produce delivered in just 10 minutes! Available for selected products in your area.
            </p>
            <Button variant="secondary" className="bg-white text-foreground hover:bg-white/90">
              View Express Products
            </Button>
          </CardContent>
        </Card>

        {/* Product Grid */}
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-foreground">
                Fresh Products ({filteredProducts.length})
              </h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Price: Low to High</Button>
              <Button variant="outline" size="sm">Rating</Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                userType="consumer"
                onAddToCart={(product) => {
                  addToCart(product);
                  toast({
                    title: "Added to cart",
                    description: `${product.name} has been added to your cart.`,
                  });
                }}
              />
            ))}
          </div>
        </div>

        {/* Load More */}
        <div className="text-center">
          <Button variant="outline" size="lg">
            Load More Products
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;