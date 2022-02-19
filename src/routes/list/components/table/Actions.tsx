import { VFC } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Popconfirm } from 'antd';
import { Term } from 'types/Term';
import { dictionarySlice } from 'routes/list/slices';

export interface ActionsProps {
  record: Term;
}

export const Actions: VFC<ActionsProps> = ({ record }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
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
  );
};
