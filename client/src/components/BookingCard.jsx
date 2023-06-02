import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ".././axiosConfig";
import { format, differenceInCalendarDays } from "date-fns";
import { AiTwotoneCalendar, AiOutlineArrowRight } from "react-icons/ai";
const BookingCard = ({ bookingData }) => {
  const [place, setPlace] = useState({});

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const { data } = await axios.get(
          "/user/places/getSinglePlace/" + bookingData.place
        );
        setPlace(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPlace();
  }, [bookingData.place]);

  if (Object.keys(place).length === 0) {
    return null;
  }

  return (
    <Link
      to={`/bookings/${bookingData._id}`}
      className="flex m-4 w-full   space-x-4 font-poppins bg-slate-300 rounded-xl  cursor-pointer hover:shadow-md transition-shadow ease-in"
    >
      <div className=" w-80  ">
        {!place.photos[0] ? (
          <div className="w-full h-[200px] rounded-l-xl bg-slate-400"></div>
        ) : (
          <img
            className="object-cover aspect-square w-full h-[200px] rounded-l-xl "
            src={`http://localhost:3000/uploads/${place.photos[0]}`}
            alt=""
          />
        )}
      </div>
      <div className="flex flex-col grow space-y-4 p-4 justify-center">
        <div className="text-2xl font-bold">{place.title}</div>
        <div className="flex gap-4 text-lg">
          <div className="flex gap-1">
            <AiTwotoneCalendar size={20} />
            {format(new Date(bookingData.checkIn), "yyyy-MM-dd")}
          </div>
          <AiOutlineArrowRight size={20} />
          <div className="flex gap-1">
            <AiTwotoneCalendar size={20} />
            {format(new Date(bookingData.checkOut), "yyyy-MM-dd")}
          </div>
        </div>
        <div className="flex gap-2 font-poppins text-lg">
          <div className="border-r pr-2 border-black">
            {differenceInCalendarDays(
              new Date(bookingData.checkOut),
              new Date(bookingData.checkIn)
            )}{" "}
            <span className="font-semibold">Nights</span>
          </div>
          <div>
            <span className="font-semibold">Total Price</span>: ₹
            {bookingData.price}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BookingCard;
