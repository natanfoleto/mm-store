import { BrowserRouter, Switch, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Profiles from "../pages/Profiles";
import NotFound from "../pages/NotFound";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/perfis" component={Profiles} />

        <Route component={NotFound} isNotFound />
      </Switch>
    </BrowserRouter>
  );
}