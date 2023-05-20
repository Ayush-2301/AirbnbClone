import React from "react";
import logo from "../assets/airbnb.svg";
import { BiSearch } from "react-icons/bi";
import { RxHamburgerMenu } from "react-icons/rx";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
const NavBar = () => {
  return (
    <div className="flex justify-between items-center  p-4  border-b">
      <div>
        <Link to={"/"}>
          <img className="w-[35px]" src={logo} alt="airnb logo" />
        </Link>
      </div>
      <div className="flex border p-2 px-4 font-poppins rounded-full shadow text-[14px] hover:shadow-md transition-shadow ease-in hover:cursor-pointer">
        <div className="flex divide-x-[1.5px] justify-center items-center">
          <div className="px-2">Anywhere</div>
          <div className="px-2">Any week</div>
          <div className="px-2 text-gray-400 font-thin">Add Guests</div>
        </div>
        <button className=" w-9 h-9 flex justify-center items-center rounded-full bg-primary">
          <BiSearch className="text-white font-bold rounded-full" size={20} />
        </button>
      </div>
      <Link
        to={"/auth/login"}
        className="flex justify-center space-x-2 items-center p-2 rounded-full border hover:shadow-md transition-shadow ease-in hover:cursor-pointer"
      >
        <RxHamburgerMenu size={20} className="font-bold" />
        <CgProfile size={30} className="text-gray-500" />
      </Link>
    </div>
  );
};

export default NavBar;
