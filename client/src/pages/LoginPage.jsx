import React from "react";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div className="grow flex flex-col justify-center items-center font-poppins">
      <div className="flex flex-col justify-center items-center max-w-md w-full mb-24 ">
        <p className="font-poppins text-4xl mb-4 font-medium">Login</p>
        <input type="email" placeholder="your@gmail.com" />
        <input type="password" placeholder="password" />
        <button className="primary">Login</button>
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
