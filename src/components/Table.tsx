import styled from "styled-components";
import { Table as AntdTable, TableProps } from "antd";

export function Table<T extends {}>(props: TableProps<T>) {
  const Component = styled((props: TableProps<T>) => (
    <AntdTable<T> {...props} />
  ))`
    .ant-pagination {
      background-color: white;
      padding: 16px 0;
      margin: 0;
    }
  `;

  return <Component {...props} />;
}
