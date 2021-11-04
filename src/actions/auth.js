import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "@firebase/auth";
import { types } from "../components/types/types";
import { googleAuthProvider } from "../firebase/firebase-config";
import { finishLoading, startLoading } from "./ui";
import Swal from "sweetalert2";
import { notesLogout } from "./notes";

export const startLoginEmailPassword = (email, password) => {
  return (dispatch) => {
    dispatch(startLoading());
    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        dispatch(login(user.uid, user.displayName));
        dispatch(finishLoading());
      })
      .catch((error) => {
        const errorMessage = error.message;
        dispatch(finishLoading());
        console.log(error);
        Swal.fire("Error", errorMessage, "error");
      });
  };
};

export const startRegisterEmailPasswordName = (email, password, name) => {
  return (dispatch) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(async ({ user }) => {
        await updateProfile(user, { displayName: name });

        dispatch(login(user.uid, user.displayName));
      })
      .catch((error) => {
        console.log(error);
        Swal.fire("Error", error.message, "error");
      });
  };
};
/**
 * when is a asyc function the callback is required
 * @returns
 */
export const startGoogleLogin = () => {
  return (dispatch) => {
    const auth = getAuth();
    signInWithPopup(auth, googleAuthProvider).then(({ user }) => {
      dispatch(login(user.uid, user.displayName));
    });
  };
};

export const login = (uid, displayName) => ({
  type: types.login,
  payload: {
    uid,
    displayName,
  },
});

export const startLogout = () => {
  return async (dispatch) => {
    const auth = getAuth();
    await auth.signOut();

    dispatch(logout());
    dispatch(notesLogout());
  };
};

export const logout = () => ({
  type: types.logout,
});
