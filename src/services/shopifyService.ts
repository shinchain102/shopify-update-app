import { OrderUpdate } from '../types/order';

export const updateOrders = async (orders: OrderUpdate[]): Promise<void> => {
  for (const order of orders) {
    try {
      const response = await fetch('/api/orders/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
      });

      if (!response.ok) {
        throw new Error(`Failed to update order ${order.orderId}`);
      }
    } catch (error) {
      console.error(`Error updating order ${order.orderId}:`, error);
      throw error;
    }
  }
};