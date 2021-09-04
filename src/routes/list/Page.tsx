import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Tooltip } from "antd";
import Table, { ColumnsType } from "antd/lib/table";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { sort } from "ramda";
import { DictionaryEntry } from "../../types/DictionaryEntry";
import { AppState } from "reducer";
import { dictionarySlice } from "./reducer";

export interface ListPageProps {}

export function ListPage(props: ListPageProps) {
  const history = useHistory();
  const dispatch = useDispatch();
  const columns: ColumnsType<DictionaryEntry> = [
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
              dispatch(dictionarySlice.actions.delete(record));
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
  const items = useSelector<AppState, DictionaryEntry[]>((s) =>
    sort((a, b) => (b.id ?? 0) - (a.id ?? 0), s.dictionary)
  );
  return (
    <>
      <Table columns={columns} dataSource={items} size="middle" rowKey="id" />
    </>
  );
}
