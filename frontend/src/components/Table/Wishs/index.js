import MaterialTable from 'material-table';
import { useHistory } from 'react-router-dom';

import wishService from '../../../services/api/wish';

import { ptBR } from '../locale'
import { Container, styleIcon } from '../styles'

export default function ComponentTable({ data, onSearchChange }) { 
  const history = useHistory();

  const { deleteWish } = wishService();

  async function handleEdit(rowData) {
    history.push('/pedidos/edit', rowData);
  }

  async function handleDelete(item) {
    if(window.confirm(`Deseja mesmo excluir o pedido de ${item.cliente}?`)) {
      await deleteWish({ data: { id_pedido: item.id_pedido }});
    } else {
      return;
    }
  }

  return (
    <Container>
      <MaterialTable
        localization={ptBR}
        columns={[
          { title: 'ID', field: 'id_pedido' },
          { title: 'Descrição', field: 'descricao' },
          { title: 'Cliente', field: 'cliente' },
          { title: 'Pedido Em', field: 'created_at', type: 'datetime' },
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

