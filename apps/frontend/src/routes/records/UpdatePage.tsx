import { useIsMutating, useMutation, useQuery } from '@tanstack/react-query';
import { FC } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { SpinnerBox } from '@/components/SpinnerBox';
import { useServices } from '@/services';
import { isObject } from '@/utils/isObject';
import { QUERY_KEYS } from '@/utils/queryKeys';
import { Form, FormProps } from './components/Form';
import { hasReturnUrlField } from './utils/hasReturnUrlField';

export default (() => {
  const navigate = useNavigate();
  const location = useLocation();
  const { termsRepository } = useServices();
  const { id: serializedId } = useParams<{ id?: string }>();
  const id = serializedId ? parseInt(serializedId, 10) : NaN;
  const isUpdating = useIsMutating({ mutationKey: QUERY_KEYS.terms.id(id) });

  const {
    error,
    data: term,
    status,
  } = useQuery({
    queryKey: QUERY_KEYS.terms.id(id),
    queryFn: async ({ signal }) => await termsRepository.getById(id, signal),
    enabled: !Number.isNaN(id),
  });

  const { mutateAsync: update } = useMutation({
    mutationKey: QUERY_KEYS.terms.id(id),
    mutationFn: termsRepository.update.bind(termsRepository),
  });

  const navigateBack = () => {
    if (isObject(location.state) && hasReturnUrlField(location.state)) {
      navigate(location.state.returnUrl);
    } else {
      navigate('..');
    }
  };

  const handleSubmit: FormProps['onSubmit'] = values => {
    update(values).then(navigateBack).catch(console.error);
  };

  const handleCancel = () => navigateBack();

  if (Number.isNaN(id)) return <p>ID must be number, received: {serializedId}</p>;

  if (isUpdating) return <SpinnerBox label="Updating ..." />;

  switch (status) {
    case 'pending':
      return <SpinnerBox label="Loading term ..." />;
    case 'error':
      return <p>Error: {error instanceof Error ? error.message : 'Unknown'}</p>;
    case 'success':
      if (term === undefined) return <p>Term not found by ID: {serializedId}</p>;
      return <Form defaultValue={term} onCancel={handleCancel} onSubmit={handleSubmit} />;
    default:
      return <p>Unknown status: {status}</p>;
  }
}) satisfies FC;
