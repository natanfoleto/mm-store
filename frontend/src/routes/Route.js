import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

export default function RouteWrapper({
  component: Component,
  ...rest
}) {
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

RouteWrapper.defaulProps = {
  isPrivate: false,
};
