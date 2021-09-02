import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
    {
    title:'Perfil',
    path:"/dash",
    icon:<AiIcons.AiFillHome/>,
    cName: 'nav-text'
    },
    {
    title:'Produtos',
    path:"/produtos",
    icon:<IoIcons.IoIosPaper />,
    cName: 'nav-text'
    }

]

export default SidebarData;
