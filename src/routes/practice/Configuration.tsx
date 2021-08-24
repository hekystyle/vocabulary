import { Select } from "antd";
import { Button } from "components/Button";
import { FC, useState } from "react";

export enum ScoreAlgorithm {
  relative,
  absolute,
}

export interface Config {
  scoreAlgorithm: ScoreAlgorithm;
}

export interface ConfigurationProps {
  onConfirm?: (config: Config) => void;
}

export const Configuration: FC<ConfigurationProps> = ({ onConfirm }) => {
  const [algorithm, setAlgorithm] = useState<ScoreAlgorithm>(
    ScoreAlgorithm.relative
  );

  const handleConfirm = () =>
    onConfirm && onConfirm({ scoreAlgorithm: algorithm });

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
      <Button onClick={handleConfirm}>Start session</Button>
    </>
  );
};
