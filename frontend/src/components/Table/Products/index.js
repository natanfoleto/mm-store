import MaterialTable from 'material-table';
import { useHistory } from 'react-router-dom';

import productService from '../../../services/api/product';

import { ptBR } from '../locale'
import { Container, styleIcon } from '../styles'

export default function ComponentTable({ data }) { 
  const history = useHistory();

  const { deleteProduct } = productService();

  async function handleEdit(rowData) {
    history.push('/produtos/edit', JSON.stringify(rowData));
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
        localization={ptBR}
        columns={[
          { title: 'ID', field: 'id_produto', width: '10%' },
          { title: 'Nome', field: 'nome' },
          { title: 'Preço', field: 'preco_venda' },
          { title: 'Estoque', field: 'estoque' },
          { title: 'Tamanho', field: 'tamanho' },
        ]}
        data={data} 
        options={{
          search: true,
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
        onRowClick={(event, rowData) => handleEdit(rowData)}
      />
    </Container>
  );
}
