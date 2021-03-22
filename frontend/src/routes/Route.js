import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import { useAuth } from '../contexts/auth';

export default function RouteWrapper({
  component: Component,
  isPrivate,
  path,
  ...rest
}) {
  const { signed } = useAuth();

  if (!signed && isPrivate)
    return <Redirect to="/"/>;

  if (signed && !isPrivate)
    return <Redirect to="/dashboard"/>;
  
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
