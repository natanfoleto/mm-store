import PropTypes from 'prop-types';

import { Content } from './styles';

export default function DefaultLayout({ children }) {
  return (
    <Content>
      {children}
    </Content>
  );
}

DefaultLayout.ProtoTypes = {
  children: PropTypes.element.isRequired,
}
