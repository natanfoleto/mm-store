import { BrowserRouter, Switch, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Profiles from "../pages/Profiles";
import Users from "../pages/Users";
import Categories from "../pages/Categories";
import Products from "../pages/Products";
import Permissions from "../pages/Permissions";

import FormProfiles from "../pages/_forms/Profiles";
import FormUsers from "../pages/_forms/Users";
import FormCategories from "../pages/_forms/Categories";
import FormProduct from "../pages/_forms/Products";
import FormPermissions from "../pages/_forms/Permissions";

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

        <Route exact path="/categorias" component={Categories} />
        <Route exact path="/categorias/add" component={FormCategories} />
        <Route exact path="/categorias/edit" component={FormCategories} />

        <Route exact path="/produtos" component={Products} />
        <Route exact path="/produtos/add" component={FormProduct} />
        <Route exact path="/produtos/edit" component={FormProduct} />

        <Route exact path="/permissoes" component={Permissions} />
        <Route exact path="/permissoes/add" component={FormPermissions} />
        <Route exact path="/permissoes/edit" component={FormPermissions} />

        <Route component={NotFound} isNotFound />
      </Switch>
    </BrowserRouter>
  );
}