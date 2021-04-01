import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './routes';

import { AuthProvider } from './contexts/auth';

import GlobalStyle from './styles/global';

function App() {  
  return (
    <>
      <Router>
        <AuthProvider>
          <Routes />
        </AuthProvider>
        <GlobalStyle />
      </Router>
    </>
  );
}

export default App;
