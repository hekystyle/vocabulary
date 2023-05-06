import { Col, Row } from 'antd';
import type { FC } from 'react';
import { ListTable } from './components/Table';

export default (() => (
  <Row justify="center">
    <Col flex="920px">
      <ListTable />
    </Col>
  </Row>
)) satisfies FC;
