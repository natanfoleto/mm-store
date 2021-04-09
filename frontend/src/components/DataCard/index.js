import CardProfile from './Cases/Profiles';
import CardUsers from './Cases/Users';

import { Content } from './styles';

export default function ComponentItemCard({ item, type }) {
  switch (type) {
    case "perfis":
      return (
        <Content>
          <CardProfile item={item} />
        </Content>
      );

    case "usuarios":
      return (
        <Content>
          <CardUsers item={item} />
        </Content>
      );
  
    default:
      return (
        <></>
      );
  }
}
