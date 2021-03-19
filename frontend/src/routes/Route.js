import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import { getItem } from '../utils/LocalStorage';

export default function RouteWrapper({
  component: Component,
  isPrivate,
  ...rest
}) {
  const signed = getItem('auth');

  if (!signed && isPrivate) {
    return <Redirect to="/"/>;
  }

  if (signed && !isPrivate) {
    return <Redirect to="/dashboard"/>;
  }

  return <Route {...rest} 
    render={props => (
      <Component {...props} />
    )}
  />;
}

RouteWrapper.protoType = {
  isPrivate: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
};

RouteWrapper.defaultProps = {
  isPrivate: false,
};
