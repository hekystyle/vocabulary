import { DefaultOptionType } from 'antd/lib/select';

export function options<T extends DefaultOptionType['value']>(values: readonly T[]): DefaultOptionType[] {
  return values.map(value => ({
    label: value,
    value,
  }));
}
