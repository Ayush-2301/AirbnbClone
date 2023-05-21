import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { register } from "../redux/actions/auth";
const RegisterPage = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [redirect, setRedirect] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  function registerUser(e) {
    e.preventDefault();
    try {
      const { name, email, password } = values;
      dispatch(register(name, email, password));
      setRedirect(true);
    } catch (error) {
      console.log(error);
    }
  }
  if (redirect) {
    return <Navigate to={"/"} />;
  }
  return (
    <div className="grow flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center max-w-md w-full mb-24 ">
        <p className="font-poppins text-4xl mb-4 font-medium">Register</p>
        <form onSubmit={registerUser}>
          <input
            type="name"
            name="name"
            placeholder="Name"
            value={values.name}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="your@gmail.com"
            value={values.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="password"
            value={values.password}
            onChange={handleChange}
          />
          <button className="primary">Register</button>
        </form>
        <div>
          Already a member?
          <Link
            className="ml-1  font-semibold underline cursor-pointer "
            to={"/auth/login"}
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
