import { BrowserRouter, Switch, Route } from "react-router-dom";

import SignIn from "../pages/SignIn";
import NotFound from "../pages/NotFound";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={SignIn} />

        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}