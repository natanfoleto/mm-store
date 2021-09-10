import MaterialTable from 'material-table';
import { useHistory } from 'react-router-dom';

import categoryService from '../../../services/api/category';

import { Container } from '../styles'

export default function ComponentTable({ data }) { 
  const history = useHistory();

  const { deleteCategory } = categoryService();

  async function handleEdit(rowData) {
    history.push('/categorias/edit', rowData);
  }

  async function handleDelete(item) {
    if(window.confirm(`Deseja mesmo excluir a categoria ${item.nome}?`)) {
      await deleteCategory({ data: { id_categoria: item.id_categoria }});
    } else {
      return;
    }
  }

  return (
    <Container>
      <MaterialTable
        columns={[
          { title: 'ID', field: 'id_categoria' },
          { title: 'Nome', field: 'nome' },
          { title: 'Atualiado Em', field: 'updated_at', type: 'datetime' },
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
