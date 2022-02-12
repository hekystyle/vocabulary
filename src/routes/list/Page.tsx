import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Tooltip } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { sort } from 'ramda';
import { AppState } from 'reducer';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { Table } from 'components/Table';
import { VFC } from 'react';
import { dictionarySlice, tableSlice } from './reducer';
import { Term } from '../../types/Term';
import { selectAll } from './adapters';

export const ListPage: VFC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const columns: ColumnsType<Term> = [
    {
      title: 'Word',
      dataIndex: 'word',
      ellipsis: { showTitle: true },
    },
    {
      title: <Tooltip title="Total answers / Correct answers">Total / Correct</Tooltip>,
      render: (_, record) => (
        <>
          {record.answersCount} / {record.correctAnswersCount}
        </>
      ),
    },
    {
      title: () => (
        <Button type="primary" onClick={() => navigate('/record')}>
          <PlusOutlined />
        </Button>
      ),
      render: (_, record) => (
        <>
          <Button onClick={() => navigate(`/record/${record.id}`)}>
            <EditOutlined />
          </Button>
          <Popconfirm
            title="Are you sure to delete this?"
            onConfirm={() => {
              dispatch(dictionarySlice.actions.removeOne(record.id));
            }}
          >
            <Button>
              <DeleteOutlined />
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];
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
