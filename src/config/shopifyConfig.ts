import { AppBridgeConfig } from '@shopify/app-bridge';

export const getShopifyConfig = (): AppBridgeConfig => {
  return {
    apiKey: import.meta.env.VITE_SHOPIFY_API_KEY,
    host: new URLSearchParams(window.location.search).get('host') || '',
    forceRedirect: true
  };
};