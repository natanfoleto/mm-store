const rows = [
  { id: '10', title: '10 linhas' },
  { id: '20', title: '20 linhas' },
  { id: '30', title: '30 linhas' },
  { id: '50', title: '50 linhas' },
  { id: '100', title: '100 linhas' },
  { id: '0', title: 'Todas linhas' },
]

const typesPermission = [
  { id: 'Leitura', title: 'Leitura' },
  { id: 'Escrita', title: 'Escrita' }
]

const contextsPermisssion = [
  { id: 'Users', title: 'Users' },
  { id: 'Profiles', title: 'Profiles' },
  { id: 'Permissions', title: 'Permissions' },
]

const typesProfile = [
  { id: '', title: 'Todos'},
  { id: 'Leitura', title: 'Leitura'},
  { id: 'Escrita', title: 'Escrita'}
]

const contextsProfile = [
  { id: '', title: 'Todos'},
  { id: 'Users', title: 'Users'},
  { id: 'Profiles', title: 'Profiles'},
  { id: 'Permissions', title: 'Permissions'}
]

export { 
  rows, 
  typesPermission, contextsPermisssion, 
  typesProfile, contextsProfile
}
