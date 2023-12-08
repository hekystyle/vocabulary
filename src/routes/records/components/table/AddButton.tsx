import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

export const AddButton: FC = () => {
  const navigate = useNavigate();

  return <Button aria-label="Add" icon={<PlusOutlined />} type="primary" onClick={() => navigate('./create')} />;
};
