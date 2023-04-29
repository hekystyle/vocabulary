import { Select, SelectProps } from 'antd';
import { useServices } from 'services';
import { FC, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { options } from 'utils/options';
import { QUERY_KEYS } from 'utils/queryKeys';

export const Tags: FC<Pick<SelectProps<string[]>, 'defaultValue' | 'value' | 'onChange' | 'style'>> = ({
  defaultValue,
  onChange,
  value,
  style,
}) => {
  const [search, setSearch] = useState<string>('');
  const { termsRepository } = useServices();

  const { data: uniqueTagsOptions, isFetching: loadingUniqueTags } = useQuery(
    QUERY_KEYS.terms.tags.all(),
    ({ signal }) => termsRepository.getUniqueTags(search, signal),
    {
      select: options,
    },
  );

  return (
    <Select
      allowClear
      aria-label="Tags"
      defaultValue={defaultValue}
      loading={loadingUniqueTags}
      mode="tags"
      options={uniqueTagsOptions}
      placeholder="Tags"
      style={style}
      value={value}
      onChange={onChange}
      onSearch={setSearch}
    />
  );
};
