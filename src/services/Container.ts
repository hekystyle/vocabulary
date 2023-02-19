interface ServiceFactoryApi<TServicesMap> {
  get<U extends keyof TServicesMap>(key: U): TServicesMap[U];
}

type FactoriesMap<TServicesMap> = {
  [K in keyof TServicesMap]: (api: ServiceFactoryApi<TServicesMap>) => TServicesMap[K];
};

export class Container<TServicesMap> {
  constructor(private factories: FactoriesMap<TServicesMap>) {}

  private cache: Partial<{ [K in keyof TServicesMap]: TServicesMap[K] }> = {};

  get<K extends keyof TServicesMap>(key: K): TServicesMap[K] {
    const service = this.cache[key];

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- false positive
    if (service) return service;

    const factory = this.factories[key];

    const instance = factory({
      get: innerKey => this.get(innerKey),
    });

    this.cache[key] = instance;

    return instance;
  }
}
