export interface OrderUpdate {
  orderId: string;
  status: 'dispatched' | 'delivered';
  trackingId?: string;
}

export interface ParsedCSVRow {
  'Order ID': string;
  'Status': string;
  'Tracking ID'?: string;
}