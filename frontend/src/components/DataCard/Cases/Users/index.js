import { useHistory } from 'react-router-dom';

import { Data } from './styles';

import useUser from '../../../../hooks/useUser';

function ComponentProfile({ item }) {
  const history = useHistory();

  const { deleteUser } = useUser();

  function handleEdit(item) {
    history.push('/usuarios/edit', item);
  }

  async function handleDelete(item) {
    if(window.confirm(`Deseja mesmo excluir o usuário ${item.nome}?`)) {
      await deleteUser({ data: { id_usuario: item.id_usuario }});
    } else {
      return;
    }
  }

  return (
    <>
      <Data>
        <Data.Id> {item.id_usuario} </Data.Id>
        <Data.Name> 
          {item.nome}
          <p>{item.login}</p>
        </Data.Name>
      </Data>

      <Data.Actions>
        <Data.Button onClick={() => { handleEdit(item) }}> Editar </Data.Button>
        <Data.Hr />
        <Data.Button onClick={() => { handleDelete(item) }} > Excluir </Data.Button>  
      </Data.Actions>     
    </>
  );
}

export default ComponentProfile;