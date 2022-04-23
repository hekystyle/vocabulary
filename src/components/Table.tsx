import { FC } from 'react';
import styled from 'styled-components';
import { Table as AntdTable, TableProps } from 'antd';

const StyledTable = styled(AntdTable)<TableProps<any>>`
  .ant-pagination {
    background-color: white;
    padding: 16px 0;
    margin: 0;
  }
`;

export function Table<T>(props: TableProps<T>): JSX.Element {
  return <StyledTable<FC<TableProps<T>>> {...props} />;
}
