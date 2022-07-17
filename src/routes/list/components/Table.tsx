import { Tooltip } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { Table } from 'components/Table';
import { FC, useCallback, useMemo } from 'react';
import { useRequest } from 'ahooks';
import { SpinnerBox } from 'components/SpinnerBox';
import { useServices } from 'services/di';
import { atom, useRecoilState } from 'recoil';
import { Term } from '../../../types/Term';
import { AddButton } from './table/AddButton';
import { Actions, ActionsProps } from './table/Actions';
import { getTerms } from '../api/getTerms';
import { deleteTerm } from '../api/deleteTerm';

const pageState = atom({
  key: 'terms/list/page',
  default: 1,
});

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
  const { db } = useServices();
  const [currentPage, setCurrentPage] = useRecoilState(pageState);

  const {
    error,
    data,
    loading,
    refresh: refreshTerms,
  } = useRequest(() => getTerms(db)({ pageSize: PAGE_SIZE, page: currentPage }), {
    refreshDeps: [PAGE_SIZE, currentPage],
  });

  const { loading: deleting, runAsync: deleteAsync } = useRequest(deleteTerm(db), { manual: true });

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
        onChange: page => setCurrentPage(page),
      }}
      rowKey="id"
      size="middle"
    />
  );
};
