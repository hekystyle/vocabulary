declare namespace NodeJS {
  interface ProcessEnv {
    /**
     * The delay in milliseconds to simulate slow network to see loading indicator in UI.
     */
    readonly DELAY?: string;
  }
}
