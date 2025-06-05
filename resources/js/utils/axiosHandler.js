import axios from 'axios';
import createApp from "@shopify/app-bridge";
import { getSessionToken } from "@shopify/app-bridge/utilities";
import { useAppBridge } from '@shopify/app-bridge-react';

const instance = axios.create({
    baseURL: window.location.origin,
    timeout: 900000,
});

instance.interceptors.request.use(async function (config) {
    var host = new URLSearchParams(location.search).get("host") || window.__SHOPIFY_DEV_HOST;
    const bridge = useAppBridge();
    const base_url = bridge.origin.replace('https://', '').replace('https://www.', '');
    const shop = bridge.config.shop.split(".")[0];
    if (host == undefined) {
        host = window.btoa(base_url + "/store/" + shop);
    }
    const SHOPIFY_API_KEY = import.meta.env.VITE_SHOPIFY_API_KEY;
    
    const appBridgeConfig = {
        host,
        apiKey: SHOPIFY_API_KEY,
        forceRedirect: true,
    };
    const app = createApp(appBridgeConfig);
    const sessionToken = await getSessionToken(app);
    // Append your request headers with an authenticated token
    config.headers.Authorization = `Bearer ${sessionToken}`
    return config
});
export default instance;