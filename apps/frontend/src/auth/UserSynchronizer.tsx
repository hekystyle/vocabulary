import { FC, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { useFirebaseAuth } from '@/services/firebase';
import { userState } from './userState';

export const UserSynchronizer: FC = () => {
  const auth = useFirebaseAuth();

  const setUser = useSetRecoilState(userState);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return unsubscribe;
  }, [auth, setUser]);

  return null;
};
