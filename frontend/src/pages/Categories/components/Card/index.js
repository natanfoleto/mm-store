import { useHistory } from 'react-router-dom';

import { Data } from './styles';

import categoryService from '../../../../services/api/category';

function ComponentCategory({ item }) {
  const history = useHistory();

  const { deleteCategory } = categoryService();

  function handleEdit(item) {
    history.push('/categorias/edit', item);
  }

  async function handleDelete(item) {
    if(window.confirm(`Deseja mesmo excluir a categoria ${item.nome}?`)) {
      await deleteCategory({ data: { id_categoria: item.id_categoria }});
    } else {
      return;
    }
  }

  return (
    <>
      <Data onClick={() => { handleEdit(item) }}>
        <Data.Id> {item.id_categoria} </Data.Id>
        <Data.DivColumn> 
          <h1>{item.nome}</h1>
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

export default ComponentCategory;