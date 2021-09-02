import PropTypes from 'prop-types';

import Header from '../../../components/Header';
import Breadcrumb from '../../../components/Breadcrumb'

// import Navbar from '../../../components/Navbar';

import { Wrapper, Content } from './styles';

export default function DefaultLayout({ children, title }) {
  return (
    <Wrapper>
      <Header />

      <Content>
        {children}
      </Content>

      <Breadcrumb title={title} />
    </Wrapper>
  );
}

DefaultLayout.ProtoTypes = {
  children: PropTypes.element.isRequired,
}
