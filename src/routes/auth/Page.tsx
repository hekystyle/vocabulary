import { GithubFilled } from '@ant-design/icons';
import { useMutation } from '@tanstack/react-query';
import { Button, Col, Row } from 'antd';
import { useUser } from 'auth';
import { signInWithPopup, GithubAuthProvider, AuthProvider, ProviderId } from 'firebase/auth';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFirebaseAuth } from 'services/firebase';
import { useAppNotification } from 'services/Notifications';

export const AuthPage: FC = () => {
  const auth = useFirebaseAuth();
  const user = useUser();
  const notification = useAppNotification();
  const navigate = useNavigate();

  const { mutate: signIn, isPending: isSigningIn } = useMutation({
    mutationFn: (provider: AuthProvider) => signInWithPopup(auth, provider),
    onSuccess: () => {
      notification.success({
        message: 'Login successful',
      });
      navigate('/');
    },
    onError: error => {
      notification.error({
        message: 'Login failed',
        description: error instanceof Error ? error.message : undefined,
      });
    },
  });

  const handleGithubLogin = () => {
    const provider = new GithubAuthProvider();
    provider.setCustomParameters({
      allow_signup: 'false',
    });
    signIn(provider);
  };

  return (
    <Row align="middle" justify="center">
      <Col flex="520px">
        <Button
          className="w-100"
          disabled={
            isSigningIn ||
            user === 'loading' ||
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- false positive
            user?.providerData.find(provider => provider.providerId === ProviderId.GITHUB) !== undefined
          }
          icon={<GithubFilled />}
          loading={isSigningIn}
          size="large"
          type="primary"
          onClick={handleGithubLogin}
        >
          GitHub
        </Button>
      </Col>
    </Row>
  );
};

export default AuthPage;
