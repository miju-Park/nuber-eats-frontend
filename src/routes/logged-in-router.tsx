import React from "react";
import { isLoggedInVar } from "../apollo";
import { gql, useQuery } from "@apollo/client";
import { meQuery } from "../__generated__/meQuery";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Restaurants from "../pages/client/restaurants";
import Header from "../components/header";
import { useMe } from "../hooks/useMe";
import NotFound from "../pages/404";
import ConfirmEmail from "../pages/user/confirm-email";
import EditProfile from "../pages/user/edit-profile";
import { Search } from "../pages/client/search";
import { Category } from "../pages/client/category";

const ClientRoutes = [
  <Route key={1} path="/" exact>
    <Restaurants />
  </Route>,
  <Route key={2} path="/confirm">
    <ConfirmEmail />
  </Route>,
  <Route key={3} path="/edit-profile">
    <EditProfile />
  </Route>,
  <Route key={4} path="/search">
    <Search />
  </Route>,
  <Route key={5} path="/category/:slug">
    <Category />
  </Route>,
];

const LoggedInRouter = () => {
  const { loading, error, data } = useMe();
  if (loading || error || !data) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="font-medium text-xl tracking-widest">Loading...</span>
      </div>
    );
  }
  return (
    <Router>
      <Header />
      <Switch>
        {data.me.role === "Owner" && ClientRoutes}
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
};
export default LoggedInRouter;
