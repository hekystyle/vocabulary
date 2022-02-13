import { Tooltip } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { useDispatch, useSelector } from 'react-redux';
import { sort } from 'ramda';
import { AppState } from 'reducer';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { Table } from 'components/Table';
import { useMemo, VFC } from 'react';
import { tableSlice } from '../reducer';
import { Term } from '../../../types/Term';
import { selectAll } from '../adapters';
import { AddButton } from './table/AddButton';
import { Actions } from './table/Actions';

const getColumns = (): ColumnsType<Term> => [
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
    render: (_, record) => <Actions record={record} />,
  },
];

export const ListTable: VFC = () => {
  const dispatch = useDispatch();
  const columns = useMemo(() => getColumns(), []);
  const items = useSelector<AppState, Term[]>(s => sort((a, b) => (b.id ?? 0) - (a.id ?? 0), selectAll(s)));
  const currentPage = useTypedSelector(s => s.records.table.page);
  return (
    <Table
      columns={columns}
      dataSource={items}
      pagination={{
        defaultCurrent: currentPage,
        onChange: page => dispatch(tableSlice.actions.update({ page })),
      }}
      rowKey="id"
      size="middle"
    />
  );
};
