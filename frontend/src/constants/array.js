import { GoGraph } from 'react-icons/go'
import { BiBookHeart } from 'react-icons/bi'
import { ImProfile } from 'react-icons/im'
import { RiShieldKeyholeFill } from 'react-icons/ri'
import { FaCashRegister, FaUsers, FaBox, FaListAlt, FaTruck, FaUsersCog } from 'react-icons/fa'

export const headers = [
  { path: '/dash', children: 'Dashboard', icon: <GoGraph /> },
  { path: '/vendas', children: 'Vendas', icon: <FaCashRegister /> },
  { path: '/clientes', children: 'Clientes', icon: <FaUsers /> },
  { path: '/produtos', children: 'Produtos', icon: <FaBox /> },
  { path: '/categorias', children: 'Categorias', icon: <FaListAlt /> },
  { path: '/fornecedores', children: 'Fornecedores', icon: <FaTruck /> },
  { path: '/pedidos', children: 'Pedidos', icon: <BiBookHeart /> },
  { path: '/usuarios', children: 'Usuários', icon: <FaUsersCog /> },
  { path: '/perfis', children: 'Perfis', icon: <ImProfile /> },
  { path: '/permissoes', children: 'Permissões', icon: <RiShieldKeyholeFill /> },
];

export const comboboxRows = [
  { id: '10', title: '10 linhas' },
  { id: '20', title: '20 linhas' },
  { id: '30', title: '30 linhas' },
  { id: '50', title: '50 linhas' },
  { id: '100', title: '100 linhas' },
  { id: '0', title: 'Todas linhas' },
]

export const comboboxTypePermission = [
  { id: 'Leitura', title: 'Leitura' },
  { id: 'Escrita', title: 'Escrita' }
]

export const comboboxTypeProfile = [
  { id: '', title: 'Todos'},
  { id: 'Leitura', title: 'Leitura'},
  { id: 'Escrita', title: 'Escrita'}
]

export const comboboxContextPermission = [
  { id: 'Users', title: 'Users'},
  { id: 'Profiles', title: 'Profiles'},
  { id: 'Clients', title: 'Clients'},
  { id: 'Accounts', title: 'Accounts'},
  { id: 'Products', title: 'Products'},
  { id: 'Categories', title: 'Categories'},
  { id: 'Photos', title: 'Photos'},
  { id: 'Providers', title: 'Providers'},
  { id: 'Address', title: 'Address'},
  { id: 'Wishs', title: 'Wishs'},
  { id: 'Permission', title: 'Permission'},
  { id: 'Permissions', title: 'Permissions'}
]

export const comboboxContextProfile = [
  { id: '', title: 'Todos'},
  { id: 'Users', title: 'Users'},
  { id: 'Profiles', title: 'Profiles'},
  { id: 'Clients', title: 'Clients'},
  { id: 'Accounts', title: 'Accounts'},
  { id: 'Products', title: 'Products'},
  { id: 'Categories', title: 'Categories'},
  { id: 'Photos', title: 'Photos'},
  { id: 'Providers', title: 'Providers'},
  { id: 'Address', title: 'Address'},
  { id: 'Wishs', title: 'Wishs'},
  { id: 'Permission', title: 'Permission'},
  { id: 'Permissions', title: 'Permissions'}
]

export const comboboxSizeProduct = [
  { id: 'P', title: 'P' },
  { id: 'PP', title: 'PP' },
  { id: 'M', title: 'M' },
  { id: 'G', title: 'G' },
  { id: 'GG', title: 'GG' }
]
