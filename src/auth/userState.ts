import { atom } from 'recoil';

export type UserState = {} | undefined;

export const userState = atom<UserState>({
  key: 'user',
  default: undefined,
});
