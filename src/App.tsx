import React, { useState } from 'react';
import { Page, Layout, Frame, Toast } from '@shopify/polaris';
import { FileUpload } from './components/FileUpload';
import { OrderUpdatePreview } from './components/OrderUpdatePreview';
import { updateOrders } from './services/shopifyService';
import { OrderUpdate } from './types/order';

function App() {
  const [orders, setOrders] = useState<OrderUpdate[]>([]);
  const [toastActive, setToastActive] = useState(false);
  const [toastContent, setToastContent] = useState({ message: '', error: false });

  const handleFileProcessed = (processedOrders: OrderUpdate[]) => {
    setOrders(processedOrders);
  };

  const handleConfirmUpdate = async () => {
    try {
      await updateOrders(orders);
      setToastContent({
        message: 'Orders updated successfully',
        error: false
      });
      setOrders([]);
    } catch (error) {
      setToastContent({
        message: 'Error updating orders. Please try again.',
        error: true
      });
    }
    setToastActive(true);
  };

  const toastMarkup = toastActive ? (
    <Toast
      content={toastContent.message}
      error={toastContent.error}
      onDismiss={() => setToastActive(false)}
    />
  ) : null;

  return (
    <Frame>
      <Page title="Bulk Order Status Update">
        <Layout>
          <Layout.Section>
            <FileUpload onFileProcessed={handleFileProcessed} />
          </Layout.Section>
          {orders.length > 0 && (
            <Layout.Section>
              <OrderUpdatePreview
                orders={orders}
                onConfirm={handleConfirmUpdate}
              />
            </Layout.Section>
          )}
        </Layout>
      </Page>
      {toastMarkup}
    </Frame>
  );
}

export default App;