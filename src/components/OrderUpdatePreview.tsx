import React from 'react';
import { Card, DataTable, Button, Stack } from '@shopify/polaris';
import { OrderUpdate } from '../types/order';

interface OrderUpdatePreviewProps {
  orders: OrderUpdate[];
  onConfirm: () => void;
}

export const OrderUpdatePreview: React.FC<OrderUpdatePreviewProps> = ({ orders, onConfirm }) => {
  const rows = orders.map(order => [
    order.orderId,
    order.status,
    order.trackingId || 'N/A'
  ]);

  return (
    <Card sectioned>
      <Stack vertical>
        <DataTable
          columnContentTypes={['text', 'text', 'text']}
          headings={['Order ID', 'Status', 'Tracking ID']}
          rows={rows}
        />
        <Button primary onClick={onConfirm}>
          Confirm Updates
        </Button>
      </Stack>
    </Card>
  );
};