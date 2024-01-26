import { CloudUploadOutlined, LoadingOutlined, ReloadOutlined } from '@ant-design/icons';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from 'antd';
import { FC, useState } from 'react';
import { useServices } from '@/services';
import { QUERY_KEYS } from '@/utils/queryKeys';

export const Sync: FC = () => {
  const [isMouseOver, setIsMouseOver] = useState(false);

  const { synchronizer } = useServices();
  const queryClient = useQueryClient();

  const syncMutation = useMutation({
    mutationKey: ['sync'],
    mutationFn: () => synchronizer.synchronize(new AbortController().signal),
    onMutate: () => setIsMouseOver(false),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEYS.terms.all() }),
    onError: error => console.error(error),
  });

  if (syncMutation.isPending) return <LoadingOutlined style={{ color: 'white' }} />;

  return (
    <Button
      disabled={syncMutation.isPending}
      icon={isMouseOver ? <ReloadOutlined /> : <CloudUploadOutlined style={{ color: 'white' }} />}
      onClick={() => syncMutation.mutate()}
      onMouseEnter={() => setIsMouseOver(true)}
      onMouseLeave={() => setIsMouseOver(false)}
    />
  );
};
