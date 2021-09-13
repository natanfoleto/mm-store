import MaterialTable from 'material-table';
import { useHistory } from 'react-router-dom';

import profileService from '../../../services/api/profile';

import { ptBR } from '../locale'
import { Container, styleIcon } from '../styles'

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
        localization={ptBR}
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
            iconProps: { style: styleIcon },
            onClick: (event, rowData) => { handleEdit(rowData) }
          },
          {
            icon: 'delete',
            iconProps: { style: styleIcon },
            onClick: (event, rowData) => { handleDelete(rowData) }
          }
        ]}
        onRowClick={(event, rowData) => handleEdit(rowData)}
      />
    </Container>
  );
}
