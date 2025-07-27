import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const initialOrders = [
  {
    id: "ORDER-8934",
    customer: "Shreya Sharma",
    date: "2023-10-26",
    total: 250.0,
    status: "Pending",
    items: [
      { name: "Fresh Tomatoes", quantity: 2, unit: "kg" },
      { name: "Organic Spinach", quantity: 1, unit: "bunch" },
    ],
  },
  {
    id: "ORDER-8935",
    customer: "Rohan Verma",
    date: "2023-10-25",
    total: 180.5,
    status: "Completed",
    items: [{ name: "Green Capsicum", quantity: 3, unit: "kg" }],
  },
];

export function SalesDashboard() {
  const [orders, setOrders] = useState(initialOrders);

  const handleMarkAsCompleted = (orderId: string) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: "Completed" } : order
      )
    );
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
                <strong>Customer:</strong> {order.customer}
              </p>
              <p>
                <strong>Date:</strong> {order.date}
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
