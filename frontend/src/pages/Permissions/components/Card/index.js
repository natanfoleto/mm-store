import { useHistory } from 'react-router-dom';

import { Data } from './styles';

import usePermission from '../../../../hooks/usePermission';

function ComponentPermission({ item }) {
  const history = useHistory();

  const { deletePermission } = usePermission();

  function handleEdit(item) {
    history.push('/permissoes/edit', item);
  }

  async function handleDelete(item) {
    if(window.confirm(`Deseja mesmo excluir a permissão "${item.descricao}"?`)) {
      await deletePermission({ data: { id_permissao: item.id_permissao }});
    } else {
      return;
    }
  }

  return (
    <>
      <Data onClick={() => { handleEdit(item) }}>
        <Data.Id> {item.id_permissao} </Data.Id>
        <Data.DivColumn> 
          <h1>Nome</h1>
          <p>
            {item.nome}  
          </p>
        </Data.DivColumn>

        <Data.DivColumn> 
          <h1>Descrição</h1>
          <p>
            {item.descricao}  
          </p>
        </Data.DivColumn>

        <Data.DivColumn> 
          <h1>Tipo</h1>
          <p>
            {item.tipo}  
          </p>
        </Data.DivColumn>

        <Data.DivColumn> 
          <h1>Contexto</h1>
          <p>
            {item.contexto}  
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

export default ComponentPermission;