import React from "react";
import { NavBar } from "../components/index";
import { Outlet } from "react-router-dom";
const LandingPage = () => {
  return (
    <div className="px-8 py-4 flex flex-col min-h-screen">
      <NavBar />
      <Outlet />
    </div>
  );
};

export default LandingPage;
