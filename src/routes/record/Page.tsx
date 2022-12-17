import { FC } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { isObject } from 'utils/isObject';
import { SpinnerBox } from 'components/SpinnerBox';
import { useServices } from 'containers/Services';
import { useIsMutating, useMutation, useQuery } from 'react-query';
import { QUERY_KEYS } from 'utils/queryKeys';
import { hasReturnUrlField } from './utils/hasReturnUrlField';
import { Form, FormProps } from './components/Form';

export const RecordPage: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { termsRepository } = useServices();
  const { id: serializedId } = useParams<{ id?: string }>();
  const id = serializedId ? parseInt(serializedId, 10) : NaN;
  const isMutating = useIsMutating(QUERY_KEYS.terms.id(id));

  const {
    isFetching: loading,
    error,
    data: term,
  } = useQuery(QUERY_KEYS.terms.id(id), async () => termsRepository.getById(id), {
    enabled: !Number.isNaN(id),
    onError: e => console.error(e),
  });

  const { isLoading: creating, mutateAsync: create } = useMutation(termsRepository.create.bind(termsRepository), {
    onError: console.error,
  });

  const { isLoading: updating, mutateAsync: update } = useMutation(termsRepository.update.bind(termsRepository), {
    onError: console.error,
  });

  const navigateBack = () => {
    if (isObject(location.state) && hasReturnUrlField(location.state)) {
      navigate(location.state.returnUrl);
    } else {
      navigate('/list');
    }
  };

  const handleSubmit: FormProps['onSubmit'] = values => {
    (values.id ? update(values) : create(values)).then(navigateBack).catch(console.error);
  };

  const handleCancel = () => navigateBack();

  if (isMutating) return <SpinnerBox label="Saving ..." />;
  if (loading) return <SpinnerBox label="Loading ..." />;
  if (creating) return <SpinnerBox label="Creating ..." />;
  if (updating) return <SpinnerBox label="Updating ..." />;
  if (error) return <p>Error: {error instanceof Error ? error.message : 'Unknown'}</p>;
  if (serializedId && term === undefined) return <p>Term not found by ID: {serializedId}</p>;
  return <Form term={term} onCancel={handleCancel} onSubmit={handleSubmit} />;
};
