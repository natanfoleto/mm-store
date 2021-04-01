import { Data } from './styles';

function ComponentProfile({ item }) {
  return (
    <>
      <Data>
        <Data.Id> {item.id_perfil} </Data.Id>
        <Data.Name> 
          {item.nome}
          <p>{item.created_at}</p>
        </Data.Name>
      </Data>

      <Data.Actions>
        <Data.Button> Editar </Data.Button>
        <Data.Hr />
        <Data.Button onClick={() => {alert(`Deseja excluir o item ${item.id_perfil}?`)}} > Excluir </Data.Button>  
      </Data.Actions>      
    </>
  );
}

export default ComponentProfile;