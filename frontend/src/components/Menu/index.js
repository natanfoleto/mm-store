import { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';

import { ProSidebar, SidebarHeader, SidebarContent, SidebarFooter, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';

import { Content, Header, Footer } from './styles';

import { RiDashboard2Fill, RiUserSettingsFill, RiTruckFill, RiStarSFill, RiStackFill, RiLogoutCircleLine, RiAdminFill } from 'react-icons/ri';
import { AiFillAppstore, AiFillSetting } from 'react-icons/ai';
import { FaUserCircle, FaUsersCog, FaUsers, FaCashRegister } from 'react-icons/fa';
import { BsToggleOn, BsToggleOff } from 'react-icons/bs';

export default function ComponentMenu() {
  const history = useHistory();

  const [menuToggle, setMenuToggle] = useState(false);

  return (
    <Content>
      <ProSidebar collapsed={menuToggle}>
        <SidebarHeader>
          <Header toggleMenu={menuToggle}> 
            <Link> { menuToggle ? <FaUserCircle size={16}/> : 'Meu Perfil' } </Link>
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
              icon={<FaCashRegister size={16}/>}
            > 
              Vendas 
            </MenuItem>

            <MenuItem 
              icon={<FaUsers size={16}/>}
            > 
              Clientes 
            </MenuItem>

            <MenuItem 
              icon={<AiFillAppstore size={16}/>}
            > 
              Produtos 
            </MenuItem>

            <MenuItem 
              icon={<RiStackFill size={16}/>}
            > 
              Categorias de Produtos 
            </MenuItem>

            <MenuItem 
              icon={<RiTruckFill size={16}/>}
            > 
              Fornecedores 
            </MenuItem>

            <MenuItem 
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
              icon={<FaUsersCog size={16}/>}
            > 
              Usuários 
            </MenuItem>

            <MenuItem 
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
            <button onClick={() => { history.push('/') }}>
              <RiLogoutCircleLine size={20}/> 
              {menuToggle || 'Sair'}
            </button>
          </Footer>
        </SidebarFooter>
      </ProSidebar>
    </Content>
  );
}
