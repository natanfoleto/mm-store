import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Tooltip } from '@material-ui/core'

import { useAuth } from '../../contexts/auth';

import { headers } from '../../constants/array'

import { BiChevronLeft, BiChevronRight } from 'react-icons/bi'

import { Container, Header } from './styles';

function Sidebar() {
  const { user } = useAuth();

  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  function Salutation() {
    const date = new Date()
    const hr = date.getHours()

    let message = ''

    if (hr >= 6 && hr < 12)
      message += 'Bom dia, '
    else if (hr >= 12 && hr < 18)
      message += 'Boa tarde, '
    else if (hr >= 18 && hr < 24)
      message += 'Boa noite, '
    else
      message += 'Boa madrugada, '

    return message
  }

  return (
    <Container sidebar={sidebar} >
      <div>
        <Header sidebar={sidebar} >
          <div>
            <h1>{Salutation()} <strong>{user.nome}</strong> </h1>
            <p>tenha um ótimo trabalho!</p>
          </div>

          <Tooltip title={sidebar ? 'Expandir' : 'Recolher'} enterDelay={500} leaveDelay={200} placement='right'>
            <button onClick={showSidebar}>
              { sidebar ? <BiChevronRight size={20} /> : <BiChevronLeft size={20} /> }
            </button>
          </Tooltip>
        </Header>

        <nav>
          {
            headers.map((item, index) => (
              <NavLink
                key={index}
                to={item.path}
                activeClassName="selected"
              >
                {item.icon}
                {item.children}
              </NavLink>
            ))
          }
        </nav>
      </div>

      <div>
        <footer>© Provided by, dev Natan Foleto</footer>
      </div>
    </Container>
  );
}

export default Sidebar;