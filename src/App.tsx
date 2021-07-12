import { useEffect, useState } from "react";
import { Button, Input, Popconfirm, Table, Tooltip } from "antd";
import "./App.css";
import {
  HashRouter,
  Route,
  Switch,
  useHistory,
  useLocation,
} from "react-router-dom";
import { ColumnsType } from "antd/lib/table";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Answer,
  answersComparer,
  AnswersCountable,
  prepareAnswersSet,
  sortImmutable,
} from "./utils";
import { ApiResult, Word } from "./types";

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

interface Record extends AnswersCountable {
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
    answersCount: 0,
    correctAnswersCount: 0,
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

interface PracticePageProps {
  records: Record[];
  onAnswer?: (a: Answer<Record>) => void;
}

function PracticePage({ records, onAnswer }: PracticePageProps) {
  const [state, setState] = useState(() => {
    const stack = [...records];

    const actualRecord = stack.pop();

    const actualAnswersSet = actualRecord
      ? prepareAnswersSet(actualRecord, records)
      : [];

    return { stack, actualRecord, actualAnswersSet };
  });
  const [actualAnswer, setAnswer] = useState<Answer<Record>>();

  const handleAnswerClick = (answer: Answer<Record>) => {
    if (actualAnswer) return;
    setAnswer(answer);
    if (onAnswer && state.actualRecord)
      onAnswer({ isCorrect: answer.isCorrect, entity: state.actualRecord });
  };

  const handleNextClick = () => {
    setState((state) => {
      const stack = [...state.stack];

      const actualRecord = stack.pop();

      const actualAnswersSet = actualRecord
        ? prepareAnswersSet(actualRecord, records)
        : [];

      return { stack, actualRecord, actualAnswersSet };
    });
    setAnswer(undefined);
  };

  const history = useHistory();
  return (
    <>
      {state.actualRecord && (
        <div style={{ textAlign: "center" }}>
          {state.actualRecord.word} (<i>{state.actualRecord.partOfSpeech}</i>)
        </div>
      )}
      {state.actualAnswersSet.map((answer) => (
        <button
          key={answer.entity.id}
          disabled={Boolean(actualAnswer)}
          onClick={() => handleAnswerClick(answer)}
          style={{
            backgroundColor:
              answer.isCorrect && actualAnswer
                ? "green"
                : !answer.isCorrect && answer === actualAnswer
                ? "red"
                : undefined,
          }}
        >
          {answer.entity?.definition}
        </button>
      ))}

      {actualAnswer && (
        <>
          <div>
            <hr />
          </div>
          <button onClick={handleNextClick}>Next</button>
        </>
      )}
      <div>
        <hr />
      </div>
      <button onClick={() => history.push("/")}>End</button>
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
      <HashRouter>
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
          <Route path="/practice">
            <PracticePage
              records={sortImmutable(items, answersComparer)}
              onAnswer={({ entity, isCorrect }) => {
                const index = items.findIndex((p) => p.id === entity.id);
                const newItems = [...items];
                const oldRecord = newItems[index];
                newItems[index] = {
                  ...oldRecord,
                  answersCount: oldRecord.answersCount + 1,
                  correctAnswersCount:
                    oldRecord.correctAnswersCount + (isCorrect ? 1 : 0),
                };
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
      </HashRouter>
    </div>
  );
}

export default App;
