import { LoadingOutlined, LoginOutlined } from '@ant-design/icons';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Avatar, Button, Dropdown } from 'antd';
import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useServices } from '@/services';
import { useAppNotification } from '@/services/Notifications';
import { QUERY_KEYS } from '@/utils/queryKeys';

export const User: FC = () => {
  const notification = useAppNotification();
  const navigate = useNavigate();
  const { authApiClient } = useServices();

  const profileQuery = useQuery({
    queryKey: QUERY_KEYS.auth.profile(),
    queryFn: async ({ signal }) => await authApiClient.getUserProfile(signal),
    staleTime: 0,
    gcTime: 0,
    meta: {
      errorMessage: 'Failed to fetch user profile',
      successMessage: 'User profile fetched',
    },
  });

  useEffect(() => {
    if (!profileQuery.error) return;
    notification.error({
      message: 'Failed to fetch user profile',
      description: profileQuery.error instanceof Error ? profileQuery.error.message : undefined,
    });
  }, [notification, profileQuery.error]);

  const { mutateAsync: logout, isPending: isSigningOut } = useMutation({
    mutationFn: () => authApiClient.signOut(),
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

  if (isSigningOut || profileQuery.isLoading) {
    return <LoadingOutlined spin style={{ color: 'white' }} />;
  }

  return !profileQuery.data ? (
    <Button icon={<LoginOutlined />} size="large" type="primary" onClick={() => navigate('/auth')}>
      Login
    </Button>
  ) : (
    <Dropdown
      menu={{
        items: [{ key: 'logout', label: 'Logout', onClick: handleLogoutButtonClick }],
      }}
    >
      <Avatar alt={profileQuery.data.email} src={profileQuery.data.photoURL} />
    </Dropdown>
  );
};
