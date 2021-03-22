import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { useAuth } from '../../contexts/auth';

import 'react-pro-sidebar/dist/css/styles.css';
import { ProSidebar, SidebarHeader, SidebarContent, SidebarFooter, Menu, MenuItem } from 'react-pro-sidebar';
import { RiDashboard2Fill, RiUserSettingsFill, RiTruckFill, RiStarSFill, RiStackFill, RiLogoutCircleLine } from 'react-icons/ri';
import { AiFillAppstore, AiFillSetting } from 'react-icons/ai';
import { FaUserCircle, FaUsersCog, FaUsers, FaCashRegister } from 'react-icons/fa';
import { BsToggleOn, BsToggleOff } from 'react-icons/bs';

import { Content, Header, Footer } from './styles';

export default function ComponentMenu() {
  const history = useHistory();
  const { signOut } = useAuth();
  
  const [menuToggle, setMenuToggle] = useState(false);

  function handleLogOut() {
    signOut();
  }

  return (
    <Content>
      <ProSidebar collapsed={menuToggle}>
        <SidebarHeader>
          <Header toggleMenu={menuToggle}> 
            <Link to=""> { menuToggle ? <FaUserCircle size={16}/> : 'Meu Perfil' } </Link>
          </Header>
        </SidebarHeader>

        <SidebarContent>
          <Menu iconShape="round">
            <MenuItem
              onClick={() => { history.push('/dashboard') }}
              icon={<RiDashboard2Fill size={16}/>}
            > 
              Dashboard 
            </MenuItem>

            <MenuItem 
              onClick={() => { history.push('/dashboard') }}
              icon={<FaCashRegister size={16}/>}
            > 
              Vendas 
            </MenuItem>

            <MenuItem 
              onClick={() => { history.push('/dashboard') }}
              icon={<FaUsers size={16}/>}
            > 
              Clientes 
            </MenuItem>

            <MenuItem 
              onClick={() => { history.push('/dashboard') }}
              icon={<AiFillAppstore size={16}/>}
            > 
              Produtos 
            </MenuItem>

            <MenuItem 
              onClick={() => { history.push('/dashboard') }}
              icon={<RiStackFill size={16}/>}
            > 
              Categorias de Produtos 
            </MenuItem>

            <MenuItem 
              onClick={() => { history.push('/dashboard') }}
              icon={<RiTruckFill size={16}/>}
            > 
              Fornecedores 
            </MenuItem>

            <MenuItem 
              onClick={() => { history.push('/dashboard') }}
              icon={<RiStarSFill size={16}/>}
            > 
              Pedidos 
            </MenuItem>

            <MenuItem 
              onClick={() => { history.push('/perfils') }}
              icon={<RiUserSettingsFill size={16}/>}
            >
              Perfils 
            </MenuItem>

            <MenuItem 
              onClick={() => { history.push('/dashboard') }}
              icon={<FaUsersCog size={16}/>}
            > 
              Usuários 
            </MenuItem>

            <MenuItem 
              onClick={() => { history.push('/dashboard') }}
              icon={<AiFillSetting size={16}/>}
            > 
              Configurações 
            </MenuItem>

            <MenuItem 
              onClick={() => { setMenuToggle(!menuToggle) }} 
              icon={ menuToggle ? <BsToggleOff/> : <BsToggleOn/> }
            > 
              { menuToggle ? '' : 'Esconder'} 
            </MenuItem>

          </Menu>
        </SidebarContent>

        <SidebarFooter>
          <Footer toggleMenu={menuToggle}>
            <button onClick={handleLogOut}>
              <RiLogoutCircleLine size={20}/> 
              {menuToggle || 'Sair'}
            </button>
          </Footer>
        </SidebarFooter>
      </ProSidebar>
    </Content>
  );
}
