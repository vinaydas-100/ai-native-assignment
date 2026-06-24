import { proxy } from 'valtio';
import { UserSession } from '../types/auth.types';

export interface UserState {
  session: UserSession | null;
  isLoading: boolean;
}

export const userStore = proxy<UserState>({
  session: null,
  isLoading: false,
});

export const userActions = {
  setSession: (session: UserSession) => {
    userStore.session = session;
  },
  clearSession: () => {
    userStore.session = null;
  },
  setLoading: (loading: boolean) => {
    userStore.isLoading = loading;
  },
};
