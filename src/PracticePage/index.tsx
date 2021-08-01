import { FC, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { CardBody } from "../components/CardBody";
import { DictionaryEntry } from "../RecordPage";
import { AppState, dictionarySlice } from "../reducer";
import {
  answersComparer,
  Definable,
  hasDefinition,
  hasTranslation,
  sortImmutable,
  Translateable,
} from "../utils";

const Layout = styled.div`
  height: 100%;
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
    <Layout>
      {knowledge === undefined ? (
        <KnowledgeSelection onSelect={setKnowledge} />
      ) : (
        <PracticeSession knowledge={knowledge} {...props} />
      )}
      <Button onClick={() => history.push("/")}>End practice</Button>
    </Layout>
  );
}

interface KnowledgeSelectionProps {
  onSelect?: (k: Knowledge) => void;
}

const KnowledgeSelection: FC<KnowledgeSelectionProps> = ({ onSelect }) => (
  <>
    {[Knowledge.definition, Knowledge.translation].map((knowledge) => (
      <Button key={knowledge} onClick={() => onSelect && onSelect(knowledge)}>
        {Knowledge[knowledge]}
      </Button>
    ))}
  </>
);

interface PracticeSessionProps extends PracticePageProps {
  knowledge: Knowledge;
}

interface Progress {
  stack: DictionaryEntry[];
  actualRecord?: DictionaryEntry;
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

    return { stack, actualRecord };
  });

  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);

  const handleRevealAnswer = () => setIsAnswerRevealed(true);

  const dispatch = useDispatch();
  const handleAnswerButtonClick = (isCorrect: boolean) => {
    if (progress?.actualRecord)
      dispatch(
        dictionarySlice.actions.answer({
          isCorrect,
          entity: progress.actualRecord,
        })
      );
    setIsAnswerRevealed(false);
    setProgress((state) => {
      const stack = [...(state?.stack ?? [])];

      const actualRecord = stack.pop();

      return { stack, actualRecord };
    });
  };

  if (!progress.actualRecord) return null;
  return (
    <>
      <Card>
        <CardBody className="text-center">
          <div>{SELECTORS[knowledge](progress.actualRecord)}</div>
          <div>
            (<i>{progress.actualRecord.partOfSpeech}</i>)
          </div>
        </CardBody>
      </Card>
      <Card>
        <CardBody className="text-center">
          {isAnswerRevealed ? progress.actualRecord.word : "?"}
        </CardBody>
      </Card>
      {!isAnswerRevealed ? (
        <Button onClick={handleRevealAnswer}>Reveal answer</Button>
      ) : (
        <>
          <Button theme="success" onClick={() => handleAnswerButtonClick(true)}>
            Correct
          </Button>
          <Button theme="danger" onClick={() => handleAnswerButtonClick(false)}>
            Incorrect
          </Button>
        </>
      )}
    </>
  );
};
