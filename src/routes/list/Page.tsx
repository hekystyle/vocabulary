import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Tooltip } from "antd";
import { ColumnsType } from "antd/lib/table";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { sort } from "ramda";
import { Term } from "../../types/Term";
import { AppState } from "reducer";
import { dictionarySlice, tableSlice } from "./reducer";
import { useTypedSelector } from "hooks/useTypedSelector";
import { Table } from "components/Table";
import { selectAll } from "./adapters";

export interface ListPageProps {}

export function ListPage(props: ListPageProps) {
  const history = useHistory();
  const dispatch = useDispatch();
  const columns: ColumnsType<Term> = [
    {
      title: "Word",
      dataIndex: "word",
      ellipsis: { showTitle: true },
    },
    {
      title: (
        <Tooltip title="Total answers / Correct answers">
          Total / Correct
        </Tooltip>
      ),
      render: (_, record) => (
        <>
          {record.answersCount} / {record.correctAnswersCount}
        </>
      ),
    },
    {
      title: () => (
        <Button type="primary" onClick={() => history.push("/record")}>
          <PlusOutlined />
        </Button>
      ),
      render: (_, record) => (
        <>
          <Button onClick={() => history.push(`/record/${record.id}`)}>
            <EditOutlined />
          </Button>
          <Popconfirm
            title="Are you sure to delete this?"
            onConfirm={() => {
              dispatch(dictionarySlice.actions.removeOne(record.id));
            }}
          >
            <Button>
              <DeleteOutlined />
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];
  const items = useSelector<AppState, Term[]>((s) =>
    sort((a, b) => (b.id ?? 0) - (a.id ?? 0), selectAll(s))
  );
  const page = useTypedSelector((s) => s.records.table.page);
  return (
    <Table
      columns={columns}
      dataSource={items}
      size="middle"
      rowKey="id"
      pagination={{
        defaultCurrent: page,
        onChange: (page) => dispatch(tableSlice.actions.update({ page })),
      }}
    />
  );
}
