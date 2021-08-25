import { Select, Switch } from "antd";
import { Button } from "components/Button";
import { FC, useState } from "react";

export enum ScoreAlgorithm {
  relative,
  absolute,
}

export interface Config {
  scoreAlgorithm: ScoreAlgorithm;
  speakAfterReveal: boolean;
}

export interface ConfigurationProps {
  onConfirm?: (config: Config) => void;
}

export const Configuration: FC<ConfigurationProps> = ({ onConfirm }) => {
  const [algorithm, setAlgorithm] = useState<ScoreAlgorithm>(
    ScoreAlgorithm.relative
  );
  const [speakAfterReveal, setSpeakAfterReveal] = useState(false);

  const handleConfirm = () =>
    onConfirm &&
    onConfirm({
      scoreAlgorithm: algorithm,
      speakAfterReveal: speakAfterReveal,
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
        checked={speakAfterReveal}
        checkedChildren={"Speak after reveal"}
        unCheckedChildren={"Speak after reveal"}
        onChange={(checked) => setSpeakAfterReveal(checked)}
      />
      <Button onClick={handleConfirm}>Start session</Button>
    </>
  );
};
