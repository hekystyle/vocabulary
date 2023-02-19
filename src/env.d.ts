interface ImportMetaEnv {
  /**
   * The delay in milliseconds to simulate slow network to see loading indicator in UI.
   */
  readonly VITE_DELAY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
