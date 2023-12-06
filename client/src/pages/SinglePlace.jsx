import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSinglePlace } from "../redux/actions/places";
import { createBooking } from "../redux/actions/booking";
import { TbGridDots } from "react-icons/tb";
import { TfiClose } from "react-icons/tfi";
import { GoLocation } from "react-icons/go";
import { differenceInCalendarDays } from "date-fns";
const SinglePlace = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSinglePlace(id));
  }, [dispatch]);
  const singlePlaceData = useSelector((state) => state.places.singlePlaceInfo);

  const [showAllphotos, setShowAllphotos] = useState(false);
  const [values, setValues] = useState({
    checkIn: "",
    checkOut: "",
    numberOfguest: 1,
  });
  const [bookingData, setBookingData] = useState({
    name: useSelector((state) => state.auth.user),
    phoneNumber: "",
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  let numberOfdays = 0;
  if (values.checkIn && values.checkOut) {
    numberOfdays = differenceInCalendarDays(
      new Date(values.checkOut),
      new Date(values.checkIn)
    );
  }
  const handleBooking = (e) => {
    e.preventDefault();
    try {
      const data = {
        name: bookingData.name,
        phone: bookingData.phoneNumber,
        checkIn: values.checkIn,
        checkOut: values.checkOut,
        price: numberOfdays * singlePlaceData.price,
        place: singlePlaceData._id,
      };
      dispatch(createBooking(data));
      navigate("/account/bookings");
    } catch (error) {
      console.log(error);
    }
  };
  if (!singlePlaceData) return <div>...loading</div>;
  if (showAllphotos)
    return (
      <div className="absolute inset-0 bg-black min-h-full min-w-full">
        <div className="p-8  bg-black flex flex-col justify-center  ">
          <div className="mb-4">
            <div className="text-3xl text-white font-poppins self-start">
              Photos of {singlePlaceData.title}
            </div>
            <button
              onClick={() => setShowAllphotos(false)}
              className="fixed font-medium  right-20 top-10 leading-3  px-4 py-2 font-poppins rounded-full flex  items-center gap-1"
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
  return (
    <div className=" mt-4 flex flex-col min-h-full mx-20 px-8 py-8 justify-center items-center ">
      <div className=" w-[90%]">
        <div className="text-3xl font-semibold">{singlePlaceData.title}</div>
        <div className="underline font-semibold flex gap-1 items-center">
          <GoLocation size={20} />
          {singlePlaceData.address}
        </div>
      </div>
      <div className="grid grid-cols-[2.5fr_1fr] gap-2 my-8 mb-16  w-[90%]  ">
        <div>
          {singlePlaceData.photos[0] && (
            <div>
              <img
                onClick={() => setShowAllphotos(true)}
                className=" object-cover  h-[450px] w-full rounded-l-2xl cursor-pointer"
                src={`https://airbnb-owrj.onrender.com/uploads/${singlePlaceData.photos[0]}`}
                alt=""
              />
            </div>
          )}
        </div>
        <div className="grid relative">
          <img
            onClick={() => setShowAllphotos(true)}
            className="object-cover  rounded-tr-2xl w-full h-[225px] cursor-pointer"
            src={`https://airbnb-owrj.onrender.com/uploads/${singlePlaceData.photos[1]}`}
            alt=""
          />
          <div className="overflow-hidden rounded-br-2xl ">
            <img
              onClick={() => setShowAllphotos(true)}
              className="object-cover  w-full h-[225px]  relative top-2 cursor-pointer  "
              src={`https://airbnb-owrj.onrender.com/uploads/${singlePlaceData.photos[2]}`}
              alt=""
            />
          </div>

          <button
            onClick={() => setShowAllphotos(true)}
            className="absolute bottom-5 bg-white font-medium  leading-3 right-5  px-4 py-2 font-poppins rounded-full flex  items-center gap-1"
          >
            <TbGridDots size={20} />
            Show all photos
          </button>
        </div>
      </div>
      <div className="grid grid-cols-[3fr_1fr] gap-2 w-[90%] font-poppins">
        <div className="mr-2">
          <div className="text-3xl font-semibold">Description</div>
          <div className="my-4 leading-6 ">{singlePlaceData.description}</div>
          <div className="font-semibold text-lg ">
            Check In :
            <span className="font-normal"> {singlePlaceData.checkIn}</span>
          </div>
          <div className="font-semibold text-lg ">
            Check Out :
            <span className="font-normal"> {singlePlaceData.checkOut}</span>
          </div>
          <div className="font-semibold text-lg ">
            Maximum guest allowed :
            <span className="font-normal"> {singlePlaceData.maxGuest}</span>
          </div>
        </div>
        <div className="flex flex-col border rounded-2xl shadow-lg p-4 font-poppins ">
          <div className="ml-1 text-xl font-semibold">
            Price:{" "}
            <span className="font-normal">₹{singlePlaceData.price}/night</span>
          </div>
          <div className="border rounded-2xl mt-2">
            <div className="flex  ">
              <div className="grow border-r py-3 px-4">
                <label className="text-lg font-semibold ">Check in</label>
                <input
                  type="date"
                  value={values.checkIn}
                  name="checkIn"
                  className="text-gray-500"
                  onChange={handleChange}
                />
              </div>
              <div className="grow py-3 px-4">
                <label className="text-lg font-semibold"> Check out</label>
                <input
                  type="date"
                  value={values.checkOut}
                  name="checkOut"
                  className="text-gray-500"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="border-t px-4 pt-2">
              <label className="text-lg font-semibold">No. of Guest</label>
              <input
                type="number"
                className="text-gray-500"
                placeholder="1"
                value={values.numberOfguest}
                name="numberOfguest"
                onChange={handleChange}
              />
            </div>
            {numberOfdays > 0 && bookingData.name && (
              <div className=" px-4 py-2">
                <label className="text-lg font-semibold">Phone Number</label>
                <input
                  type="number"
                  className="text-gray-500"
                  placeholder="+91"
                  value={bookingData.phoneNumber}
                  name="phoneNumber"
                  onChange={(e) => {
                    setBookingData({
                      ...bookingData,
                      phoneNumber: e.target.value,
                    });
                  }}
                />
              </div>
            )}
          </div>
          <button
            onClick={handleBooking}
            className="primary mt-4 font-semibold text-lg"
          >
            Reserve
          </button>
          {numberOfdays > 0 && (
            <div className="p-4 font-poppins">
              <div className="text-xl font-semibold">Total</div>
              <div className="flex justify-between text-gray-500 ">
                <div>
                  ₹{singlePlaceData.price} x {numberOfdays} night{" "}
                </div>
                <div>₹{singlePlaceData.price * numberOfdays} </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="w-[90%] mt-4">
        <div className="text-3xl font-semibold">Extra Info</div>
        <div className="my-4 leading-6">{singlePlaceData.extraInfo}</div>
      </div>
    </div>
  );
};

export default SinglePlace;
