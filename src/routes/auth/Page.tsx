import { GithubFilled } from '@ant-design/icons';
import { Button, Col, Row } from 'antd';
import { FC } from 'react';
import { BASE_API_URL } from '@/services/constants';

export const AuthPage: FC = () => {
  const url = new URL('/api/auth/github', BASE_API_URL);
  url.searchParams.set('redirect_uri', new URL('/', window.location.origin).toString());

  return (
    <Row align="middle" justify="center">
      <Col flex="520px">
        <Button className="w-100" href={url.toString()} icon={<GithubFilled />} size="large" type="primary">
          GitHub
        </Button>
      </Col>
    </Row>
  );
};

export default AuthPage;
