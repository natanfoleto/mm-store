import { BrowserRouter, Switch, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Profiles from "../pages/Profiles";
import Users from "../pages/Users";

import FormProfiles from "../pages/_forms/Profiles";
import FormUsers from "../pages/_forms/Users";

import NotFound from "../pages/NotFound";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Dashboard} />

        <Route exact path="/perfis" component={Profiles} />
        <Route exact path="/perfis/add" component={FormProfiles} />
        <Route exact path="/perfis/edit" component={FormProfiles} />

        <Route exact path="/usuarios" component={Users} />
        <Route exact path="/usuarios/add" component={FormUsers} />
        <Route exact path="/usuarios/edit" component={FormUsers} />

        <Route component={NotFound} isNotFound />
      </Switch>
    </BrowserRouter>
  );
}