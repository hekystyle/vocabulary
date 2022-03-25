import { Tooltip } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { Table } from 'components/Table';
import { useCallback, useMemo, VFC } from 'react';
import { useRequest } from 'ahooks';
import { SpinnerBox } from 'components/SpinnerBox';
import { tableSlice } from '../slices';
import { Term } from '../../../types/Term';
import { AddButton } from './table/AddButton';
import { Actions, ActionsProps } from './table/Actions';
import { selectCurrentPage } from '../selectors';
import { getTerms } from '../api/getTerms';
import { deleteTerm } from '../api/deleteTerm';

const getColumns = ({ onDelete }: Pick<ActionsProps, 'onDelete'>): ColumnsType<Term> => [
  {
    key: 'word',
    title: 'Word',
    dataIndex: 'word',
    ellipsis: { showTitle: true },
  },
  {
    key: 'statistics',
    title: <Tooltip title="Total answers / Correct answers">Total / Correct</Tooltip>,
    render: (_, record) => (
      <>
        {record.answersCount} / {record.correctAnswersCount}
      </>
    ),
  },
  {
    key: 'actions',
    title: () => <AddButton />,
    render: (_, record) => <Actions record={record} onDelete={onDelete} />,
  },
];

const PAGE_SIZE = 20 as const;

export const ListTable: VFC = () => {
  const dispatch = useDispatch();
  const currentPage = useTypedSelector(selectCurrentPage);

  const {
    error,
    data,
    loading,
    refresh: refreshTerms,
  } = useRequest(() => getTerms({ pageSize: PAGE_SIZE, page: currentPage }), {
    refreshDeps: [PAGE_SIZE, currentPage],
  });

  const { loading: deleting, runAsync: deleteAsync } = useRequest(deleteTerm, { manual: true });

  const handleDelete: ActionsProps['onDelete'] = useCallback(
    async term => {
      if (term.id === undefined) return;
      try {
        await deleteAsync(term.id);
        refreshTerms();
      } catch (e) {
        console.error(e);
      }
    },
    [deleteAsync, refreshTerms],
  );

  const columns = useMemo(() => getColumns({ onDelete: handleDelete }), [handleDelete]);

  if (loading || deleting) return <SpinnerBox />;

  if (error) return <p>Error: {error.message}</p>;

  const { terms, total } = data ?? {};
  return (
    <Table
      columns={columns}
      dataSource={terms}
      pagination={{
        total,
        pageSize: PAGE_SIZE,
        defaultCurrent: currentPage,
        onChange: page => dispatch(tableSlice.actions.update({ page })),
      }}
      rowKey="id"
      size="middle"
    />
  );
};
