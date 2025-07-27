import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { X, Upload, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { Product } from "@/store/productStore";

interface AddProductFormProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProduct: (product: Omit<Product, 'id' | 'rating'>) => void;
}

const AddProductForm = ({ isOpen, onClose, onAddProduct }: AddProductFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    unit: 'kg',
    description: '',
    farmer: 'Your Farm', // This would come from user profile
    location: 'Your Location',
    isExpressDelivery: false,
    inStock: '',
    image: ''
  });
  const [isGeneratingDescription, setIsGeneratingDescription] = useState(false);

  const handleInputChange = (field: string, value: string | boolean | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateAIDescription = async () => {
    if (!formData.name) {
      toast({
        title: "Product name required",
        description: "Please enter a product name first to generate description.",
        variant: "destructive"
      });
      return;
    }

    setIsGeneratingDescription(true);
    
    // Simulate AI description generation (replace with actual Gemini API call)
    setTimeout(() => {
      const descriptions = {
        'tomato': 'Fresh, juicy tomatoes grown with organic farming methods. Perfect for salads, cooking, and sauces. Rich in vitamins and antioxidants.',
        'carrot': 'Sweet and crunchy carrots, freshly harvested. Excellent source of beta-carotene and fiber. Great for snacking and cooking.',
        'spinach': 'Fresh organic spinach leaves packed with iron and vitamins. Perfect for healthy salads and smoothies.',
        'potato': 'Fresh farm potatoes, perfect for cooking. Rich in carbohydrates and essential nutrients.',
        'onion': 'Fresh onions with strong flavor, essential for cooking. Grown with natural farming methods.',
        'capsicum': 'Crisp and colorful bell peppers, rich in vitamin C. Perfect for stir-fries and salads.'
      };
      
      const productKey = formData.name.toLowerCase();
      const matchedDescription = Object.keys(descriptions).find(key => 
        productKey.includes(key)
      );
      
      const aiDescription = matchedDescription 
        ? descriptions[matchedDescription as keyof typeof descriptions]
        : `Fresh ${formData.name.toLowerCase()} directly from our farm. Grown with care using sustainable farming practices. Perfect for healthy cooking and nutrition.`;
      
      setFormData(prev => ({ ...prev, description: aiDescription }));
      setIsGeneratingDescription(false);
      
      toast({
        title: "Description generated!",
        description: "AI has created a product description for you.",
      });
    }, 2000);
  };

  const generateProductImage = () => {
    // Simulate image selection (in real app, would use Gemini Vision or Unsplash API)
    const imageUrls = {
      'tomato': 'https://images.unsplash.com/photo-1546470427-e0b89e81b24f?w=400&h=300&fit=crop',
      'carrot': 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&h=300&fit=crop',
      'spinach': 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=300&fit=crop',
      'potato': 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&h=300&fit=crop',
      'onion': 'https://images.unsplash.com/photo-1518663023742-ba6bb0b464c8?w=400&h=300&fit=crop',
      'capsicum': 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=400&h=300&fit=crop',
      'pepper': 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=400&h=300&fit=crop',
      'lettuce': 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=400&h=300&fit=crop',
      'cucumber': 'https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?w=400&h=300&fit=crop'
    };
    
    const productKey = formData.name.toLowerCase();
    const matchedImage = Object.keys(imageUrls).find(key => 
      productKey.includes(key)
    );
    
    const selectedImage = matchedImage 
      ? imageUrls[matchedImage as keyof typeof imageUrls]
      : 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop';
    
    setFormData(prev => ({ ...prev, image: selectedImage }));
    
    toast({
      title: "Image selected!",
      description: "AI has selected a suitable product image.",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.price || !formData.inStock) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const newProduct = {
      name: formData.name,
      price: parseFloat(formData.price),
      unit: formData.unit,
      description: formData.description || `Fresh ${formData.name} from our farm`,
      farmer: formData.farmer,
      location: formData.location,
      isExpressDelivery: formData.isExpressDelivery,
      inStock: parseInt(formData.inStock),
      image: formData.image || 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop'
    };

    onAddProduct(newProduct);
    
    // Reset form
    setFormData({
      name: '',
      price: '',
      unit: 'kg',
      description: '',
      farmer: 'Your Farm',
      location: 'Your Location',
      isExpressDelivery: false,
      inStock: '',
      image: ''
    });

    toast({
      title: "Product added successfully!",
      description: "Your product is now available for customers to purchase.",
    });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-fade-in">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-2xl font-bold">Add New Product</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Product Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Product Name *</Label>
              <Input
                id="name"
                placeholder="e.g., Fresh Tomatoes"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                required
              />
            </div>

            {/* Price and Unit */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Price (₹) *</Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="45"
                  value={formData.price}
                  onChange={(e) => handleInputChange('price', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="unit">Unit</Label>
                <select
                  id="unit"
                  className="w-full px-3 py-2 border border-input rounded-md bg-background"
                  value={formData.unit}
                  onChange={(e) => handleInputChange('unit', e.target.value)}
                >
                  <option value="kg">per kg</option>
                  <option value="bunch">per bunch</option>
                  <option value="piece">per piece</option>
                  <option value="dozen">per dozen</option>
                  <option value="gram">per gram</option>
                </select>
              </div>
            </div>

            {/* Stock */}
            <div className="space-y-2">
              <Label htmlFor="stock">Stock Quantity *</Label>
              <Input
                id="stock"
                type="number"
                placeholder="25"
                value={formData.inStock}
                onChange={(e) => handleInputChange('inStock', e.target.value)}
                required
              />
            </div>

            {/* AI Description */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="description">Product Description</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={generateAIDescription}
                  disabled={isGeneratingDescription}
                  className="text-xs"
                >
                  <Sparkles className="h-3 w-3 mr-1" />
                  {isGeneratingDescription ? 'Generating...' : 'AI Generate'}
                </Button>
              </div>
              <Textarea
                id="description"
                placeholder="Fresh organic tomatoes perfect for salads..."
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={3}
              />
            </div>

            {/* Image */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Product Image</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={generateProductImage}
                  className="text-xs"
                >
                  <Upload className="h-3 w-3 mr-1" />
                  AI Select Image
                </Button>
              </div>
              {formData.image && (
                <div className="relative w-full h-32 rounded-lg overflow-hidden border">
                  <img 
                    src={formData.image} 
                    alt="Product preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>

            {/* Express Delivery */}
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div className="space-y-1">
                <Label>Express Delivery (10-min)</Label>
                <p className="text-sm text-muted-foreground">
                  Offer 10-minute delivery for this product
                </p>
              </div>
              <Switch
                checked={formData.isExpressDelivery}
                onCheckedChange={(checked) => handleInputChange('isExpressDelivery', checked)}
              />
            </div>

            {formData.isExpressDelivery && (
              <Badge className="badge-organic">
                ⚡ This product will show as Express Delivery
              </Badge>
            )}

            {/* Farmer Info */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="farmer">Farmer Name</Label>
                <Input
                  id="farmer"
                  value={formData.farmer}
                  onChange={(e) => handleInputChange('farmer', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                />
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-4 pt-4">
              <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                Cancel
              </Button>
              <Button type="submit" className="btn-hero flex-1">
                Add Product
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddProductForm;