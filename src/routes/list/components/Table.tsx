import { Tooltip } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { Table } from 'components/Table';
import { useMemo, VFC } from 'react';
import { tableSlice } from '../slices';
import { Term } from '../../../types/Term';
import { AddButton } from './table/AddButton';
import { Actions } from './table/Actions';
import { selectCurrentPage } from '../selectors';
import { selectAll } from '../adapters';

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
  const items = useTypedSelector(selectAll);
  const currentPage = useTypedSelector(selectCurrentPage);
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
