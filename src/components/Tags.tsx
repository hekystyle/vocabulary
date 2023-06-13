import { useQuery } from '@tanstack/react-query';
import { Select, SelectProps } from 'antd';
import { FC, useState } from 'react';
import { useServices } from 'services';
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

  const { data: uniqueTagsOptions, isFetching: loadingUniqueTags } = useQuery({
    queryKey: QUERY_KEYS.terms.tags.all(),
    queryFn: ({ signal }) => termsRepository.getUniqueTags(search, signal),
    select: options,
  });

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
