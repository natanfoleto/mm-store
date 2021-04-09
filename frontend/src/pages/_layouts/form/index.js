import PropTypes from 'prop-types';

import Header from '../../../components/Header';

import { Wrapper, Content } from './styles';

export default function FormLayout({ children }) {
  return (
    <Wrapper>
      <Header />

      <Content>
        <Content.Header>
        </Content.Header>

        {children}
      </Content>
    </Wrapper>
  );
}

FormLayout.ProtoTypes = {
  children: PropTypes.element.isRequired,
}
