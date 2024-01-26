import { CloudServerOutlined, CloudUploadOutlined, LoadingOutlined } from '@ant-design/icons';
import { useIsMutating, useQuery } from '@tanstack/react-query';
import { Tooltip } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { SortOrder } from 'antd/es/table/interface';
import { FC, useMemo } from 'react';
import { SpinnerBox } from '@/components/SpinnerBox';
import { Table } from '@/components/Table';
import { useFilter } from '@/filter';
import { useServices } from '@/services';
import { QUERY_KEYS } from '@/utils/queryKeys';
import { Term } from '../../../types/Term';
import { Actions } from './table/Actions';
import { AddButton } from './table/AddButton';

export const ICON_SIZE = 20 as const;

export const SyncStatusCell: FC<{ record: Term }> = ({ record }) => {
  const isSyncing = useIsMutating({ mutationKey: ['sync'] });

  if (record.serverId) return <CloudServerOutlined style={{ fontSize: ICON_SIZE }} />;

  if (isSyncing) return <LoadingOutlined style={{ fontSize: ICON_SIZE }} />;

  return <CloudUploadOutlined style={{ fontSize: ICON_SIZE }} />;
};

// TODO: support multiple columns sorting
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
    key: 'syncStatus',
    title: <CloudServerOutlined style={{ fontSize: ICON_SIZE }} />,
    render: (_, record) => <SyncStatusCell record={record} />,
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
  } = useQuery({
    queryKey: QUERY_KEYS.terms.filter({ pageSize: PAGE_SIZE, page: currentPage, sortField, sortOrder }),
    queryFn: ({ signal }) =>
      termsRepository.get({ pageSize: PAGE_SIZE, page: currentPage ?? 1, sortField, sortOrder }, signal),
  });

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
      onChange={(_, __, sorters) => {
        const { field, order } = [sorters].flat().at(0) ?? {};

        updateFilter({
          sortField: field?.toString(),
          sortOrder: order ?? 'ascend',
        });
      }}
    />
  );
};
