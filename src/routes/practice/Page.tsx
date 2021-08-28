import styled from "styled-components";
import { PracticeSession } from "./PracticeSession";
import { Configuration } from "./Configuration";
import { useTypedSelector } from "hooks/useTypedSelector";
import { useDispatch } from "react-redux";
import { Button } from "components/Button";
import { sessionSlice } from "./reducer";

const Layout = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export interface PracticePageProps {}

export function PracticePage(props: PracticePageProps) {
  const isActive = useTypedSelector((s) => s.practice.session.isActive);

  const dispatch = useDispatch();

  const handleEndSessionButtonClick = () => {
    dispatch(sessionSlice.actions.close());
  };

  return (
    <Layout>
      {isActive ? <PracticeSession /> : <Configuration />}
      <Button onClick={handleEndSessionButtonClick}>End session</Button>
    </Layout>
  );
}
