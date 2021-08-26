import { Select, Switch } from "antd";
import { Button } from "components/Button";
import { FC, useState } from "react";

export enum ScoreAlgorithm {
  relative,
  absolute,
}

export interface Config {
  scoreAlgorithm: ScoreAlgorithm;
  playAfterReveal: boolean;
}

export interface ConfigurationProps {
  onConfirm?: (config: Config) => void;
}

export const Configuration: FC<ConfigurationProps> = ({ onConfirm }) => {
  const [algorithm, setAlgorithm] = useState<ScoreAlgorithm>(
    ScoreAlgorithm.relative
  );
  const [playAfterReveal, setPlayAfterReveal] = useState(false);

  const handleConfirm = () =>
    onConfirm &&
    onConfirm({
      scoreAlgorithm: algorithm,
      playAfterReveal: playAfterReveal,
    });

  return (
    <>
      <Select
        value={algorithm}
        options={[
          { value: ScoreAlgorithm.relative, label: "relative" },
          { value: ScoreAlgorithm.absolute, label: "absolute" },
        ]}
        onSelect={(_, option) => setAlgorithm(option.value)}
      />
      <Switch
        checked={playAfterReveal}
        checkedChildren={"Play word after reveal"}
        unCheckedChildren={"Play word after reveal"}
        onChange={(checked) => setPlayAfterReveal(checked)}
      />
      <Button onClick={handleConfirm}>Start session</Button>
    </>
  );
};
