import { useQuery } from '@tanstack/react-query';
import { Tooltip } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useMemo } from 'react';
import { SpinnerBox } from '@/components/SpinnerBox';
import { Table } from '@/components/Table';
import { Sortable, Sorter, useFilter } from '@/filter';
import { useServices } from '@/services';
import { QUERY_KEYS } from '@/utils/queryKeys';
import { Term } from '../../../types/Term';
import { Actions } from './table/Actions';
import { AddButton } from './table/AddButton';

const getColumns = ({ sortBy }: Sortable): ColumnsType<Term> => [
  {
    key: 'word',
    title: 'Word',
    dataIndex: 'word',
    ellipsis: { showTitle: true },
    sorter: true,
    sortOrder: sortBy.find(({ field }) => field === 'word')?.order ?? null,
  },
  {
    key: 'answersCount',
    dataIndex: 'answersCount',
    title: <Tooltip title="Total answers count">Total</Tooltip>,
    sorter: true,
    sortOrder: sortBy.find(({ field }) => field === 'answersCount')?.order ?? null,
    render: (_, record) => record.answersCount,
  },
  {
    key: 'correctAnswersCount',
    dataIndex: 'correctAnswersCount',
    title: <Tooltip title="Correct answers count">Correct</Tooltip>,
    sorter: true,
    sortOrder: sortBy.find(({ field }) => field === 'correctAnswersCount')?.order ?? null,
    render: (_, record) => record.correctAnswersCount,
  },
  {
    key: 'createdAt',
    dataIndex: 'createdAt',
    title: 'Created at',
    sorter: true,
    sortOrder: sortBy.find(({ field }) => field === 'createdAt')?.order ?? null,
    render: (_, record) => record.createdAt?.toLocaleDateString(),
  },
  {
    key: 'actions',
    align: 'right',
    fixed: 'right',
    width: '0',
    title: <AddButton />,
    render: (_, record) => <Actions record={record} />,
  },
];

const PAGE_SIZE = 20 as const;

export const ListTable = () => {
  const {
    filter: { page: currentPage, sortBy = [{ field: 'createdAt', order: 'descend' }] },
    update: updateFilter,
  } = useFilter();
  const { termsRepository } = useServices();

  const {
    error,
    data,
    isFetching: loading,
  } = useQuery({
    queryKey: QUERY_KEYS.terms.filter({ pageSize: PAGE_SIZE, page: currentPage, sortBy }),
    queryFn: ({ signal }) => termsRepository.get({ pageSize: PAGE_SIZE, page: currentPage ?? 1, sortBy }, signal),
  });

  const columns = useMemo(() => getColumns({ sortBy }), [sortBy]);

  if (loading) return <SpinnerBox label="Loading terms ..." />;

  if (error) return <p>Error: {error instanceof Error ? error.message : 'Unknown'}</p>;

  const { data: terms, meta } = data ?? {};
  const total = meta?.totalItems ?? 0;
  return (
    <Table
      columns={columns}
      dataSource={terms}
      pagination={{
        total,
        pageSize: PAGE_SIZE,
        defaultCurrent: currentPage,
        onChange: page => updateFilter({ page }),
      }}
      rowKey={item => item.id ?? 'undefined'}
      scroll={{ x: true }}
      size="middle"
      onChange={(_, __, sorters) => {
        updateFilter({
          sortBy: [sorters].flat().reduce<Sorter[]>((acc, { field, order }) => {
            if (field && order)
              acc.push({
                field: field.toString(),
                order,
              });
            return acc;
          }, []),
        });
      }}
    />
  );
};
