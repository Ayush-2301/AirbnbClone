import React from "react";
import logo from "../assets/airbnb.svg";
import { BiSearch } from "react-icons/bi";
import { RxHamburgerMenu } from "react-icons/rx";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import logotext from "../assets/pngwing.com.png";
const NavBar = () => {
  const userName = useSelector((state) => state.auth.user);
  return (
    <div className="flex justify-between items-center  px-4 pb-4 border-b">
      <div className="flex gap-2 items-center justify-center">
        <Link to={"/"} className="flex justify-center items-center">
          <img className="w-[35px]" src={logo} alt="airnb logo" />
          <img className="w-[80px]" src={logotext} alt="" />
        </Link>
      </div>
      <div className="hidden sm:flex border p-2 px-4 font-poppins rounded-full shadow text-[14px] hover:shadow-md transition-shadow ease-in hover:cursor-pointer">
        <div className=" flex divide-x-[1.5px] justify-center items-center ">
          <div className="px-2">Anywhere</div>
          <div className="px-2">Any week</div>
          <div className="px-2 text-gray-400 font-thin">Add Guests</div>
        </div>
        <button className=" w-9 h-9 flex justify-center items-center rounded-full bg-primary">
          <BiSearch className="text-white font-bold rounded-full" size={20} />
        </button>
      </div>
      <Link
        to={userName ? "/account" : "/auth/login"}
        className="flex justify-center space-x-2 items-center p-2 rounded-full border hover:shadow-md transition-shadow ease-in hover:cursor-pointer font-poppins font-medium"
      >
        <RxHamburgerMenu size={20} className="font-bold" />
        <CgProfile size={30} className="text-gray-500" />
        {userName && <p className="pr-1 capitalize">{userName}</p>}
      </Link>
    </div>
  );
};

export default NavBar;
