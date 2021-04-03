import { BrowserRouter, Switch, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Profiles from "../pages/Profiles";

import FormProfiles from "../pages/forms/Profiles";

import NotFound from "../pages/NotFound";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/perfis" component={Profiles} />

        <Route exact path="/perfis/add" component={FormProfiles} />
        <Route exact path="/perfis/edit" component={FormProfiles} />

        <Route component={NotFound} isNotFound />
      </Switch>
    </BrowserRouter>
  );
}