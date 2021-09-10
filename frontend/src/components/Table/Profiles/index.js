import MaterialTable from 'material-table';
import { useHistory } from 'react-router-dom';

import profileService from '../../../services/api/profile';

import { Container } from '../styles'

export default function ComponentTable({ data }) {  
  const history = useHistory();

  const { deleteProfile } = profileService();

  async function handleEdit(rowData) {
    history.push('/perfis/edit', rowData);
  }

  async function handleDelete(item) {
    if(window.confirm(`Deseja mesmo excluir o perfil ${item.nome}?`)) {
      await deleteProfile({ data: { id_perfil: item.id_perfil }});
    } else {
      return;
    }
  }

  return (
    <Container>
      <MaterialTable
        columns={[
          { title: 'ID', field: 'id_perfil' },
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
