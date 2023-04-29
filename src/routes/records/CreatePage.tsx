import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { SpinnerBox } from 'components/SpinnerBox';
import { useServices } from 'services';
import { useMutation } from '@tanstack/react-query';
import { Form, FormProps } from './components/Form';

export default (() => {
  const navigate = useNavigate();
  const { termsRepository } = useServices();

  const {
    mutateAsync: create,
    status,
    error,
  } = useMutation(termsRepository.create.bind(termsRepository), {
    onError: e => console.error(e),
  });

  const navigateBack = () => {
    navigate('/records');
  };

  const handleSubmit: FormProps['onSubmit'] = values => {
    create(values).then(navigateBack).catch(console.error);
  };

  const handleCancel = () => navigateBack();

  switch (status) {
    case 'loading':
      return <SpinnerBox label="Creating ..." />;
    case 'error':
      return <p>Error: {error instanceof Error ? error.message : 'Unknown'}</p>;
    case 'success':
      return <p>{status}</p>;
    case 'idle':
      return <Form onCancel={handleCancel} onSubmit={handleSubmit} />;
    default:
      return <p>Unknown status: {status}</p>;
  }
}) satisfies FC;
