import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';

export const AddButton: FC = () => {
  const navigate = useNavigate();

  return <Button icon={<PlusOutlined />} type="primary" onClick={() => navigate('/record')} />;
};
