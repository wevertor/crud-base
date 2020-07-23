import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./core/Home";
import Users from "./user/Users";
import Signup from "./user/Signup";
import Signin from "./auth/Signin";
import Profile from "./user/Profile";
import Edit from "./user/EditProfile";

const MainRouter = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/users" component={Users} />
      <Route path="/signup" component={Signup} />
      <Route path="/signin" component={Signin} />
      <Route path="/user/edit/:userId" component={Edit} />
      <Route path="/user/:userId" component={Profile} />
    </Switch>
  );
};
export default MainRouter;
