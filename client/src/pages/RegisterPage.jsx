import React, { useState } from "react";
import { Link } from "react-router-dom";
const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  function registerUser() {}
  return (
    <div className="grow flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center max-w-md w-full mb-24 ">
        <p className="font-poppins text-4xl mb-4 font-medium">Register</p>
        <form onSubmit={registerUser}>
          <input
            type="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="your@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
