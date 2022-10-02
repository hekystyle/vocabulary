import { ButtonProps, Radio, Switch } from 'antd';
import { Button } from 'components/Button';
import { SpinnerBox } from 'components/SpinnerBox';
import { useState, FC } from 'react';
import { useMutation } from 'react-query';
import { useServices } from 'containers/Services';
import { useSetRecoilState } from 'recoil';
import { prepareSessionQueue } from '../api/prepareSessionQueue';
import { isScoreAlgorithm, ScoreAlgorithm } from '../constants';
import { Config, sessionState } from '../store';

export const Configuration: FC = () => {
  const { db } = useServices();
  const setSession = useSetRecoilState(sessionState);

  const [config, setConfig] = useState<Config>({
    scoreAlgorithm: ScoreAlgorithm.Relative,
    playAfterReveal: false,
    ignoreScoreOfNewTerms: false,
  });

  const { isLoading: loading, mutateAsync: runPrepareSessionQueue } = useMutation(prepareSessionQueue(db), {
    onError: console.error,
  });

  const handleStartSessionButtonClick: ButtonProps['onClick'] = () => {
    runPrepareSessionQueue(config)
      .then(queue => setSession({ config, queue, isActive: true, isRevealed: false }))
      .catch(console.error);
  };

  const update = (newConfig: Partial<Config>) => setConfig(prevConfig => ({ ...prevConfig, ...newConfig }));

  if (loading) return <SpinnerBox>Preparing practice session queue ...</SpinnerBox>;

  const { scoreAlgorithm, playAfterReveal, ignoreScoreOfNewTerms } = config;
  return (
    <>
      <Radio.Group
        buttonStyle="solid"
        name="scoreAlgorithm"
        optionType="button"
        options={Object.values(ScoreAlgorithm).map(value => ({
          label: value,
          value,
          style: { flexGrow: 1, textAlign: 'center' },
        }))}
        style={{ display: 'flex' }}
        value={scoreAlgorithm}
        onChange={({ target: { value } }) => update({ scoreAlgorithm: isScoreAlgorithm(value) ? value : undefined })}
      />
      <Switch
        checked={playAfterReveal}
        checkedChildren="Play word after reveal"
        unCheckedChildren="Play word after reveal"
        onChange={checked => update({ playAfterReveal: checked })}
      />
      <Switch
        checked={ignoreScoreOfNewTerms}
        checkedChildren="Ignore score for items with less then 11 answers"
        unCheckedChildren="Don't ignore score for items with less then 11 answers"
        onChange={checked => update({ ignoreScoreOfNewTerms: checked })}
      />
      <Button onClick={handleStartSessionButtonClick}>Start session</Button>
    </>
  );
};
