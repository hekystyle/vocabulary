import { FC } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { isObject } from 'utils/isObject';
import { SpinnerBox } from 'components/SpinnerBox';
import { useServices } from 'services';
import { useIsMutating, useMutation, useQuery } from 'react-query';
import { QUERY_KEYS } from 'utils/queryKeys';
import { hasReturnUrlField } from './utils/hasReturnUrlField';
import { Form, FormProps } from './components/Form';

export default (() => {
  const navigate = useNavigate();
  const location = useLocation();
  const { termsRepository } = useServices();
  const { id: serializedId } = useParams<{ id?: string }>();
  const id = serializedId ? parseInt(serializedId, 10) : NaN;
  const isUpdating = useIsMutating(QUERY_KEYS.terms.id(id));

  const {
    isFetching,
    error,
    data: term,
    status,
  } = useQuery(QUERY_KEYS.terms.id(id), async ({ signal }) => await termsRepository.getById(id, signal), {
    enabled: !Number.isNaN(id),
    onError: e => console.error(e),
  });

  const { mutateAsync: update } = useMutation(QUERY_KEYS.terms.id(id), termsRepository.update.bind(termsRepository), {
    onError: e => console.error(e),
  });

  const navigateBack = () => {
    if (isObject(location.state) && hasReturnUrlField(location.state)) {
      navigate(location.state.returnUrl);
    } else {
      navigate('/records');
    }
  };

  const handleSubmit: FormProps['onSubmit'] = values => {
    update(values).then(navigateBack).catch(console.error);
  };

  const handleCancel = () => navigateBack();

  if (isUpdating) return <SpinnerBox label="Updating ..." />;
  if (isFetching) return <SpinnerBox label="Loading ..." />;

  switch (status) {
    case 'idle':
      return <p>Idle</p>;
    case 'loading':
      return <SpinnerBox label="Loading ..." />;
    case 'error':
      return <p>Error: {error instanceof Error ? error.message : 'Unknown'}</p>;
    case 'success':
      if (term === undefined) return <p>Term not found by ID: {serializedId}</p>;
      return <Form defaultValue={term} onCancel={handleCancel} onSubmit={handleSubmit} />;
    default:
      return <p>Unknown status: {status}</p>;
  }
}) satisfies FC;
