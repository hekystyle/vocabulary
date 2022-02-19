import { Select, Switch } from 'antd';
import { Button } from 'components/Button';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { useState, VFC } from 'react';
import { useDispatch } from 'react-redux';
import { selectAll } from 'routes/list/adapters';
import { ScoreAlgorithm } from '../constants';
import { Config, sessionSlice } from '../reducer';

export const Configuration: VFC = () => {
  const dispatch = useDispatch();

  const [config, setConfig] = useState<Config>({
    scoreAlgorithm: ScoreAlgorithm.relative,
    playAfterReveal: false,
  });

  const terms = useTypedSelector(selectAll);

  const handleStartSessionButtonClick = () => {
    dispatch(sessionSlice.actions.start(config, terms));
  };

  const update = (newConfig: Partial<Config>) => setConfig(c => ({ ...c, ...newConfig }));

  const { scoreAlgorithm, playAfterReveal } = config;
  return (
    <>
      <Select
        options={[
          { value: ScoreAlgorithm.relative, label: 'relative' },
          { value: ScoreAlgorithm.absolute, label: 'absolute' },
        ]}
        value={scoreAlgorithm}
        onSelect={(_: unknown, option: { value: ScoreAlgorithm }) => update({ scoreAlgorithm: option.value })}
      />
      <Switch
        checked={playAfterReveal}
        checkedChildren="Play word after reveal"
        unCheckedChildren="Play word after reveal"
        onChange={checked => update({ playAfterReveal: checked })}
      />
      <Button onClick={handleStartSessionButtonClick}>Start session</Button>
    </>
  );
};
