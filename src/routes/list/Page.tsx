import { Col, Row } from 'antd';
import { FC } from 'react';
import { ListTable } from './components/Table';

export const ListPage: FC = () => (
  <Row justify="center">
    <Col flex="920px">
      <ListTable />
    </Col>
  </Row>
);
