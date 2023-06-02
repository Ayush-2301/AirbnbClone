import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBookings } from "../redux/actions/booking";
import { getSinglePlace } from "../redux/actions/places";
import { BookingCard } from "./index";

const Bookings = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllBookings());
  }, []);
  const bookingsData = useSelector((state) => state.bookings.bookingsInfo);

  return (
    <div className=" flex flex-col justify-center items-center mt-8 font-poppins h-full mb-8 mx-auto px-4">
      {bookingsData.length > 0 &&
        bookingsData.map((bookingData) => {
          return (
            <BookingCard key={bookingData._id} bookingData={bookingData} />
          );
        })}
    </div>
  );
};

export default Bookings;
