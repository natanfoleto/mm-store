import Route from './Route';
import { Switch } from 'react-router-dom';

import PageNotFound from '../pages/404';
import Main from '../pages/Main';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Main} />

      <Route path="/" component={PageNotFound} />
    </Switch>
  );
}