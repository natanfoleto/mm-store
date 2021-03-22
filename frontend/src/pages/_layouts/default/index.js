import PropTypes from 'prop-types';

import Menu from '../../../components/Menu';

import { Wrapper, Content } from './styles';

export default function DefaultLayout({ children }) {
  return (
    <Wrapper>
      <Menu />

      <Content>
        {children}
      </Content>
    </Wrapper>
  );
}

DefaultLayout.ProtoTypes = {
  children: PropTypes.element.isRequired,
}
