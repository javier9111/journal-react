import React from "react";
import { Redirect, Route } from "react-router-dom";
import Proptypes from "prop-types";
// this component is used to protect the routes, the props declared here are for getting the neeeded values to check if is the userd logged.
export const PrivateRoute = ({
  isAuthenticated,
  component: Component,
  ...rest
}) => {
  return (
    // this section will render a component if the user is authenticated otherwise it will return to the login screen,
    //  the component props had to hava a callback in order to check the props
    <Route
      {...rest}
      component={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/auth/login" />
        )
      }
    />
  );
};

PrivateRoute.propTypes = {
  isAuthenticated: Proptypes.bool.isRequired,
  component: Proptypes.func.isRequired,
};
