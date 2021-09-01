import PropTypes from 'prop-types';

import Header from '../../../components/Header';
import Breadcrumb from '../../../components/Breadcrumb'

import { Wrapper, Body } from './styles';

export default function FormLayout({ children, title }) {
  return (
    <Wrapper>
      <Header />

      <Breadcrumb title={title} />

      <Body>
        {children}
      </Body>
    </Wrapper>
  );
}

FormLayout.ProtoTypes = {
  children: PropTypes.element.isRequired
}
