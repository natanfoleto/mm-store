import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Routes from './routes';

import { AuthProvider } from './contexts/auth';

import GlobalStyle from './styles/global';

function App() {  
  const styleToast = {
    textAlign: 'center'
  }
  
  return (
    <>
      <Router>
        <AuthProvider>
          <Routes />
        </AuthProvider>
        <GlobalStyle />
        <ToastContainer autoClose={2500} style={styleToast} />
      </Router>
    </>
  );
}

export default App;
