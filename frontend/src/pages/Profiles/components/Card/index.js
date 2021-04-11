import { useHistory } from 'react-router-dom';

import { Data } from './styles';

import useProfile from '../../../../hooks/useProfile';

function ComponentProfile({ item }) {
  const history = useHistory();

  const { deleteProfile } = useProfile();

  function handleEdit(item) {
    history.push('/perfis/edit', item);
  }

  async function handleDelete(item) {
    if(window.confirm(`Deseja mesmo excluir o perfil ${item.nome}?`)) {
      await deleteProfile({ data: { id_perfil: item.id_perfil }});
    } else {
      return;
    }
  }

  return (
    <>
      <Data>
        <Data.Id> {item.id_perfil} </Data.Id>
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

export default ComponentProfile;