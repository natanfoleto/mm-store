import React from 'react';
import PropTypes from 'prop-types';

import { Wrapper, Container } from './styles';

export default function AuthLayout({ children }) {
  return (
    <Wrapper>
      <Container>
        {children}
      </Container>
    </Wrapper>
  );
}

AuthLayout.ProtoTypes = {
  children: PropTypes.element.isRequired,
}
