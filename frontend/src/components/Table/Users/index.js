import MaterialTable from 'material-table';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../../contexts/auth';

import userService from '../../../services/api/user';

import { ptBR } from '../locale'
import { Container, styleIcon } from '../styles'

export default function ComponentTable({ data, onSearchChange }) {  
  const history = useHistory();
  const { user } = useAuth();

  const { deleteUser } = userService();

  async function handleEdit(rowData) {
    history.push('/usuarios/edit', rowData);
  }

  async function handleDelete(item) {
    if (user.id_usuario === item.id_usuario) {
      alert('Você não pode excluir o usuário que está logado!')

      return
    }

    if (window.confirm(`Deseja mesmo excluir o usuário ${item.nome}?`)) {
      await deleteUser({ data: { id_usuario: item.id_usuario }});
    } else {
      return;
    }
  }

  return (
    <Container>
      <MaterialTable
        localization={ptBR}
        columns={[
          { title: 'ID', field: 'id_usuario' },
          { title: 'Nome', field: 'nome' },
          { title: 'Login', field: 'login' },
          { title: 'Perfil', field: 'perfil' },
        ]}
        data={data}        
        options={{
          search: true,
          searchAutoFocus: true,
          searchFieldAlignment: 'left',
          paging: false,
          showTitle: false,
          actionsColumnIndex: -1,
        }}
        actions={[
          {
            icon: 'edit',
            iconProps: { style: styleIcon },
            onClick: (event, rowData) => { handleEdit(rowData) }
          },
          {
            icon: 'delete',
            iconProps: { style: styleIcon },
            onClick: (event, rowData) => { handleDelete(rowData) }
          }
        ]}
        onSearchChange={(value) => { onSearchChange(value) }}
        onRowClick={(event, rowData) => handleEdit(rowData)}
      />
    </Container>
  );
}
