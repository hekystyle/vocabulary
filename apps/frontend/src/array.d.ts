interface ArrayConstructor {
  /**
   * Strictly typed version of native `Array.isArray()`.
   */
  isArray(arg: unknown): arg is unknown[];
}
