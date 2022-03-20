import { VFC } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { isObject } from 'utils/isObject';
import { useRequest } from 'ahooks';
import { SpinnerBox } from 'components/SpinnerBox';
import { hasReturnUrlField } from './utils/hasReturnUrlField';
import { Form, FormProps } from './components/Form';
import { getTerm } from './api/getTerm';
import { createTerm } from './api/createTerm';
import { updateTerm } from './api/updateTerm';

export const RecordPage: VFC = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { id: serializedId } = useParams<{ id?: string }>();

  const {
    loading,
    error,
    data: term,
  } = useRequest(getTerm, {
    defaultParams: [serializedId ? parseInt(serializedId) : undefined],
  });

  const { loading: creating, runAsync: create } = useRequest(createTerm, { manual: true });
  const { loading: updating, runAsync: update } = useRequest(updateTerm, { manual: true });

  const navigateBack = () => {
    if (isObject(state) && hasReturnUrlField(state)) {
      navigate(state.returnUrl);
    } else {
      navigate('/');
    }
  };

  const handleSubmit: FormProps['onSubmit'] = async values => {
    try {
      await (values.id ? update(values) : create(values));
      navigateBack();
    } catch (e) {
      console.error(e);
    }
  };

  const handleCancel = () => navigateBack();

  if (loading || creating || updating) return <SpinnerBox />;
  if (error) return <p>Error: {error.message}</p>;
  if (term === undefined) return <p>Term not found by ID: {serializedId}</p>;
  return <Form term={term} onCancel={handleCancel} onSubmit={handleSubmit} />;
};
