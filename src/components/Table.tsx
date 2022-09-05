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

// eslint-disable-next-line react/function-component-definition
export function Table<T>(props: TableProps<T>): JSX.Element {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <StyledTable<FC<TableProps<T>>> {...props} />;
}
