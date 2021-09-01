import PropTypes from 'prop-types';

import Header from '../../../components/Header';
import Breadcrumb from '../../../components/Breadcrumb'

import { Wrapper, Content } from './styles';

export default function DefaultLayout({ children, title }) {
  return (
    <Wrapper>
      <Header />

      <Breadcrumb title={title} />

      <Content>
        {children}
      </Content>
    </Wrapper>
  );
}

DefaultLayout.ProtoTypes = {
  children: PropTypes.element.isRequired,
}
