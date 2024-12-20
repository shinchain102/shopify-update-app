import Papa from 'papaparse';
import { OrderUpdate, ParsedCSVRow } from '../types/order';

export const parseCSV = (file: File): Promise<OrderUpdate[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        const orders: OrderUpdate[] = (results.data as ParsedCSVRow[])
          .filter(row => row['Order ID'] && row['Status'])
          .map(row => ({
            orderId: row['Order ID'],
            status: row['Status'].toLowerCase() as 'dispatched' | 'delivered',
            trackingId: row['Tracking ID']
          }));
        resolve(orders);
      },
      error: (error) => {
        reject(error);
      }
    });
  });
};