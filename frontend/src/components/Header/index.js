import { Link } from 'react-router-dom';

import { useAuth } from '../../contexts/auth';

import Logo from '../../assets/LogoMini.png';

import { RiDashboard2Fill, RiUserSettingsFill, RiTruckFill, RiStarSFill, RiStackFill, RiLogoutCircleLine } from 'react-icons/ri';
import { AiFillAppstore, AiFillSetting } from 'react-icons/ai';
import { FaUserCircle, FaUsersCog, FaUsers, FaCashRegister } from 'react-icons/fa';
import { BsToggleOn, BsToggleOff } from 'react-icons/bs';

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
          <Link to="dashboard"> Dashboard </Link>
          <Link to=""> Vendas </Link>
          <Link to=""> Clientes </Link>
          <Link to=""> Produtos </Link>
          <Link to=""> Categorias </Link>
          <Link to=""> Fornecedores </Link>
          <Link to=""> Pedidos </Link>
          <Link to="perfils"> Perfils </Link>
          <Link to=""> Usuários </Link>
          <Link to=""> Configurações </Link>

          {/* <Link to="dashboard"> <RiDashboard2Fill size={24}/> </Link>
          <Link to=""> <FaCashRegister size={24}/> </Link>
          <Link to=""> <FaUsers size={24}/> </Link>
          <Link to=""> <AiFillAppstore size={24}/> </Link>
          <Link to=""> <RiStackFill size={24}/> </Link>
          <Link to=""> <RiTruckFill size={24}/> </Link>
          <Link to=""> <RiStarSFill size={24}/> </Link>
          <Link to="perfils"> <RiUserSettingsFill size={24}/> </Link>
          <Link to=""> <FaUsersCog size={24}/> </Link>
          <Link to=""> <AiFillSetting size={24}/> </Link> */}
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