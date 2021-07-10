import { useEffect, useState } from "react";
import { Button, Input, Popconfirm, Table } from "antd";
import "./App.css";
import {
  BrowserRouter,
  Route,
  Switch,
  useHistory,
  useLocation,
} from "react-router-dom";
import { ColumnsType } from "antd/lib/table";

type ApiResult = Word[];

interface Word {
  meanings: Meaning[];
}

interface Meaning {
  partOfSpeech: string;
  definitions: Definition[];
}

interface Definition {
  definition: string;
}

interface DefinitionsProps {
  word: string;
  onDefinitionClick?: (value: {
    partOfSpeech: string;
    definition: string;
  }) => void;
}

function Definitions(props: DefinitionsProps) {
  const { word, onDefinitionClick } = props;
  const [entry, setEntry] = useState<Word | undefined>();

  useEffect(() => {
    if (word === "") {
      setEntry(undefined);
      return;
    }
    const controller = new AbortController();
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en_US/${word}`, {
      signal: controller.signal,
    })
      .then((response) => response.json())
      .then((result: ApiResult) => {
        setEntry(result[0]);
      })
      .catch((reason) => console.error(reason));

    return () => controller.abort();
  }, [word]);

  return (
    <ul>
      {entry?.meanings.map((meaning, i) => (
        <li key={i}>
          {meaning.partOfSpeech}
          <ul>
            {meaning.definitions.map((definition, j) => (
              <li
                key={j}
                onClick={() =>
                  onDefinitionClick &&
                  onDefinitionClick({
                    partOfSpeech: meaning.partOfSpeech,
                    definition: definition.definition,
                  })
                }
              >
                {definition.definition}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}

interface Record {
  id?: number;
  word: string;
  partOfSpeech: string;
  translation: string;
  definition: string;
}

function RecordPage({ onConfirm }: { onConfirm?: (r: Record) => void }) {
  const { state } = useLocation<Record | undefined>();

  const [entry, setEntry] = useState<Record>({
    word: "",
    partOfSpeech: "",
    translation: "",
    definition: "",
    ...(state ?? {}),
  });

  const history = useHistory();
  const handleConfirm = () => {
    onConfirm && onConfirm(entry);
    history.push("/");
  };

  return (
    <>
      <Button type="primary" onClick={handleConfirm}>
        Confirm
      </Button>
      <Input
        placeholder="Word"
        value={entry.word}
        onChange={(e) => setEntry({ ...entry, word: e.target.value })}
      />
      <Input
        placeholder="Pard ot speech"
        value={entry.partOfSpeech}
        onChange={(e) => setEntry({ ...entry, partOfSpeech: e.target.value })}
      />
      <Input
        placeholder="Translation"
        value={entry.translation}
        onChange={(e) => setEntry({ ...entry, translation: e.target.value })}
      />
      <Input.TextArea
        placeholder="Definition"
        value={entry.definition}
        onChange={(e) => setEntry({ ...entry, definition: e.target.value })}
      />
      <Definitions
        word={entry.word}
        onDefinitionClick={(value) => setEntry({ ...entry, ...value })}
      />
    </>
  );
}

interface ListPageProps {
  items: Record[];
  onDelete?: (r: Record) => void;
}

function ListPage({ items, onDelete }: ListPageProps) {
  const history = useHistory();
  const columns: ColumnsType<Record> = [
    {
      title: "Word",
      dataIndex: "word",
      ellipsis: true,
    },
    {
      title: () => (
        <Button type="primary" onClick={() => history.push("/add")}>
          Add
        </Button>
      ),
      render: (_, record) => (
        <>
          <Button onClick={() => history.push("/edit", record)}>Edit</Button>
          <Popconfirm
            title="Are you sure to delete this?"
            onConfirm={() => onDelete && onDelete(record)}
          >
            <Button>Delete</Button>
          </Popconfirm>
        </>
      ),
    },
  ];
  return (
    <>
      <Table columns={columns} dataSource={items} size="middle" rowKey="id" />
    </>
  );
}

const VOCABULARY_KEY = "vocabulary";

function App() {
  const [items, setItems] = useState<Record[]>([]);

  useEffect(() => {
    const json = localStorage.getItem(VOCABULARY_KEY);
    if (!json) return;
    setItems(JSON.parse(json));
  }, []);

  useEffect(() => {
    localStorage.setItem(VOCABULARY_KEY, JSON.stringify(items));
  }, [items]);

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/add">
            <RecordPage
              onConfirm={(item) =>
                setItems([{ id: Date.now(), ...item }, ...items])
              }
            />
          </Route>
          <Route path="/edit">
            <RecordPage
              onConfirm={(item) => {
                const index = items.findIndex((p) => p.id === item.id);
                const newItems = [...items];
                newItems[index] = item;
                setItems(newItems);
              }}
            />
          </Route>
          <Route path="/">
            <ListPage
              items={items}
              onDelete={(record) =>
                setItems(items.filter((p) => p.id !== record.id))
              }
            />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
