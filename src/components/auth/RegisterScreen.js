import React from "react";
import { useForm } from "../../hooks/useForm";
import { Link } from "react-router-dom";
import validator from "validator";
import { useDispatch, useSelector } from "react-redux";
import { removeError, setError } from "../../actions/ui";
import { startRegisterEmailPasswordName } from "../../actions/auth";
export const RegisterScreen = () => {
  const dispatch = useDispatch();

  const { msgError } = useSelector((state) => state.ui);

  const [formState, handleInputChange] = useForm({
    name: "Javier",
    email: "ringo.larios@gmail.com",
    password: "123123",
    password2: "123123",
  });
  const { name, email, password, password2 } = formState;
  const handleRegister = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      dispatch(startRegisterEmailPasswordName(email, password, name));
    }
  };

  const isFormValid = () => {
    if (name.trim().length === 0) {
      dispatch(setError("Name is Required"));
      return false;
    } else if (!validator.isEmail(email)) {
      dispatch(setError("email no es valido"));
      return false;
    } else if (password !== password2 || password.length < 5) {
      dispatch(
        setError(
          "Password should be at least 6 characters and match each other"
        )
      );
      return false;
    }
    dispatch(removeError());
    return true;
  };
  return (
    <>
      <h3 className="auth__title"> Register</h3>
      <form
        onSubmit={handleRegister}
        className="animate__animated animate__fadeIn animate__faster"
      >
        {msgError && <div className="auth__alert-error">{msgError}</div>}
        <input
          type="text"
          placeholder="Name"
          className="auth__input"
          name="name"
          autoComplete="off"
          value={name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="email"
          className="auth__input"
          name="email"
          autoComplete="off"
          value={email}
          onChange={handleInputChange}
        />
        <input
          type="password"
          placeholder="Password"
          className="auth__input"
          name="password"
          value={password}
          onChange={handleInputChange}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="auth__input"
          name="password2"
          value={password2}
          onChange={handleInputChange}
        />
        <button
          type="submit"
          className="btn btn-primary btn-block mb-5"
          disabled={false}
        >
          Register
        </button>

        <Link to="/auth/login" className="link">
          Already Registered ?
        </Link>
      </form>
    </>
  );
};
