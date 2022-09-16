import { FC } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { isObject } from 'utils/isObject';
import { SpinnerBox } from 'components/SpinnerBox';
import { useServices } from 'services/di';
import { useMutation, useQuery } from 'react-query';
import { QUERY_KEYS } from 'utils/queryKeys';
import { hasReturnUrlField } from './utils/hasReturnUrlField';
import { Form, FormProps } from './components/Form';
import { getTerm } from './api/getTerm';
import { createTerm } from './api/createTerm';
import { updateTerm } from './api/updateTerm';

export const RecordPage: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { db } = useServices();
  const { id: serializedId } = useParams<{ id?: string }>();
  const id = serializedId ? parseInt(serializedId, 10) : -1;

  const {
    isFetching: loading,
    error,
    data: term,
  } = useQuery(QUERY_KEYS.terms.id(id), async () => getTerm(db)(id), {
    enabled: !Number.isNaN(id) && id > 0,
    onError: e => console.error(e),
  });

  const { isLoading: creating, mutateAsync: create } = useMutation(createTerm(db), {
    onError: e => console.error(e),
  });
  const { isLoading: updating, mutateAsync: update } = useMutation(updateTerm(db), {
    onError: e => console.error(e),
  });

  const navigateBack = () => {
    if (isObject(location.state) && hasReturnUrlField(location.state)) {
      navigate(location.state.returnUrl);
    } else {
      navigate('/');
    }
  };

  const handleSubmit: FormProps['onSubmit'] = values => {
    (values.id ? update(values) : create(values)).then(navigateBack).catch(e => console.error(e));
  };

  const handleCancel = () => navigateBack();

  if (loading || creating || updating) return <SpinnerBox />;
  if (error) return <p>Error: {error instanceof Error ? error.message : 'Unknown'}</p>;
  if (serializedId && term === undefined) return <p>Term not found by ID: {serializedId}</p>;
  return <Form term={term} onCancel={handleCancel} onSubmit={handleSubmit} />;
};
