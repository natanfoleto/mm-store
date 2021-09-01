import PropTypes from 'prop-types';

import Header from '../../../components/Header';
import Breadcrumb from '../../../components/Breadcrumb'

import { Wrapper, Body } from './styles';

export default function FormLayout({ children, title }) {
  return (
    <Wrapper>
      <Header />

      <Body>
        {children}
      </Body>

      <Breadcrumb title={title} />
    </Wrapper>
  );
}

FormLayout.ProtoTypes = {
  children: PropTypes.element.isRequired
}
