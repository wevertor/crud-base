import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "./AuthHelper";

//os componentes passados por parametro somente carregarão caso o usuário
//esteja autenticado
const PrivateRoute = ({ component: Component, ...rest }) => {
  <Route
    {...rest}
    render={(props) => {
      if (auth.isAuthenticated()) return <Component {...props} />;
      else
        return (
          <Redirect
            to={{ pathname: "/signin", state: { from: props.location } }}
          />
        );
    }}
  />;
};

export default PrivateRoute;
