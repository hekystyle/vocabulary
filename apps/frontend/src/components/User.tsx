import { LoadingOutlined, LoginOutlined } from '@ant-design/icons';
import { useMutation } from '@tanstack/react-query';
import { Avatar, Button, Dropdown } from 'antd';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/auth';
import { useFirebaseAuth } from '@/services/firebase';
import { useAppNotification } from '@/services/Notifications';

export const User: FC = () => {
  const user = useUser();
  const auth = useFirebaseAuth();
  const notification = useAppNotification();
  const navigate = useNavigate();

  const { mutateAsync: logout, isPending: isSigningOut } = useMutation({
    mutationFn: () => auth.signOut(),
  });

  const handleLogoutButtonClick = () => {
    logout()
      .then(() => {
        notification.success({
          message: 'Logged out',
        });
      })
      .catch(error => {
        notification.error({
          message: 'Logout failed',
          description: error instanceof Error ? error.message : undefined,
        });
      });
  };

  if (isSigningOut || user === 'loading') {
    return <LoadingOutlined spin style={{ color: 'white' }} />;
  }

  return !user ? (
    <Button icon={<LoginOutlined />} size="large" type="primary" onClick={() => navigate('/auth')}>
      Login
    </Button>
  ) : (
    <Dropdown
      menu={{
        items: [{ key: 'logout', label: 'Logout', onClick: handleLogoutButtonClick }],
      }}
    >
      <Avatar alt={user.displayName ?? user.uid} src={user.photoURL} />
    </Dropdown>
  );
};
