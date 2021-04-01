import { Content } from './styles';

function ComponentProfile({ item }) {
  return (
    <Content>
      <Content.Id> {item.id_perfil} </Content.Id>
      <Content.Name> 
        {item.nome}

        <p>{item.created_at}</p>
      </Content.Name>
    </Content>
  );
}

export default ComponentProfile;