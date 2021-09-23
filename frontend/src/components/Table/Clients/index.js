import MaterialTable from 'material-table';
import { useHistory } from 'react-router-dom';

import clientService from '../../../services/api/client';

import { ptBR } from '../locale'
import { Container, styleIcon } from '../styles'

export default function ComponentTable({ data, onSearchChange }) {  
  const history = useHistory();

  const { deleteClient } = clientService();

  async function handleEdit(rowData) {
    history.push('/clientes/edit', rowData);
  }

  async function handleDelete(item) {
    if (window.confirm(`Deseja mesmo excluir o cliente ${item.nome}?`)) {
      await deleteClient({ data: { id_cliente: item.id_cliente }});
    } else {
      return;
    }
  }

  return (
    <Container>
      <MaterialTable
        localization={ptBR}
        columns={[
          { title: 'ID', field: 'id_cliente' },
          { title: 'Nome', field: 'nome' },
          { title: 'CPF', field: 'cpf' },
          { title: 'E-mail', field: 'email' },
          { title: 'Celular', field: 'celular' },
          { title: 'Data Nasc.', field: 'data_nasc', type: 'date' },
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
