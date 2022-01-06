import MaterialTable from 'material-table';
import { useHistory } from 'react-router-dom';

import permissionService from '../../../services/api/permission';

import { ptBR } from '../locale'
import { Container , styleIcon} from '../styles'

export default function ComponentTable({ data, onSearchChange }) {  
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
        localization={ptBR}
        columns={[
          { title: 'ID', field: 'id_permissao' },
          { title: 'Descrição', field: 'descricao' },
          { title: 'Nome', field: 'nome' },
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
