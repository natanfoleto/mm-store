import Route from './Route';
import { Switch } from 'react-router-dom';

import PageNotFound from '../pages/404';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Login} />
      <Route path="/dashboard" component={Dashboard} />

      <Route path="/" component={PageNotFound} />
    </Switch>
  );
}