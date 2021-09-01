import { useHistory } from 'react-router-dom';

import { Data } from './styles';

import useProduct from '../../../../hooks/useProduct';

function ComponentProduct({ item }) {
  const history = useHistory();

  const { deleteProduct } = useProduct();

  function handleEdit(item) {
    history.push('/produtos/edit', item);
  }

  async function handleDelete(item) {
    if(window.confirm(`Deseja mesmo excluir o produto ${item.nome}?`)) {
        await deleteProduct({ data: { id_produto: item.id_produto }});
    } else {
      return;
    }
  }

  return (
    <>
      <Data onClick={() => { handleEdit(item) }}>
        <Data.Id> {item.id_produto} </Data.Id>
        <Data.DivColumn> 
          <h1>{item.nome}</h1>
          <p>{item.categoria}</p>
        </Data.DivColumn>

        <Data.DivColumn> 
          <h1>Estoque</h1>
          <p>
            {item.estoque}  
          </p>
        </Data.DivColumn>

        <Data.DivColumn> 
          <h1>Tamanho</h1>
          <p>
            {item.tamanho}  
          </p>
        </Data.DivColumn>

        <Data.DivColumn> 
          <h1>Preço</h1>
          <p>
            {`R$ ${item.preco_venda}`}
          </p>
        </Data.DivColumn>
        
        <Data.DivColumn> 
          <h1>Atualizado</h1>
          <p>
            {new Intl.DateTimeFormat('pt-BR', {dateStyle: 'full', timeStyle: 'long'}).format(new Date(item.updated_at))}  
          </p>
        </Data.DivColumn>
      </Data>

      <Data.Actions>
        <Data.Button onClick={() => { handleEdit(item) }}> Editar </Data.Button>
        <Data.Hr />
        <Data.Button onClick={() => { handleDelete(item) }} > Excluir </Data.Button>  
      </Data.Actions>     
    </>
  );
}

export default ComponentProduct;