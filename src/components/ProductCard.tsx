import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, MapPin, Plus } from "lucide-react";
import type { Product } from "@/store/productStore";

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  userType?: 'farmer' | 'consumer';
}

const ProductCard = ({ product, onAddToCart, userType = 'consumer' }: ProductCardProps) => {
  return (
    <Card className="product-card group overflow-hidden">
      <div className="relative">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isExpressDelivery && (
            <Badge className="bg-warning text-warning-foreground text-xs font-medium">
              <Clock className="h-3 w-3 mr-1" />
              10-Min Delivery
            </Badge>
          )}
          <Badge variant="secondary" className="text-xs">
            <Star className="h-3 w-3 mr-1 fill-current text-accent" />
            {product.rating}
          </Badge>
        </div>

        {/* Stock indicator */}
        <div className="absolute top-3 right-3">
          <Badge 
            variant={product.inStock > 10 ? "default" : product.inStock > 0 ? "secondary" : "destructive"}
            className="text-xs"
          >
            {product.inStock > 0 ? `${product.inStock} left` : 'Out of Stock'}
          </Badge>
        </div>
      </div>

      <CardContent className="p-4 space-y-3">
        <div className="space-y-2">
          <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {product.description}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="h-3 w-3 mr-1" />
              <span>{product.farmer}</span>
            </div>
            <div className="text-xs text-muted-foreground">
              {product.location}
            </div>
          </div>
          <div className="text-right">
            <div className="text-xl font-bold text-primary">
              ₹{product.price}
            </div>
            <div className="text-xs text-muted-foreground">
              per {product.unit}
            </div>
          </div>
        </div>

        {userType === 'consumer' && (
          <Button 
            className="w-full btn-hero"
            onClick={() => onAddToCart?.(product)}
            disabled={product.inStock === 0}
          >
            <Plus className="h-4 w-4 mr-2" />
            {product.inStock > 0 ? 'Add to Cart' : 'Out of Stock'}
          </Button>
        )}

        {userType === 'farmer' && (
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1">
              Edit
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              View Orders
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductCard;