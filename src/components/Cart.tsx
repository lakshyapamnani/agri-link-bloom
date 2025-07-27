import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useProductStore } from "@/store/productStore";
import { useOrderStore } from "@/store/orderStore";
import { ShoppingCart, Trash2, Plus, Minus } from "lucide-react";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

function CheckoutForm({ onCheckout }: { onCheckout: () => void }) {
  const { cart, clearCart } = useProductStore();
  const { addOrder } = useOrderStore();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data: any) => {
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    addOrder({
      customer: data,
      items: cart,
      total,
    });

    // Web3Forms submission logic remains the same
    const formData = new FormData();
    formData.append("access_key", "YOUR_ACCESS_KEY_HERE"); // Placeholder
    formData.append("subject", "New Order from Agri-Link");
    const cartDetails = cart.map(item => `${item.name} (x${item.quantity}) - ₹${(item.price * item.quantity).toFixed(2)}`).join("<br>");
    const htmlBody = `
      <h2>New Order</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Address:</strong> ${data.address}</p>
      <h3>Order Details:</h3>
      ${cartDetails}
      <br>
      <strong>Total: ₹${total.toFixed(2)}</strong>
    `;
    formData.append("from_name", "Agri-Link Order");
    formData.append("message", htmlBody);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        alert("Order placed successfully!");
        clearCart();
        reset();
        onCheckout();
      } else {
        alert("There was an error placing your order. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was an error placing your order. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label>Name</Label>
        <Input {...register("name", { required: true })} placeholder="Your Name" />
      </div>
      <div>
        <Label>Email</Label>
        <Input {...register("email", { required: true })} type="email" placeholder="Your Email" />
      </div>
      <div>
        <Label>Address</Label>
        <Input {...register("address", { required: true })} placeholder="Your Address" />
      </div>
      <Button type="submit" className="w-full btn-hero">
        Place Order
      </Button>
    </form>
  );
}

export function Cart() {
  const { cart, removeFromCart, updateQuantity } = useProductStore();
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const [isCheckoutOpen, setCheckoutOpen] = useState(false);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {cart.length > 0 && (
            <Badge
              className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-1 text-xs"
              variant="destructive"
            >
              {cart.length}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle>Your Cart ({cart.length})</SheetTitle>
        </SheetHeader>
        {cart.length > 0 ? (
          <>
            <ScrollArea className="flex-grow">
              <div className="space-y-4 pr-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-start gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-md object-cover"
                    />
                    <div className="flex-grow">
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-muted-foreground">
                        ₹{item.price.toFixed(2)} / {item.unit}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-6 w-6"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span>{item.quantity}</span>
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-6 w-6"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </p>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="text-muted-foreground hover:text-destructive h-8 w-8 mt-1"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <SheetFooter>
              <div className="w-full space-y-4">
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
                <Dialog open={isCheckoutOpen} onOpenChange={setCheckoutOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full btn-hero">Proceed to Checkout</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Checkout</DialogTitle>
                    </DialogHeader>
                    <CheckoutForm onCheckout={() => setCheckoutOpen(false)} />
                  </DialogContent>
                </Dialog>
              </div>
            </SheetFooter>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <ShoppingCart className="h-16 w-16 text-muted-foreground mb-4" />
            <p className="text-xl font-semibold">Your cart is empty</p>
            <p className="text-muted-foreground">
              Add some fresh products to get started!
            </p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
