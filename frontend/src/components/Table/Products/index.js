import MaterialTable from 'material-table';
import { useHistory } from 'react-router-dom';

import productService from '../../../services/api/product';

import { Container } from '../styles'

export default function ComponentTable({ data }) { 
  const history = useHistory();

  const { deleteProduct } = productService();

  async function handleEdit(rowData) {
    history.push('/produtos/edit', rowData);
  }

  async function handleDelete(item) {
    if(window.confirm(`Deseja mesmo excluir o produto ${item.nome}?`)) {
      await deleteProduct({ data: { id_produto: item.id_produto }});
    } else {
      return;
    }
  }

  return (
    <Container>
      <MaterialTable
        columns={[
          { title: 'ID', field: 'id_produto' },
          { title: 'Nome', field: 'nome' },
          { title: 'R$', field: 'preco_venda', type: 'numeric', align: 'center' },
          { title: 'Estoque', field: 'estoque' },
          { title: 'Tamanho', field: 'tamanho' },
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
