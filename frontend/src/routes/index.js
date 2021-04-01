import { useAuth } from '../contexts/auth';

import AuthRoutes from './auth';
import LogoffRoutes from './logoff';

const Routes = () => {
  const { signed } = useAuth();

  return signed ? <AuthRoutes /> : <LogoffRoutes />;
}

export default Routes;