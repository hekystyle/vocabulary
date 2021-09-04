import { precacheAndRoute } from "workbox-precaching";

declare global {
  interface Window {
    __WB_MANIFEST: string[];
  }
}

// eslint-disable-next-line no-restricted-globals
precacheAndRoute(self.__WB_MANIFEST);
