import PropTypes from 'prop-types';

import Header from '../../../components/Header';

import { Wrapper, Body } from './styles';

export default function FormLayout({ children }) {
  return (
    <Wrapper>
      <Header />

      <Body>
        {children}
      </Body>
    </Wrapper>
  );
}

FormLayout.ProtoTypes = {
  children: PropTypes.element.isRequired,
}
