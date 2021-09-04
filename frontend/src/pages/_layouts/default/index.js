import PropTypes from 'prop-types';

import Header from '../../../components/Header';
import Sidebar from '../../../components/Sidebar'

import { Wrapper, Container, Content } from './styles';

export default function DefaultLayout({ children, title }) {
  return (
    <Wrapper>
      <Header title={title} />

      <Container>
        <Sidebar />

        <Content>
          {children}
        </Content>
      </Container>
    </Wrapper>
  );
}

DefaultLayout.ProtoTypes = {
  children: PropTypes.element.isRequired,
}
