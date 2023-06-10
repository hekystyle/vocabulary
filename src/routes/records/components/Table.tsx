import { useQuery } from '@tanstack/react-query';
import { Tooltip } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { SortOrder } from 'antd/es/table/interface';
import { useFilter } from 'filter';
import { FC, useMemo } from 'react';
import { useServices } from 'services';
import { SpinnerBox } from 'components/SpinnerBox';
import { Table } from 'components/Table';
import { QUERY_KEYS } from 'utils/queryKeys';
import { toArray } from 'utils/toArray';
import { Term } from '../../../types/Term';
import { Actions } from './table/Actions';
import { AddButton } from './table/AddButton';

const getColumns = ({ sortField, sortOrder }: { sortField: string; sortOrder: SortOrder }): ColumnsType<Term> => [
  {
    key: 'word',
    title: 'Word',
    dataIndex: 'word',
    ellipsis: { showTitle: true },
    sorter: true,
    sortOrder: sortField === 'word' ? sortOrder : null,
  },
  {
    key: 'answersCount',
    dataIndex: 'answersCount',
    title: <Tooltip title="Total answers count">Total</Tooltip>,
    sorter: true,
    sortOrder: sortField === 'answersCount' ? sortOrder : null,
    render: (_, record) => record.answersCount,
  },
  {
    key: 'correctAnswersCount',
    dataIndex: 'correctAnswersCount',
    title: <Tooltip title="Correct answers count">Correct</Tooltip>,
    sorter: true,
    sortOrder: sortField === 'correctAnswersCount' ? sortOrder : null,
    render: (_, record) => record.correctAnswersCount,
  },
  {
    key: 'createdAt',
    dataIndex: 'createdAt',
    title: 'Created at',
    sorter: true,
    sortOrder: sortField === 'createdAt' ? sortOrder : null,
    render: (_, record) => record.createdAt?.toLocaleDateString(),
  },
  {
    key: 'actions',
    align: 'right',
    fixed: 'right',
    width: '0',
    title: () => <AddButton />,
    render: (_, record) => <Actions record={record} />,
  },
];

const PAGE_SIZE = 20 as const;

export const ListTable: FC = () => {
  const {
    filter: { page: currentPage, sortField = 'createdAt', sortOrder = 'descend' },
    update: updateFilter,
  } = useFilter();
  const { termsRepository } = useServices();

  const {
    error,
    data,
    isFetching: loading,
  } = useQuery(
    QUERY_KEYS.terms.filter({ pageSize: PAGE_SIZE, page: currentPage, sortField, sortOrder }),
    ({ signal }) => termsRepository.get({ pageSize: PAGE_SIZE, page: currentPage ?? 1, sortField, sortOrder }, signal),
    {
      onError: e => console.error(e),
    },
  );

  const columns = useMemo(() => getColumns({ sortOrder, sortField }), [sortField, sortOrder]);

  if (loading) return <SpinnerBox label="Loading terms ..." />;

  if (error) return <p>Error: {error instanceof Error ? error.message : 'Unknown'}</p>;

  const { terms, total } = data ?? {};
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
      onChange={(_, __, sorter) => {
        const { field, order } = toArray(sorter)[0];

        updateFilter({
          sortField: field?.toString(),
          sortOrder: order ?? 'ascend',
        });
      }}
    />
  );
};
