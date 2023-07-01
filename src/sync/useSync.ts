import { useMutation } from '@tanstack/react-query';
import { useServices } from 'services';

export interface SyncShape {
  syncWithRemote: () => void;
}

export const useSync = (): SyncShape => {
  const { termsRepository } = useServices();

  const { mutate } = useMutation({
    mutationFn: async () => {
      const terms = await termsRepository.getUnsynced();
    },
  });

  return {
    syncWithRemote: mutate,
  };
};
