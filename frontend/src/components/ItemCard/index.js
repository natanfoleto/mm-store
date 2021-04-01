import CardProfile from './Cases/Profile';
import CardUsers from './Cases/Users';

import { Content } from './styles';

const ComponentContent = ({ children }) => {
  return (
    <Content>
      {children}
    </Content>
  )
}

function ComponentItemCard({ item, type }) {
  switch (type) {
    case "perfis":
      return (
        <ComponentContent>
          <CardProfile item={item} />
        </ComponentContent>
      );

    case "users":
      return (
        <ComponentContent>
          <CardUsers item={item} />
        </ComponentContent>
      );
  
    default:
      return (
        <></>
      );
  }
}

export default ComponentItemCard;