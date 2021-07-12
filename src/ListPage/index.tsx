import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Tooltip } from "antd";
import Table, { ColumnsType } from "antd/lib/table";
import { useHistory } from "react-router-dom";
import { Record } from "../RecordPage";

export interface ListPageProps {
  items: Record[];
  onDelete?: (r: Record) => void;
}

export function ListPage({ items, onDelete }: ListPageProps) {
  const history = useHistory();
  const columns: ColumnsType<Record> = [
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
        <Button type="primary" onClick={() => history.push("/add")}>
          <PlusOutlined />
        </Button>
      ),
      render: (_, record) => (
        <>
          <Button onClick={() => history.push("/edit", record)}>
            <EditOutlined />
          </Button>
          <Popconfirm
            title="Are you sure to delete this?"
            onConfirm={() => onDelete && onDelete(record)}
          >
            <Button>
              <DeleteOutlined />
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];
  return (
    <>
      <Button block type="primary" onClick={() => history.push("/practice")}>
        Practice
      </Button>
      <Table columns={columns} dataSource={items} size="middle" rowKey="id" />
    </>
  );
}
