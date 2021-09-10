import MaterialTable from 'material-table';
import { useHistory } from 'react-router-dom';

import permissionService from '../../../services/api/permission';

import { Container } from '../styles'

export default function ComponentTable({ data }) {  
  const history = useHistory();

  const { deletePermission } = permissionService();

  async function handleEdit(rowData) {
    history.push('/permissoes/edit', rowData);
  }

  async function handleDelete(item) {
    if(window.confirm(`Deseja mesmo excluir ${item.nome}?`)) {
      await deletePermission({ data: { id_permissao: item.id_permissao }});
    } else {
      return;
    }
  }

  return (
    <Container>
      <MaterialTable
        columns={[
          { title: 'ID', field: 'id_permissao' },
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
