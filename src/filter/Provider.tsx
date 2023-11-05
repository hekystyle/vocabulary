import { stringify } from 'qs';
import { mergeDeepRight, pick } from 'ramda';
import { FC, PropsWithChildren, useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FilterContext } from './Context';
import { getInitialFilter } from './getInitialFilter';
import { FilterShape, FilterUpdater, FilterValues } from './types';

export const FilterProvider: FC<PropsWithChildren> = ({ children }) => {
  const location = useLocation();

  const [filter, setFilter] = useState<Partial<FilterValues>>(getInitialFilter(location.search));
  const [fields, setFields] = useState<undefined | ReadonlyArray<keyof FilterValues>>();

  const updateFilter: FilterUpdater = useCallback(update => {
    setFilter(prevFilter => mergeDeepRight(prevFilter, update));
  }, []);

  const pickedFilter = useMemo(
    () =>
      fields
        ? pick(
            // NOTE: ramda typing seems incorrect as pick accepts empty array in runtime
            fields as [keyof FilterValues, ...Array<keyof FilterValues>],
            filter,
          )
        : filter,
    [fields, filter],
  );

  const shape = useMemo<FilterShape>(
    () => ({ filter: pickedFilter, update: updateFilter, setFields }),
    [pickedFilter, updateFilter],
  );

  const navigate = useNavigate();
  useEffect(() => {
    navigate({ search: stringify(pickedFilter) }, { replace: true, state: location.state as unknown });
  }, [pickedFilter, navigate, location.state]);

  return <FilterContext.Provider value={shape}>{children}</FilterContext.Provider>;
};

FilterProvider.displayName = 'FilterProvider';
