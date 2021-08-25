declare global {
  interface Window {
    __WB_MANIFEST: unknown;
  }
}

// eslint-disable-next-line
self.__WB_MANIFEST;

export {};
