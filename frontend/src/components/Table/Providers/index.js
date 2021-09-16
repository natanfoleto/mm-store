import MaterialTable from 'material-table';
import { useHistory } from 'react-router-dom';

import providerService from '../../../services/api/provider';

import { ptBR } from '../locale'
import { Container, styleIcon } from '../styles'

export default function ComponentTable({ data, onSearchChange }) { 
  const history = useHistory();

  const { deleteProvider } = providerService();

  async function handleEdit(rowData) {
    history.push('/fornecedores/edit', JSON.stringify(rowData));
  }

  async function handleDelete(item) {
    if(window.confirm(`Deseja mesmo excluir o fornecedor ${item.nome}?`)) {
      await deleteProvider({ data: { id_fornecedor: item.id_fornecedor }});
    } else {
      return;
    }
  }

  return (
    <Container>
      <MaterialTable
        localization={ptBR}
        columns={[
          { title: 'ID', field: 'id_fornecedor', width: '10%' },
          { title: 'Nome', field: 'nome' },
          { title: 'CPF / CNJP', field: 'cpf_cnpj' },
          { title: 'E-mail', field: 'email' },
          { title: 'Celular', field: 'celular' }
        ]}
        data={data} 
        options={{
          search: true,
          searchAutoFocus: true,
          searchFieldAlignment: 'left',
          paging: false,
          showTitle: false,
          actionsColumnIndex: -1
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
