import { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { Button } from "components/Button";
import { Knowledge } from "./constants";
import { KnowledgeSelection } from "./KnowledgeSelection";
import { PracticeSession } from "./PracticeSession";

const Layout = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

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

