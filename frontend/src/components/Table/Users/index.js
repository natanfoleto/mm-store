import MaterialTable from 'material-table';
import { useHistory } from 'react-router-dom';

import userService from '../../../services/api/user';

import { Container } from '../styles'

export default function ComponentTable({ data }) {  
  const history = useHistory();

  const { deleteUser } = userService();

  async function handleEdit(rowData) {
    history.push('/usuarios/edit', rowData);
  }

  async function handleDelete(item) {
    if(window.confirm(`Deseja mesmo excluir o usuário ${item.nome}?`)) {
      await deleteUser({ data: { id_usuario: item.id_usuario }});
    } else {
      return;
    }
  }

  return (
    <Container>
      <MaterialTable
        columns={[
          { title: 'ID', field: 'id_usuario' },
          { title: 'Nome', field: 'nome' },
        ]}
        data={data}        
        options={{
          search: true,
          searchFieldAlignment: 'left',
          paging: false,
          showTitle: false,
          actionsColumnIndex: -1,
        }}
        actions={[
          {
            icon: 'edit',
            iconProps: { style: { fontSize: '14px' } },
            onClick: (event, rowData) => { handleEdit(rowData) }
          },
          {
            icon: 'delete',
            iconProps: { style: { fontSize: '14px' } },
            onClick: (event, rowData) => { handleDelete(rowData) }
          }
        ]}
      />
    </Container>
  );
}
