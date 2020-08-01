import React from "react";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import injectContext from "./AppContext";
import AdminLayout from "layouts/Admin.js";
import "assets/scss/material-dashboard-pro-react.scss?v=1.8.0";

const hist = createBrowserHistory();

function App() {
  return (
    <Router history={hist}>
      <Switch>
        <Route path="/admin" component={AdminLayout} />
        <Redirect from="/" to="/admin/dashboard" />
      </Switch>
    </Router>
  );
}

export default injectContext(App);
