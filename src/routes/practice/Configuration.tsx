import { Select, Switch } from "antd";
import { Button } from "components/Button";
import { useTypedSelector } from "hooks/useTypedSelector";
import { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { selectAll } from "routes/list/adapters";
import { Term } from "types/Term";
import { Config, ScoreAlgorithm, sessionSlice } from "./reducer";

export interface ConfigurationProps {}

export const Configuration: FC<ConfigurationProps> = () => {
  const [config, setConfig] = useState<Config>({
    scoreAlgorithm: ScoreAlgorithm.relative,
    playAfterReveal: false,
  });

  const dispatch = useDispatch();

  const terms = useTypedSelector<Term[]>(selectAll);

  const handleStartSessionButtonClick = () => {
    dispatch(sessionSlice.actions.start(config, terms));
  };

  const update = (config: Partial<Config>) =>
    setConfig((c) => ({ ...c, ...config }));

  const { scoreAlgorithm, playAfterReveal } = config;
  return (
    <>
      <Select
        value={scoreAlgorithm}
        options={[
          { value: ScoreAlgorithm.relative, label: "relative" },
          { value: ScoreAlgorithm.absolute, label: "absolute" },
        ]}
        onSelect={(_, option) => update({ scoreAlgorithm: option.value })}
      />
      <Switch
        checked={playAfterReveal}
        checkedChildren={"Play word after reveal"}
        unCheckedChildren={"Play word after reveal"}
        onChange={(checked) => update({ playAfterReveal: checked })}
      />
      <Button onClick={handleStartSessionButtonClick}>Start session</Button>
    </>
  );
};
