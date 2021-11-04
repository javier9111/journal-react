import React from "react";
import { Route, Redirect } from "react-router-dom";
import Proptypes from "prop-types";
export const PublicRoute = ({
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
        isAuthenticated ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
};
PublicRoute.propTypes = {
  isAuthenticated: Proptypes.bool.isRequired,
  component: Proptypes.func.isRequired,
};
