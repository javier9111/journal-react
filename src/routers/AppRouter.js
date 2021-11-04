import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";

import { AuthRouter } from "./AuthRouter";
import { JournalScreen } from "../components/journal/JournalScreen";
import { getAuth } from "@firebase/auth";
import { useDispatch } from "react-redux";
import { login } from "../actions/auth";
import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";
import { startLoadingNotes } from "../actions/notes";
export const AppRouter = () => {
  const dispatch = useDispatch();

  const [checking, setChecking] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  //this use effect is required to validate the authentication state, and the checking state is only to be used
  //check if the authentification has finish, this allows us to wait until the sign in is being completed.
  useEffect(() => {
    const auth = getAuth();
    auth.onAuthStateChanged((user) => {
      if (user?.uid) {
        dispatch(login(user.uid, user.displayName));
        setIsLoggedIn(true);
        dispatch(startLoadingNotes(user.uid));
      } else {
        setIsLoggedIn(false);
      }
      setChecking(false);
    });
  }, [dispatch, setChecking]); //since we have another state we have added the dependency to it.

  if (checking) {
    return <h1>Espere .....</h1>;
  }
  return (
    <Router>
      <div>
        <Switch>
          <PublicRoute
            path="/auth"
            component={AuthRouter}
            isAuthenticated={isLoggedIn}
          />
          <PrivateRoute
            path="/"
            component={JournalScreen}
            isAuthenticated={isLoggedIn}
          />
          <Redirect to="/auth/login" />
        </Switch>
      </div>
    </Router>
  );
};
