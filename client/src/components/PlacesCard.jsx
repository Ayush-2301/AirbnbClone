import React from "react";
import { Link } from "react-router-dom";
const SERVER_URL = import.meta.env.VITE_API_URL;
const PlacesCard = ({ place }) => {
  return (
    <Link
      to={`/account/places/${place._id}`}
      className="flex m-4 w-full h-[250px] border p-6 space-x-4 font-poppins bg-slate-300 rounded-md  cursor-pointer hover:shadow-md transition-shadow ease-in"
    >
      <div className="grow min-w-[20%] border">
        {!place.photos[0] ? (
          <div className="w-full h-[200px] rounded-md bg-slate-400"></div>
        ) : (
          <img
            className="object-cover w-full h-[200px] rounded-md"
            src={`${SERVER_URL}/uploads/${place.photos[0]}`}
            alt=""
          />
        )}
      </div>
      <div className="flex flex-col grow space-y-3">
        <div className="text-2xl font-bold">{place.title}</div>
        <div className=" text-[17px] p-2">{place.description}</div>
      </div>
    </Link>
  );
};

export default PlacesCard;
