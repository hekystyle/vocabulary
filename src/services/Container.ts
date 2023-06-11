interface ServiceFactoryApi<TServicesMap> {
  get<U extends keyof TServicesMap>(key: U): TServicesMap[U];
}

type FactoriesMap<TServicesMap> = {
  [K in keyof TServicesMap]: (api: ServiceFactoryApi<TServicesMap>) => TServicesMap[K];
};

type ServicesMap<TServicesMap> = {
  [K in keyof TServicesMap]: TServicesMap[K];
};

type ServicesGetters<TServicesMap> = Readonly<ServicesMap<TServicesMap>>;

export class Container<TServicesMap> {
  public readonly services: ServicesGetters<TServicesMap>;

  private cache: Partial<ServicesMap<TServicesMap>> = {};

  constructor(private factories: FactoriesMap<TServicesMap>) {
    this.services = new Proxy<ServicesGetters<TServicesMap>>({} as ServicesGetters<TServicesMap>, {
      get: (_, key) => (key in factories ? this.get(key as keyof TServicesMap) : undefined),
    });
  }

  overrideFactory<K extends keyof TServicesMap>(key: K, factory: FactoriesMap<TServicesMap>[K]): this {
    this.factories[key] = factory;
    return this;
  }

  get<K extends keyof TServicesMap>(key: K): TServicesMap[K] {
    const service = this.cache[key];

    if (service) return service;

    const factory = this.factories[key];

    const instance = factory({
      get: innerKey => this.get(innerKey),
    });

    this.cache[key] = instance;

    return instance;
  }
}
