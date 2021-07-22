import { useEffect, useState } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import styled from "styled-components";
import { Answer } from "./utils";
import { DictionaryEntry, RecordPage } from "./RecordPage";
import { ListPage } from "./ListPage";
import { PracticePage } from "./PracticePage";

const VOCABULARY_KEY = "vocabulary";

const StyledApp = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-size: calc(10px + 2vmin);
  color: white;
`;

export function App() {
  const [items, setItems] = useState<DictionaryEntry[]>([]);

  useEffect(() => {
    const json = localStorage.getItem(VOCABULARY_KEY);
    if (!json) return;
    setItems(JSON.parse(json));
  }, []);

  useEffect(() => {
    localStorage.setItem(VOCABULARY_KEY, JSON.stringify(items));
  }, [items]);

  const handleAddRecord = (item: DictionaryEntry) =>
    setItems([{ id: Date.now(), ...item }, ...items]);

  const handleEditRecord = (item: DictionaryEntry) => {
    const index = items.findIndex((p) => p.id === item.id);
    const newItems = [...items];
    newItems[index] = item;
    setItems(newItems);
  };

  const handleDeleteRecord = (item: DictionaryEntry) => {
    setItems(items.filter((p) => p.id !== item.id));
  };

  const handleAnswer = ({ isCorrect, entity }: Answer<DictionaryEntry>) => {
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
    <StyledApp className="bg-dark">
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
    </StyledApp>
  );
}
