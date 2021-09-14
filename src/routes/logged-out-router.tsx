import React from "react";
import { useForm } from "react-hook-form";
import { isLoggedInVar } from "../apollo";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "../pages/login";
import CreateAccount from "../pages/create-account";

const LoggedOutRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path="/create-account">
          <CreateAccount />
        </Route>
        <Route path="/">
          <Login />
        </Route>
      </Switch>
    </Router>
  );
};
export default LoggedOutRouter;
