import { BrowserRouter, Switch } from "react-router-dom";
import Route from './Route';

import SignIn from "../pages/SignIn";
import Dashboard from "../pages/Dashboard";
import Profiles from "../pages/Profiles";
import NotFound from "../pages/NotFound";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={SignIn} isLogin />
        <Route exact path="/dashboard" redirect="/perfils" component={Dashboard} isPrivate />
        <Route exact path="/perfils" component={Profiles} isPrivate />

        <Route component={NotFound} isNotFound />
      </Switch>
    </BrowserRouter>
  );
}