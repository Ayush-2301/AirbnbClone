import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/actions/auth";
import { Navigate } from "react-router-dom";
const Profile = () => {
  const [redirect, setRedirect] = useState(false);
  const userData = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleLogOut = () => {
    try {
      dispatch(logout());
      setRedirect(true);
    } catch (error) {
      console.log(error);
    }
  };
  if (redirect) {
    return <Navigate to={"/"} />;
  }
  return (
    <div className="font-poppins flex justify-center items-center flex-col mx-auto mt-8 space-y-4">
      <div className="flex">
        <p>Logged in as :</p>
        <p className="ml-1">{userData.user}</p>
      </div>
      <div className="flex">
        <p>Email :</p>
        <p className="ml-1">{userData.email}</p>
      </div>
      <button onClick={handleLogOut} className="primary max-w-sm">
        Log out
      </button>
    </div>
  );
};

export default Profile;
