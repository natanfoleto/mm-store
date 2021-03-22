import Routes from './routes';
import GlobalStyle from './styles/global';

import { AuthProvider } from './contexts/auth';

function App() {  
  return (
    <>
      <AuthProvider>
        <Routes />
      </AuthProvider>
      <GlobalStyle />
    </>
  );
}

export default App;
