import { userStore, userActions } from './user.store';
import { UserSession } from '../types/auth.types';

describe('userStore', () => {
  beforeEach(() => {
    userStore.session = null;
    userStore.isLoading = false;
  });

  describe('initial state', () => {
    it('should have null session', () => {
      expect(userStore.session).toBeNull();
    });

    it('should have isLoading as false', () => {
      expect(userStore.isLoading).toBe(false);
    });
  });

  describe('setSession', () => {
    it('should set the user session', () => {
      const session: UserSession = {
        user: {
          id: '1',
          name: 'Jane Doe',
          email: 'jane@example.com',
          gender: 'Female',
        },
        token: 'test-token-123',
        isAuthenticated: true,
      };

      userActions.setSession(session);

      expect(userStore.session).toEqual(session);
    });
  });

  describe('clearSession', () => {
    it('should clear the user session', () => {
      const session: UserSession = {
        user: {
          id: '1',
          name: 'Jane Doe',
          email: 'jane@example.com',
          gender: 'Female',
        },
        token: 'test-token-123',
        isAuthenticated: true,
      };

      userActions.setSession(session);
      userActions.clearSession();

      expect(userStore.session).toBeNull();
    });
  });

  describe('setLoading', () => {
    it('should set loading to true', () => {
      userActions.setLoading(true);

      expect(userStore.isLoading).toBe(true);
    });

    it('should set loading to false', () => {
      userActions.setLoading(true);
      userActions.setLoading(false);

      expect(userStore.isLoading).toBe(false);
    });
  });
});
