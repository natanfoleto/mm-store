import { Link, NavLink } from 'react-router-dom';

import { useAuth } from '../../contexts/auth';
import { headers } from '../../constants/array'

import Logo from '../../assets/LogoMini.png';

import { Tooltip } from '@material-ui/core'
import { RiLogoutCircleLine } from 'react-icons/ri';

import { Container, Content, Profile } from './styles';

function Header() {
  const { user, signOut } = useAuth();
  
  function handleLogOut() {
    signOut();
  }

  return (
    <Container>
      <Content>
        <nav>
          <img src={Logo} alt="MMStore" />

          {
            headers.map((item) => (
              <NavLink
                to={item.path}
                activeClassName="selected"
              >
                {item.children}
              </NavLink>
            ))
          }

        </nav>

        <aside>
          <Tooltip title="Logout" enterDelay={500} leaveDelay={200}>
            <button onClick={handleLogOut}>
              <RiLogoutCircleLine size={20}/> 
            </button>
          </Tooltip>
          
          <Profile>
            <div>
              <strong>{user.nome}</strong>
              <Link to="/profile">Meu perfil</Link>
            </div>
          </Profile>    
        </aside>
      </Content>
    </Container>
  );
}

export default Header;