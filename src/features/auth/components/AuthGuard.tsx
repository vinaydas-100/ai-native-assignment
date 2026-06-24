import { useSnapshot } from 'valtio';
import { Navigate } from 'react-router-dom';
import { userStore } from '../../../store/user.store';

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const snapshot = useSnapshot(userStore);

  if (snapshot.session === null) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default AuthGuard;
