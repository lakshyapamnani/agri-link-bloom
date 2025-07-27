import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useOrderStore } from "@/store/orderStore";

export function SalesDashboard() {
  const { orders, updateOrderStatus } = useOrderStore();

  const handleMarkAsCompleted = (orderId: string) => {
    updateOrderStatus(orderId, "Completed");
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Sales Dashboard</h1>
      <div className="space-y-6">
        {orders.map((order) => (
          <Card key={order.id}>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>{order.id}</CardTitle>
              <Badge
                variant={order.status === "Completed" ? "default" : "secondary"}
              >
                {order.status}
              </Badge>
            </CardHeader>
            <CardContent>
              <p>
                <strong>Customer:</strong> {order.customer.name}
              </p>
              <p>
                <strong>Email:</strong> {order.customer.email}
              </p>
              <p>
                <strong>Address:</strong> {order.customer.address}
              </p>
              <p>
                <strong>Date:</strong> {new Date(order.date).toLocaleDateString()}
              </p>
              <p>
                <strong>Total:</strong> ₹{order.total.toFixed(2)}
              </p>
              <div className="mt-4">
                <h4 className="font-semibold">Items:</h4>
                <ul className="list-disc list-inside">
                  {order.items.map((item, index) => (
                    <li key={index}>
                      {item.name} (x{item.quantity} {item.unit})
                    </li>
                  ))}
                </ul>
              </div>
              {order.status === "Pending" && (
                <Button
                  onClick={() => handleMarkAsCompleted(order.id)}
                  className="mt-4"
                >
                  Mark as Completed
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
