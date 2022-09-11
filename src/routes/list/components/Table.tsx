import { Tooltip } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { Table } from 'components/Table';
import { FC, useCallback, useMemo } from 'react';
import { SpinnerBox } from 'components/SpinnerBox';
import { useServices } from 'services/di';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { QUERY_KEYS } from 'utils/queryKeys';
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

export const ListTable: FC = () => {
  const dispatch = useDispatch();
  const currentPage = useTypedSelector(selectCurrentPage);
  const { db } = useServices();
  const queryClient = useQueryClient();

  const {
    error,
    data,
    isFetching: loading,
  } = useQuery(
    QUERY_KEYS.terms.filter({ pageSize: PAGE_SIZE, page: currentPage }),
    () => getTerms(db)({ pageSize: PAGE_SIZE, page: currentPage }),
    {
      onError: e => console.error(e),
    },
  );

  const { isLoading: deleting, mutateAsync: deleteAsync } = useMutation(deleteTerm(db), {
    onSuccess: () => queryClient.invalidateQueries(QUERY_KEYS.terms.key),
  });

  const handleDelete: ActionsProps['onDelete'] = useCallback(
    term => {
      if (term.id === undefined) return;
      deleteAsync(term.id).catch(e => console.error(e));
    },
    [deleteAsync],
  );

  const columns = useMemo(() => getColumns({ onDelete: handleDelete }), [handleDelete]);

  if (loading || deleting) return <SpinnerBox />;

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
        onChange: page => dispatch(tableSlice.actions.update({ page })),
      }}
      rowKey="id"
      size="middle"
    />
  );
};
