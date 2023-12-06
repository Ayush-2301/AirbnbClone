import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSinglePlace } from "../redux/actions/places";
import { getAllBookings } from "../redux/actions/booking";
import { TbGridDots } from "react-icons/tb";
import { TfiClose } from "react-icons/tfi";
import { GoLocation } from "react-icons/go";
import { format, differenceInCalendarDays } from "date-fns";
import { AiTwotoneCalendar, AiOutlineArrowRight } from "react-icons/ai";

const SingleBooking = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllBookings());
  }, [dispatch]);

  const bookingsInfo = useSelector((state) => state.bookings.bookingsInfo);

  const [bookingState, setBookingState] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (bookingsInfo) {
      const foundBooking = bookingsInfo.find((obj) => obj._id === id);
      if (foundBooking) {
        setBookingState(foundBooking);
        dispatch(getSinglePlace(foundBooking.place)).then(() => {
          setLoading(false);
        });
      }
    }
  }, [bookingsInfo, dispatch, id]);

  const singlePlaceData = useSelector((state) => state.places.singlePlaceInfo);
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  if (loading) return <div>...loading</div>;

  if (showAllPhotos) {
    return (
      <div className="absolute inset-0 bg-black min-h-full min-w-full">
        <div className="p-8 bg-black flex flex-col justify-center">
          <div className="mb-4">
            <div className="text-3xl text-white font-poppins self-start">
              Photos of {singlePlaceData.title}
            </div>
            <button
              onClick={() => setShowAllPhotos(false)}
              className="fixed font-medium right-20 top-10 leading-3 px-4 py-2 font-poppins rounded-full flex items-center gap-1"
            >
              <TfiClose size={20} />
              Close photos
            </button>
          </div>
          <div className="flex justify-center items-center flex-col gap-4">
            {singlePlaceData.photos.length > 0 &&
              singlePlaceData.photos.map((photo) => (
                <div className="w-[50%]">
                  <img
                    className="aspect-square object-cover"
                    src={`https://airbnb-owrj.onrender.com/uploads/${photo}`}
                    alt=""
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4 flex flex-col min-h-full mx-20 px-8 py-8 justify-center items-center">
      <div className="w-[90%]">
        <div className="text-3xl font-semibold">{singlePlaceData.title}</div>
        <div className="underline font-semibold flex gap-1 items-center">
          <GoLocation size={20} />
          {singlePlaceData.address}
        </div>
      </div>
      <div className="w-[90%] bg-slate-300 p-4 rounded-lg mt-4">
        <div className="space-y-4">
          <div className="text-2xl font-bold">Your Booking Information</div>
          <div>
            <div className="flex gap-2 font-poppins text-lg">
              <div className="border-r pr-2 border-black">
                {differenceInCalendarDays(
                  new Date(bookingState.checkOut),
                  new Date(bookingState.checkIn)
                )}{" "}
                <span className="font-semibold">Nights</span>
              </div>
              <div>
                <span className="font-semibold">Total Price</span>: ₹
                {bookingState.price}
              </div>
            </div>
            <div className="flex gap-4 text-lg">
              <div className="flex gap-1">
                <AiTwotoneCalendar size={20} />
                {format(new Date(bookingState.checkIn), "yyyy-MM-dd")}
              </div>
              <AiOutlineArrowRight size={20} />
              <div className="flex gap-1">
                <AiTwotoneCalendar size={20} />
                {format(new Date(bookingState.checkOut), "yyyy-MM-dd")}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-[2.5fr_1fr] gap-2 my-8 mb-16 w-[90%]">
        <div>
          {singlePlaceData.photos[0] && (
            <div>
              <img
                onClick={() => setShowAllPhotos(true)}
                className="object-cover h-[450px] w-full rounded-l-2xl cursor-pointer"
                src={`https://airbnb-owrj.onrender.com/uploads/${singlePlaceData.photos[0]}`}
                alt=""
              />
            </div>
          )}
        </div>
        <div className="grid relative">
          <img
            onClick={() => setShowAllPhotos(true)}
            className="object-cover rounded-tr-2xl w-full h-[225px] cursor-pointer"
            src={`https://airbnb-owrj.onrender.com/uploads/${singlePlaceData.photos[1]}`}
            alt=""
          />
          <div className="overflow-hidden rounded-br-2xl">
            <img
              onClick={() => setShowAllPhotos(true)}
              className="object-cover w-full h-[225px] relative top-2 cursor-pointer"
              src={`https://airbnb-owrj.onrender.com/uploads/${singlePlaceData.photos[2]}`}
              alt=""
            />
          </div>

          <button
            onClick={() => setShowAllPhotos(true)}
            className="absolute bottom-5 bg-white font-medium leading-3 right-5 px-4 py-2 font-poppins rounded-full flex items-center gap-1"
          >
            <TbGridDots size={20} />
            Show all photos
          </button>
        </div>
      </div>
      <div className="grid grid-cols-[3fr_1fr] gap-2 w-[90%] font-poppins">
        <div className="mr-2">
          <div className="text-3xl font-semibold">Description</div>
          <div className="my-4 leading-6">{singlePlaceData.description}</div>
          <div className="font-semibold text-lg">
            Check In:{" "}
            <span className="font-normal"> {singlePlaceData.checkIn}</span>
          </div>
          <div className="font-semibold text-lg">
            Check Out:{" "}
            <span className="font-normal"> {singlePlaceData.checkOut}</span>
          </div>
          <div className="font-semibold text-lg">
            Maximum guest allowed:{" "}
            <span className="font-normal"> {singlePlaceData.maxGuest}</span>
          </div>
        </div>
      </div>
      <div className="w-[90%] mt-4">
        <div className="text-3xl font-semibold">Extra Info</div>
        <div className="my-4 leading-6">{singlePlaceData.extraInfo}</div>
      </div>
    </div>
  );
};

export default SingleBooking;
