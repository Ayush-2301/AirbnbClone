import React from "react";
import { useSelector } from "react-redux";
import { Link, Navigate, useParams } from "react-router-dom";
import { Profile } from "../components/index";
const AccountPage = () => {
  const isLoading = useSelector((state) => state.loading.isLoading);
  const userData = useSelector((state) => state.auth);
  if (isLoading) {
    return <h1>loading....</h1>;
  }
  if (!isLoading && !userData.user) {
    return <Navigate to={"/auth/login"} />;
  }
  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = "profile";
  }
  function linkClass(type = null) {
    let classes = "inline-flex gap-2 transition-shadow ease-in";
    if (type === subpage) {
      classes += " link-primary";
    } else {
      classes +=
        " font-poppins px-6 py-2 rounded-full border hover:shadow-md  ";
    }
    return classes;
  }
  return (
    <div>
      <div className="flex justify-center items-center w-full mt-8 space-x-8">
        <Link className={linkClass("profile")} to={"/account"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
            />
          </svg>
          My Profile
        </Link>
        <Link className={linkClass("bookings")} to={"/account/bookings"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
          My Bookings
        </Link>
        <Link className={linkClass("places")} to={"/account/places"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z"
            />
          </svg>
          My accommodation
        </Link>
      </div>
      {subpage === "profile" && (
        <div>
          <Profile />
        </div>
      )}
    </div>
  );
};

export default AccountPage;
