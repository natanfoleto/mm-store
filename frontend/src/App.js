import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

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
        <ToastContainer autoClose={2500} />
      </Router>
    </>
  );
}

export default App;
