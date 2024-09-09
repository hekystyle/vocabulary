import { User } from 'firebase/auth';
import { atom } from 'recoil';

export type UserState = User | null | 'loading';

export const userState = atom<UserState>({
  key: 'user',
  default: 'loading',
  dangerouslyAllowMutability: true, // reactivity is handled by onAuthStateChanged in UserSynchoronizer
});
