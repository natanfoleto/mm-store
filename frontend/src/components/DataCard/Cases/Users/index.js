import { Data } from './styles';

function ComponentProfile({ item }) {
  return (
    <>
      <Data>
        <Data.Id> {item.id_perfil} </Data.Id>
        <Data.Name> 
          <p>{item.created_at}</p>
          {item.nome}
        </Data.Name>
      </Data>

      <Data.Actions>
        <Data.Button> Editar </Data.Button>
        <Data.Hr />
        <Data.Button> Excluir </Data.Button>  
      </Data.Actions>      
    </>
  );
}

export default ComponentProfile;