import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Popconfirm } from 'antd';
import { Term } from 'types/Term';

export interface ActionsProps {
  record: Term;
  onDelete: (term: Term) => void;
}

export const Actions: FC<ActionsProps> = ({ record, onDelete }) => {
  const navigate = useNavigate();

  return (
    <>
      <Button onClick={() => navigate(`/record/${record.id ?? ''}`)}>
        <EditOutlined />
      </Button>
      <Popconfirm title="Are you sure to delete this?" onConfirm={() => onDelete(record)}>
        <Button>
          <DeleteOutlined />
        </Button>
      </Popconfirm>
    </>
  );
};
