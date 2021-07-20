import { useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "../components/Button";
import { DictionaryEntry } from "../RecordPage";
import {
  Answer,
  answersComparer,
  Definable,
  hasDefinition,
  hasTranslation,
  prepareAnswersSet,
  sortImmutable,
  Translateable,
} from "../utils";
import "./index.css";

export enum Knowledge {
  translation,
  definition,
}

const FILTERS = {
  [Knowledge.definition]: hasDefinition,
  [Knowledge.translation]: hasTranslation,
};

const SELECTORS = {
  [Knowledge.definition]: (d: Definable) => d.definition,
  [Knowledge.translation]: (t: Translateable) => t.translation,
};

interface Progress {
  stack: DictionaryEntry[];
  actualRecord?: DictionaryEntry;
  actualAnswersSet: Answer<DictionaryEntry>[];
}

export interface PracticePageProps {
  records: DictionaryEntry[];
  onAnswer?: (a: Answer<DictionaryEntry>) => void;
}

export function PracticePage({ records, onAnswer }: PracticePageProps) {
  const [knowledge, setKnowledge] = useState<Knowledge>();

  const filteredRecords = useMemo(
    () =>
      knowledge === undefined ? undefined : records.filter(FILTERS[knowledge]),
    [records, knowledge]
  );

  const [progress, setProgress] = useState<Progress>();
  useEffect(() => {
    if (progress) return;
    if (!filteredRecords) return;

    const stack = sortImmutable(filteredRecords, answersComparer);

    const actualRecord = stack.pop();

    const actualAnswersSet = actualRecord
      ? prepareAnswersSet(actualRecord, filteredRecords)
      : [];

    setProgress({ stack, actualRecord, actualAnswersSet });
  }, [filteredRecords, progress]);

  const [actualAnswer, setAnswer] = useState<Answer<DictionaryEntry>>();

  const handleAnswerClick = (answer: Answer<DictionaryEntry>) => {
    setAnswer(answer);
    if (onAnswer && progress?.actualRecord)
      onAnswer({ isCorrect: answer.isCorrect, entity: progress.actualRecord });
  };

  const handleNextClick = () => {
    setProgress((state) => {
      const stack = [...(state?.stack ?? [])];

      const actualRecord = stack.pop();

      const actualAnswersSet = actualRecord
        ? prepareAnswersSet(actualRecord, filteredRecords ?? [])
        : [];

      return { stack, actualRecord, actualAnswersSet };
    });
    setAnswer(undefined);
  };

  const history = useHistory();

  if (knowledge === undefined)
    return (
      <>
        {[Knowledge.definition, Knowledge.translation].map((knowledge) => (
          <Button key={knowledge} onClick={() => setKnowledge(knowledge)}>
            {Knowledge[knowledge]}
          </Button>
        ))}
      </>
    );

  return (
    <>
      {progress?.actualRecord && (
        <div style={{ textAlign: "center" }}>
          {progress.actualRecord.word} (
          <i>{progress.actualRecord.partOfSpeech}</i>)
        </div>
      )}
      <div className="ButtonsGrid">
        {progress?.actualAnswersSet.map((answer) => (
          <Button
            key={answer.entity.id}
            className="AnswerButton"
            disabled={Boolean(actualAnswer)}
            onClick={() => handleAnswerClick(answer)}
            theme={
              answer.isCorrect && actualAnswer
                ? "success"
                : !answer.isCorrect && answer === actualAnswer
                ? "danger"
                : "secondary"
            }
          >
            {SELECTORS[knowledge](answer.entity)}
          </Button>
        ))}
      </div>

      {actualAnswer && (
        <>
          <div>
            <hr />
          </div>
          <Button onClick={handleNextClick}>Next word</Button>
        </>
      )}
      <div>
        <hr />
      </div>
      <Button onClick={() => history.push("/")}>End practice</Button>
    </>
  );
}
