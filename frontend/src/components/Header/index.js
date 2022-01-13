import { Link, /* NavLink */ } from 'react-router-dom';

import { useAuth } from '../../contexts/auth';

import Breadcrumb from '../../components/Breadcrumb';

import Logo from '../../assets/LogoMini.png';

import { Tooltip } from '@material-ui/core'
import { RiLogoutCircleLine } from 'react-icons/ri';

import { Container, Content, Profile } from './styles';

function Header({ title }) {
  const { user, signOut } = useAuth();
  
  function handleLogOut() {
    signOut();
  }

  return (
    <Container>
      <Content>
        <img src={Logo} alt="MMStore" />

        <Breadcrumb title={title} />

        <aside>
          <Tooltip title="Logout" enterDelay={500} leaveDelay={200}>
            <button onClick={handleLogOut}>
              <RiLogoutCircleLine size={20}/> 
            </button>
          </Tooltip>
          
          <Profile>
            <div>
              <strong>{user.nome}</strong>
              <Link to="/perfil">Meu perfil</Link>
            </div>
          </Profile>    
        </aside>
      </Content>
    </Container>
  );
}

export default Header;