import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Navigate, useParams } from "react-router-dom";
import { Profile, Places } from "../components/index";
import { RiHotelLine } from "react-icons/ri";
import { BsFillPersonFill } from "react-icons/bs";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { getAllPlaces } from "../redux/actions/places";
const AccountPage = () => {
  let { subpage } = useParams();
  const isLoading = useSelector((state) => state.loading.isLoading);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth);

  useEffect(() => {
    try {
      console.log("dispatching allPlaces");
      dispatch(getAllPlaces());
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
  if (subpage === undefined) {
    subpage = "profile";
  }
  function linkClass(type = null) {
    let classes = "inline-flex gap-2 transition-shadow ease-in";
    if (type === subpage) {
      classes += " link-primary md:px-6 md:py-2 px-1 py-0";
    } else {
      classes +=
        " font-poppins md:px-6 md:py-2 px-1 py-0 rounded-full border hover:shadow-md  ";
    }
    return classes;
  }
  return (
    <div>
      <div className="flex justify-center items-center w-full mt-8 md:space-x-8 space-x-2  md:text-base text-[10px]">
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
      {subpage === "profile" && <Profile />}
      {subpage === "places" && <Places />}
    </div>
  );
};

export default AccountPage;
