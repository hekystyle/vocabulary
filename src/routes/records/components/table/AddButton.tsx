import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';

export const AddButton: FC = () => {
  const navigate = useNavigate();

  return <Button aria-label="Add" icon={<PlusOutlined />} type="primary" onClick={() => navigate('/records/create')} />;
};
