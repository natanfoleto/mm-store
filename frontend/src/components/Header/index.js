import { Link } from 'react-router-dom';

import { useAuth } from '../../contexts/auth';

import Logo from '../../assets/LogoMini.png';

import { RiLogoutCircleLine } from 'react-icons/ri';

import { Container, Content, Profile } from './styles';

function Header() {
  const { signOut } = useAuth();
  
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
          <Link to=""> Configurações </Link>
        </nav>

        <aside>
          <button onClick={handleLogOut}>
            <RiLogoutCircleLine size={20}/> 
          </button>

          <Profile>
            <div>
              <strong>Natan</strong>
              <Link to="/profile">Meu perfil</Link>
            </div>
          </Profile>    
        </aside>
      </Content>
    </Container>
  );
}

export default Header;