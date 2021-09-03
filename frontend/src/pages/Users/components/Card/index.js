import { useHistory } from 'react-router-dom';

import { Data } from './styles';

import Toast from '../../../../utils/toastify';

import userService from '../../../../services/api/user';
import { useAuth } from '../../../../contexts/auth'; 

function ComponentUser({ item }) {
  const history = useHistory();

  const { user } = useAuth();
  const { deleteUser } = userService();

  function handleEdit(item) {
    history.push('/usuarios/edit', item);
  }

  async function handleDelete(item) {
    if(window.confirm(`Deseja mesmo excluir o usuário ${item.nome}?`)) {
      if (item.id_usuario === user.id_usuario)
        Toast('warn', 'Você não pode excluir o usuário que está logado!');
      else
        await deleteUser({ data: { id_usuario: item.id_usuario }});
    } else {
      return;
    }
  }

  return (
    <>
      <Data onClick={() => { handleEdit(item) }}>
        <Data.Id> {item.id_usuario} </Data.Id>
        <Data.DivColumn> 
          <h1>{item.nome}</h1>
          <p>{item.login}</p>
        </Data.DivColumn>

        <Data.DivColumn> 
          <h1>Perfil</h1>
          <p>
            {item.perfil}  
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

export default ComponentUser;