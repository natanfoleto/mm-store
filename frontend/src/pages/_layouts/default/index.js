import PropTypes from 'prop-types';

import { Wrapper, Container } from './styles';

export default function DefaultLayout({ children }) {
  return (
    <Wrapper>
      <Container>
        {children}
      </Container>
    </Wrapper>
  );
}

DefaultLayout.ProtoTypes = {
  children: PropTypes.element.isRequired,
}
