import { ButtonProps, Select, Switch } from 'antd';
import { Button } from 'components/Button';
import { SpinnerBox } from 'components/SpinnerBox';
import { useState, FC } from 'react';
import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';
import { useServices } from 'services/di';
import { prepareSessionQueue } from '../api/prepareSessionQueue';
import { ScoreAlgorithm } from '../constants';
import { Config, sessionSlice } from '../reducer';

export const Configuration: FC = () => {
  const dispatch = useDispatch();
  const { db } = useServices();

  const [config, setConfig] = useState<Config>({
    scoreAlgorithm: ScoreAlgorithm.relative,
    playAfterReveal: false,
    ignoreScoreOfNewTerms: false,
  });

  const { isLoading: loading, mutateAsync: runPrepareSessionQueue } = useMutation(prepareSessionQueue(db), {
    onError: e => console.error(e),
  });

  const handleStartSessionButtonClick: ButtonProps['onClick'] = () => {
    runPrepareSessionQueue(config)
      .then(queue => dispatch(sessionSlice.actions.start({ config, queue })))
      .catch(console.error);
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
