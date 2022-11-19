import { DefaultOptionType } from 'antd/es/select';

export function options<T extends DefaultOptionType['value']>(values: readonly T[]): DefaultOptionType[] {
  return values.map(value => ({
    label: value,
    value,
  }));
}
