
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';

import { useAuth } from '../contexts/auth';

const RouteWrapper = ({ component, isPrivate, isNotFound, ...props }) => {
  const { signed } = useAuth();

  if (isNotFound) 
    return <Route { ...props } component={ component } />;
  
  if (!signed && isPrivate) 
    return <Redirect to="/" />;

  if (signed && !isPrivate) 
    return <Redirect to="dashboard" />;
  
  return <Route { ...props } component={ component } />;
};

RouteWrapper.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func
  ])
};

export default RouteWrapper;
