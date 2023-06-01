import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Navigate, useLocation } from "react-router-dom";
import { RiHotelLine } from "react-icons/ri";
import { BsFillPersonFill } from "react-icons/bs";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { getAllUserPlaces } from "../redux/actions/places";
const Navigation = () => {
  const location = useLocation();
  const { pathname } = location;
  let basename = pathname.split("/").pop();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.loading.isLoading);
  const userData = useSelector((state) => state.auth);

  useEffect(() => {
    try {
      console.log("dispatching allPlaces");
      dispatch(getAllUserPlaces());
    } catch (error) {
      console.log(error);
    }
  }, []);

  if (isLoading) {
    return <h1>loading....</h1>;
  }
  if (!isLoading && !userData.user) {
    return <Navigate to={"/auth/login"} />;
  }
  if (basename === "account") {
    basename = "profile";
  }
  function linkClass(type) {
    let classes = "inline-flex gap-2 transition-shadow ease-in";
    if (type === basename) {
      classes += "link-primary md:px-6 md:py-2 px-1 py-0";
    } else {
      classes +=
        "font-poppins md:px-6 md:py-2 px-1 py-0 rounded-full border hover:shadow-md";
    }
    return classes;
  }
  return (
    <div className="flex justify-center items-center w-full mt-8 md:space-x-8 space-x-2 md:text-base text-[10px]">
      <Link className={linkClass("account")} to={"/account"}>
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
  );
};

export default Navigation;
