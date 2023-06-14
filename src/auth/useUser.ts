import { useRecoilValue } from 'recoil';
import { UserState, userState } from './userState';

export const useUser = (): UserState => useRecoilValue(userState);
