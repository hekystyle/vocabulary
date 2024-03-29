import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useIsMutating, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button, Modal, Space } from 'antd';
import { FC, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useServices } from '@/services';
import { Term } from '@/types/Term';
import { QUERY_KEYS } from '@/utils/queryKeys';

export interface ActionsProps {
  record: Term;
}

export const Actions: FC<ActionsProps> = ({ record }) => {
  const navigate = useNavigate();
  const { termsRepository } = useServices();
  const queryClient = useQueryClient();
  const isMutating = useIsMutating({ mutationKey: ['terms'] }) > 0;

  const { mutate: deleteTerm } = useMutation({
    mutationKey: QUERY_KEYS.terms.id(record.id),
    mutationFn: async () => (record.id ? await termsRepository.delete(record.id) : undefined),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEYS.terms.all() }),
  });

  const handleDeleteButtonClick = useCallback(() => {
    Modal.confirm({
      title: (
        <>
          Are you sure to delete <b>{record.word}</b>?
        </>
      ),
      onOk: () => deleteTerm(undefined),
      okButtonProps: { danger: true },
    });
  }, [deleteTerm, record.word]);

  return (
    <Space>
      <Button
        aria-label="edit"
        disabled={isMutating}
        icon={<EditOutlined />}
        loading={isMutating}
        onClick={() => record.id && navigate(`./${record.id}`)}
      />
      <Button
        danger
        aria-label="delete"
        disabled={isMutating}
        icon={<DeleteOutlined />}
        loading={isMutating}
        onClick={handleDeleteButtonClick}
      />
    </Space>
  );
};
