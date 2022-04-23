import { useRequest } from 'ahooks';
import { Select, Switch } from 'antd';
import { Button } from 'components/Button';
import { SpinnerBox } from 'components/SpinnerBox';
import { useState, FC } from 'react';
import { useDispatch } from 'react-redux';
import { prepareSessionQueue } from '../api/prepareSessionQueue';
import { ScoreAlgorithm } from '../constants';
import { Config, sessionSlice } from '../reducer';

export const Configuration: FC = () => {
  const dispatch = useDispatch();

  const [config, setConfig] = useState<Config>({
    scoreAlgorithm: ScoreAlgorithm.relative,
    playAfterReveal: false,
    ignoreScoreOfNewTerms: false,
  });

  const { loading, runAsync: runPrepareSessionQueue } = useRequest(prepareSessionQueue, { manual: true });

  const handleStartSessionButtonClick = async () => {
    try {
      const queue = await runPrepareSessionQueue(config);
      dispatch(sessionSlice.actions.start({ config, queue }));
    } catch (e) {
      console.error(e);
    }
  };

  const update = (newConfig: Partial<Config>) => setConfig(prevConfig => ({ ...prevConfig, ...newConfig }));

  if (loading) return <SpinnerBox>Preparing practice session queue ...</SpinnerBox>;

  const { scoreAlgorithm, playAfterReveal, ignoreScoreOfNewTerms } = config;
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
      <Switch
        checked={ignoreScoreOfNewTerms}
        checkedChildren="Score will ignore for new terms"
        unCheckedChildren="Score won't ignore for new terms"
        onChange={checked => update({ ignoreScoreOfNewTerms: checked })}
      />
      <Button onClick={handleStartSessionButtonClick}>Start session</Button>
    </>
  );
};
