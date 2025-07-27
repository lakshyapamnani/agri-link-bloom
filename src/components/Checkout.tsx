import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useProductStore } from "@/store/productStore";
import { Label } from "./ui/label";

export function Checkout() {
  const { cart, clearCart } = useProductStore();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data: any) => {
    const formData = new FormData();
    formData.append("access_key", "YOUR_ACCESS_KEY_HERE"); // Placeholder
    formData.append("subject", "New Order from Agri-Link");

    const cartDetails = cart
      .map(
        (item) =>
          `${item.name} (x${item.quantity}) - ₹${(
            item.price * item.quantity
          ).toFixed(2)}`
      )
      .join("<br>");

    const htmlBody = `
      <h2>New Order</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Address:</strong> ${data.address}</p>
      <h3>Order Details:</h3>
      ${cartDetails}
      <br>
      <strong>Total: ₹${cart
        .reduce((acc, item) => acc + item.price * item.quantity, 0)
        .toFixed(2)}</strong>
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
      } else {
        alert("There was an error placing your order. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was an error placing your order. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
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
    </div>
  );
}
