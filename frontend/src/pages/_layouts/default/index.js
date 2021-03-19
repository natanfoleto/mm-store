import PropTypes from 'prop-types';

import Menu from '../../../components/Menu';

import { Wrapper, Container } from './styles';

export default function DefaultLayout({ children }) {
  return (
    <Wrapper>
      <Menu />

      <Container>
        {children}
      </Container>
    </Wrapper>
  );
}

DefaultLayout.ProtoTypes = {
  children: PropTypes.element.isRequired,
}
