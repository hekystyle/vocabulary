import { FC, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Modal, Space } from 'antd';
import { Term } from 'types/Term';

export interface ActionsProps {
  record: Term;
  onDelete: (term: Term) => void;
}

export const Actions: FC<ActionsProps> = ({ record, onDelete }) => {
  const navigate = useNavigate();

  const handleDeleteButtonClick = useCallback(() => {
    Modal.confirm({
      title: (
        <>
          Are you sure to delete <b>{record.word}</b>?
        </>
      ),
      onOk: () => onDelete(record),
    });
  }, [record, onDelete]);

  return (
    <Space>
      <Button aria-label="edit" icon={<EditOutlined />} onClick={() => navigate(`/record/${record.id ?? ''}`)} />
      <Button danger aria-label="delete" icon={<DeleteOutlined />} onClick={handleDeleteButtonClick} />
    </Space>
  );
};
