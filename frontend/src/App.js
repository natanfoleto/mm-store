import Routes from './routes';
import GlobalStyle from './styles/global';

import { useHistory } from 'react-router-dom';

function App() {  
  return (
    <>
      <Routes istory={useHistory()}/>
      <GlobalStyle />
    </>
  );
}

export default App;
