import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, ShoppingCart, Truck } from "lucide-react";

export function HowItWorks() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-12">How It Works</h1>
      <div className="grid md:grid-cols-3 gap-8 text-center">
        <Card>
          <CardHeader>
            <Leaf className="h-12 w-12 mx-auto text-primary" />
            <CardTitle className="mt-4">1. Browse Fresh Produce</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Explore a wide variety of fresh, organic produce directly from
              local farmers. Read about their farming practices and choose the
              best for you.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <ShoppingCart className="h-12 w-12 mx-auto text-primary" />
            <CardTitle className="mt-4">2. Place Your Order</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Add your desired products to the cart and proceed to checkout.
              Enter your delivery details and place your order with a few simple
              clicks.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Truck className="h-12 w-12 mx-auto text-primary" />
            <CardTitle className="mt-4">3. Get it Delivered</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Your order is sent directly to the farmer, who prepares your
              produce. We then deliver it to your doorstep, fresh and ready to
              enjoy.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
