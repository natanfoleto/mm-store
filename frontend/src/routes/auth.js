import { BrowserRouter, Switch, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Profiles from "../pages/Profiles";
import Users from "../pages/Users";
import Categories from "../pages/Categories";
import Products from "../pages/Products";
import Providers from "../pages/Providers";
import Clients from "../pages/Clients";
import Permissions from "../pages/Permissions";

import FormProfiles from "../pages/Forms/Profiles";
import FormUsers from "../pages/Forms/Users";
import FormCategories from "../pages/Forms/Categories";
import FormProduct from "../pages/Forms/Products";
import FormProviders from "../pages/Forms/Providers";
import FormClients from "../pages/Forms/Clients";
import FormPermissions from "../pages/Forms/Permissions";

import NotFound from "../pages/NotFound";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/dash" component={Dashboard} />

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

        <Route exact path="/fornecedores" component={Providers} />
        <Route exact path="/fornecedores/add" component={FormProviders} />
        <Route exact path="/fornecedores/edit" component={FormProviders} />

        <Route exact path="/clientes" component={Clients} />
        <Route exact path="/clientes/add" component={FormClients} />
        <Route exact path="/clientes/edit" component={FormClients} />

        <Route exact path="/permissoes" component={Permissions} />
        <Route exact path="/permissoes/add" component={FormPermissions} />
        <Route exact path="/permissoes/edit" component={FormPermissions} />

        <Route component={NotFound} isNotFound />
      </Switch>
    </BrowserRouter>
  );
}