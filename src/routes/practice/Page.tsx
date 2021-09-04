import styled from "styled-components";
import { PracticeSession } from "./PracticeSession";
import { Configuration } from "./Configuration";
import { useTypedSelector } from "hooks/useTypedSelector";

const Layout = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export interface PracticePageProps {}

export function PracticePage(props: PracticePageProps) {
  const isActive = useTypedSelector((s) => s.practice.session.isActive);

  return <Layout>{isActive ? <PracticeSession /> : <Configuration />}</Layout>;
}
