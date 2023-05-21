import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../redux/actions/auth.js";

const LoginPage = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [redirect, setRedirect] = useState(false);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  function loginUser(e) {
    e.preventDefault();
    try {
      const { email, password } = values;
      dispatch(login(email, password));
      setRedirect(true);
    } catch (error) {
      console.log(error);
    }
  }
  if (redirect) {
    return <Navigate to={"/"} />;
  }
  return (
    <div className="grow flex flex-col justify-center items-center font-poppins">
      <div className="flex flex-col justify-center items-center max-w-md w-full mb-24 ">
        <p className="font-poppins text-4xl mb-4 font-medium">Login</p>
        <form onSubmit={loginUser}>
          <input
            type="email"
            placeholder="your@gmail.com"
            name="email"
            value={values.email}
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="password"
            name="password"
            value={values.password}
            onChange={handleChange}
          />
          <button className="primary">Login</button>
        </form>
        <div>
          Don't have an account yet?
          <Link
            className="ml-1 font-semibold underline cursor-pointer "
            to={"/auth/register"}
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
