import { FC, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../components/Button";
import { DictionaryEntry } from "../RecordPage";
import { AppState, dictionarySlice } from "../reducer";
import { StyledAnswerButton } from "./AnswerButton";
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

const ButtonsGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

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

export interface PracticePageProps {}

export function PracticePage(props: PracticePageProps) {
  const [knowledge, setKnowledge] = useState<Knowledge>();

  const history = useHistory();
  return (
    <>
      {knowledge === undefined ? (
        <KnowledgeSelection onSelect={setKnowledge} />
      ) : (
        <PracticeSession knowledge={knowledge} {...props} />
      )}
      <div>
        <hr />
      </div>
      <Button onClick={() => history.push("/")}>End practice</Button>
    </>
  );
}

interface KnowledgeSelectionProps {
  onSelect?: (k: Knowledge) => void;
}

const KnowledgeSelection: FC<KnowledgeSelectionProps> = ({ onSelect }) => (
  <ButtonsGrid>
    {[Knowledge.definition, Knowledge.translation].map((knowledge) => (
      <Button key={knowledge} onClick={() => onSelect && onSelect(knowledge)}>
        {Knowledge[knowledge]}
      </Button>
    ))}
  </ButtonsGrid>
);

interface PracticeSessionProps extends PracticePageProps {
  knowledge: Knowledge;
}

interface Progress {
  stack: DictionaryEntry[];
  actualRecord?: DictionaryEntry;
  actualAnswersSet: Answer<DictionaryEntry>[];
}

const PracticeSession: FC<PracticeSessionProps> = ({ knowledge }) => {
  const records = useSelector<AppState, DictionaryEntry[]>((s) => s);

  const filteredRecords = useMemo(
    () => records.filter(FILTERS[knowledge]),
    [records, knowledge]
  );

  const [progress, setProgress] = useState<Progress>(() => {
    const stack = sortImmutable(filteredRecords, answersComparer);

    const actualRecord = stack.pop();

    const actualAnswersSet = actualRecord
      ? prepareAnswersSet(actualRecord, filteredRecords)
      : [];

    return { stack, actualRecord, actualAnswersSet };
  });

  const [actualAnswer, setAnswer] = useState<Answer<DictionaryEntry>>();

  const dispatch = useDispatch();
  const handleAnswerClick = (answer: Answer<DictionaryEntry>) => {
    setAnswer(answer);
    if (progress?.actualRecord)
      dispatch(
        dictionarySlice.actions.answer({
          isCorrect: answer.isCorrect,
          entity: progress.actualRecord,
        })
      );
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

  return (
    <>
      {progress?.actualRecord && (
        <div style={{ textAlign: "center" }}>
          {progress.actualRecord.word} (
          <i>{progress.actualRecord.partOfSpeech}</i>)
        </div>
      )}
      <ButtonsGrid>
        {progress?.actualAnswersSet.map((answer) => (
          <StyledAnswerButton
            key={answer.entity.id}
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
          </StyledAnswerButton>
        ))}
      </ButtonsGrid>
      {actualAnswer && (
        <>
          <div>
            <hr />
          </div>
          <Button onClick={handleNextClick}>Next word</Button>
        </>
      )}
    </>
  );
};
