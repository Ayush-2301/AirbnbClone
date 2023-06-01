import React from "react";
import { useSelector } from "react-redux";
import { Link, Navigate, useLocation } from "react-router-dom";
import { Profile, Places } from "../components/index";
import { RiHotelLine } from "react-icons/ri";
import { BsFillPersonFill } from "react-icons/bs";
import { AiOutlineUnorderedList } from "react-icons/ai";
const AccountPage = () => {
  const location = useLocation();
  const { pathname } = location;
  let basename = pathname.split("/")?.[2];
  const userData = useSelector((state) => state.auth);
  if (!userData.user) {
    return <Navigate to={"/auth/login"} />;
  }
  if (basename === undefined) {
    basename = "profile";
  }
  function linkClass(type = null) {
    let classes = " inline-flex gap-2 transition-shadow ease-in ";
    if (type === basename) {
      classes += " link-primary md:px-6 md:py-2 px-1 py-0 ";
    } else {
      classes +=
        " font-poppins md:px-6 md:py-2 px-1 py-0 rounded-full border hover:shadow-md ";
    }
    return classes;
  }
  return (
    <div>
      <div className="flex  justify-center items-center w-full mt-8 md:space-x-8 space-x-2 md:text-base text-[10px]">
        <Link className={linkClass("profile")} to={"/account"}>
          <BsFillPersonFill size={20} />
          My Profile
        </Link>
        <Link className={linkClass("bookings")} to={"/account/bookings"}>
          <AiOutlineUnorderedList size={20} />
          My Bookings
        </Link>
        <Link className={linkClass("places")} to={"/account/places"}>
          <RiHotelLine size={20} />
          My accommodation
        </Link>
      </div>
      {basename === "profile" && <Profile />}
      {basename === "places" && <Places />}
    </div>
  );
};

export default AccountPage;
