import { Link } from 'react-router-dom';

import { useAuth } from '../../contexts/auth';

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
          <img src={Logo} alt="GoRecicle" />
          <Link to="/"> Dashboard </Link>
          <Link to=""> Vendas </Link>
          <Link to=""> Clientes </Link>
          <Link to=""> Produtos </Link>
          <Link to=""> Categorias </Link>
          <Link to=""> Fornecedores </Link>
          <Link to=""> Pedidos </Link>
          <Link to="/perfis"> Perfils </Link>
          <Link to="/usuarios"> Usuários </Link>
          <Link to="/settings"> Configurações </Link>
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