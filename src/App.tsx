import { useEffect, useState } from "react";
import "./App.css";
import { HashRouter, Route, Switch } from "react-router-dom";
import { Answer } from "./utils";
import { Record, RecordPage } from "./RecordPage";
import { ListPage } from "./ListPage";
import { PracticePage } from "./PracticePage";

const VOCABULARY_KEY = "vocabulary";

export function App() {
  const [items, setItems] = useState<Record[]>([]);

  useEffect(() => {
    const json = localStorage.getItem(VOCABULARY_KEY);
    if (!json) return;
    setItems(JSON.parse(json));
  }, []);

  useEffect(() => {
    localStorage.setItem(VOCABULARY_KEY, JSON.stringify(items));
  }, [items]);

  const handleAddRecord = (item: Record) =>
    setItems([{ id: Date.now(), ...item }, ...items]);

  const handleEditRecord = (item: Record) => {
    const index = items.findIndex((p) => p.id === item.id);
    const newItems = [...items];
    newItems[index] = item;
    setItems(newItems);
  };

  const handleDeleteRecord = (item: Record) => {
    setItems(items.filter((p) => p.id !== item.id));
  };

  const handleAnswer = ({ isCorrect, entity }: Answer<Record>) => {
    const index = items.findIndex((p) => p.id === entity.id);
    const newItems = [...items];
    const oldRecord = newItems[index];
    newItems[index] = {
      ...oldRecord,
      answersCount: oldRecord.answersCount + 1,
      correctAnswersCount: oldRecord.correctAnswersCount + (isCorrect ? 1 : 0),
    };
    setItems(newItems);
  };

  return (
    <div className="App">
      <HashRouter>
        <Switch>
          <Route path="/add">
            <RecordPage records={items} onConfirm={handleAddRecord} />
          </Route>
          <Route path="/edit/:id">
            <RecordPage records={items} onConfirm={handleEditRecord} />
          </Route>
          <Route path="/practice">
            <PracticePage records={items} onAnswer={handleAnswer} />
          </Route>
          <Route path="/">
            <ListPage items={items} onDelete={handleDeleteRecord} />
          </Route>
        </Switch>
      </HashRouter>
    </div>
  );
}
