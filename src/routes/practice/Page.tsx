import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { Button } from "components/Button";
import { PracticeSession } from "./PracticeSession";

const Layout = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export interface PracticePageProps {}

export function PracticePage(props: PracticePageProps) {
  const history = useHistory();
  return (
    <Layout>
      <PracticeSession />
      <Button onClick={() => history.push("/")}>End practice</Button>
    </Layout>
  );
}
