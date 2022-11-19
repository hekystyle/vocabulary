import { Tooltip } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { Table } from 'components/Table';
import { FC, useCallback, useMemo } from 'react';
import { SpinnerBox } from 'components/SpinnerBox';
import { useServices } from 'containers/Services';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { QUERY_KEYS } from 'utils/queryKeys';
import { useFilter } from 'containers/Filter';
import { SortOrder } from 'antd/es/table/interface';
import { toArray } from 'utils/toArray';
import { Term } from '../../../types/Term';
import { AddButton } from './table/AddButton';
import { Actions, ActionsProps } from './table/Actions';

const getColumns = ({
  sortField,
  sortOrder,
  onDelete,
}: Pick<ActionsProps, 'onDelete'> & { sortField: string; sortOrder: SortOrder }): ColumnsType<Term> => [
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
    width: '0',
    title: () => <AddButton />,
    render: (_, record) => <Actions record={record} onDelete={onDelete} />,
  },
];

const PAGE_SIZE = 20 as const;

export const ListTable: FC = () => {
  const {
    filter: { page: currentPage, sortField = 'createdAt', sortOrder = 'descend' },
    update: updateFilter,
  } = useFilter();
  const { termsRepository } = useServices();
  const queryClient = useQueryClient();

  const {
    error,
    data,
    isFetching: loading,
  } = useQuery(
    QUERY_KEYS.terms.filter({ pageSize: PAGE_SIZE, page: currentPage, sortField, sortOrder }),
    () => termsRepository.get({ pageSize: PAGE_SIZE, page: currentPage ?? 1, sortField, sortOrder }),
    {
      onError: e => console.error(e),
    },
  );

  const { isLoading: deleting, mutateAsync: deleteAsync } = useMutation(termsRepository.delete.bind(termsRepository), {
    onSuccess: () => queryClient.invalidateQueries(QUERY_KEYS.terms.all()),
    onError: console.error,
  });

  const handleDelete: ActionsProps['onDelete'] = useCallback(
    term => {
      if (term.id === undefined) return;
      deleteAsync(term.id).catch(console.error);
    },
    [deleteAsync],
  );

  const columns = useMemo(
    () => getColumns({ sortOrder, sortField, onDelete: handleDelete }),
    [handleDelete, sortField, sortOrder],
  );

  if (loading || deleting) return <SpinnerBox label={loading ? 'Loading terms ...' : 'Deleting term ...'} />;

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
      rowKey="id"
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
