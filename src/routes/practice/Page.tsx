import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { Button } from "components/Button";
import { PracticeSession } from "./PracticeSession";
import { useState } from "react";
import { Config, Configuration } from "./Configuration";

const Layout = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export interface PracticePageProps {}

export function PracticePage(props: PracticePageProps) {
  const [config, setConfig] = useState<Config>();
  const history = useHistory();
  return (
    <Layout>
      {config ? (
        <PracticeSession config={config} />
      ) : (
        <Configuration onConfirm={setConfig} />
      )}
      <Button onClick={() => history.push("/")}>End practice</Button>
    </Layout>
  );
}
