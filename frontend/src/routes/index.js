import { BrowserRouter, Switch } from "react-router-dom";
import Route from './Route';

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Perfils from "../pages/Perfils";
import NotFound from "../pages/NotFound";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/dashboard" component={Dashboard} isPrivate />
        <Route path="/perfils" component={Perfils} isPrivate />

        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}