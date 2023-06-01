import React from "react";
import { Link } from "react-router-dom";
const IndexPlaceCard = ({ placeData }) => {
  return (
    <Link
      to={`/place/${placeData._id}`}
      className="flex flex-col font-poppins mb-8 "
    >
      <img
        className="object-cover aspect-square  rounded-xl mb-2"
        src={`http://localhost:3000/uploads/${placeData.photos[0]}`}
      />
      <div className="font-semibold leading-5 truncate ">
        {placeData.address}
      </div>
      <div className=" font-thin text-sm leading-2 truncate text-gray-600">
        {placeData.title}
      </div>
      <div className="font-thin text-sm leading-2  text-gray-600">
        {placeData.checkIn}-{placeData.checkOut} June
      </div>
      <div className="font-bold text-sm">
        ₹{placeData.price} <span className="font-normal">night</span>
      </div>
    </Link>
  );
};

export default IndexPlaceCard;
