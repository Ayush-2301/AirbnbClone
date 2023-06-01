import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSinglePlace } from "../redux/actions/places";
import { TbGridDots } from "react-icons/tb";
import { TfiClose } from "react-icons/tfi";
import { GoLocation } from "react-icons/go";
const SinglePlace = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSinglePlace(id));
  }, [dispatch]);
  const singlePlaceData = useSelector((state) => state.places.singlePlaceInfo);
  const [showAllphotos, setShowAllphotos] = useState(false);
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
                    src={`http://localhost:3000/uploads/${photo}`}
                    alt=""
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  return (
    <div className=" mt-8 flex flex-col min-h-full mx-20 px-8 py-8 justify-center items-center">
      <div className="self-start">
        <div className="text-3xl font-semibold">{singlePlaceData.title}</div>
        <div className="underline font-semibold flex gap-1 items-center">
          <GoLocation size={20} />
          {singlePlaceData.address}
        </div>
      </div>
      <div className="grid grid-cols-[2fr_1fr] gap-2 m-8 mb-16 w-max border  ">
        <div>
          {singlePlaceData.photos[0] && (
            <div>
              <img
                className=" object-cover aspect-square h-[600px] w-[800px] rounded-l-2xl"
                src={`http://localhost:3000/uploads/${singlePlaceData.photos[0]}`}
                alt=""
              />
            </div>
          )}
        </div>
        <div className="grid relative">
          <img
            className="object-cover aspect-square rounded-tr-2xl w-[300px]"
            src={`http://localhost:3000/uploads/${singlePlaceData.photos[1]}`}
            alt=""
          />
          <div className="overflow-hidden rounded-br-2xl ">
            <img
              className="object-cover aspect-square w-[300px]  relative top-2 "
              src={`http://localhost:3000/uploads/${singlePlaceData.photos[2]}`}
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
      <div className="grid grid-cols-[3fr_1fr] gap-2">
        <div>
          <div className="text-3xl font-semibold">Description</div>
          <div>{singlePlaceData.description}</div>
        </div>
        <div className="flex flex-col border rounded-2xl shadow-md p-4">
          <div className="text-center text-2xl font-medium">
            Price: ₹{singlePlaceData.price} night
          </div>
          <div className="border rounded-2xl mt-4">
            <div className="flex  ">
              <div className="grow border-r py-3 px-4">
                <label className="text-lg font-medium">Check in</label>
                <input type="date" />
              </div>
              <div className="grow py-3 px-4">
                <label className="text-lg font-medium"> Check out</label>
                <input type="date" />
              </div>
            </div>
            <div className="border-t p-4">
              <label className="text-lg font-medium">No. of Guest</label>
              <input type="number" className="mb-0" placeholder="1" />
            </div>
          </div>
          <button className="primary mt-4">Reserve</button>
        </div>
      </div>
    </div>
  );
};

export default SinglePlace;
