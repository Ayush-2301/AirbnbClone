import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import perksList from "../constant/perks";
import {
  TfiClose,
  AiOutlinePlus,
  AiOutlineWifi,
  AiFillCar,
  FiMonitor,
  MdPets,
  AiFillUnlock,
} from "react-icons/all";
import axios from "axios";
import "../axiosConfig";
const Places = () => {
  const { action } = useParams();
  const [showPerks, SetShowPerks] = useState(false);
  const [perksArray, setPerksArray] = useState([]);
  const [values, setValues] = useState({
    title: "",
    address: "",
    photos: [],
    description: "",
    extraInfo: "",
    checkIn: "",
    checkOut: "",
    maxGuest: "",
  });
  const [photosValue, setPhotosValue] = useState("");

  const getIconComponent = (logo) => {
    switch (logo) {
      case "AiOutlineWifi":
        return AiOutlineWifi;
      case "AiFillCar":
        return AiFillCar;
      case "FiMonitor":
        return FiMonitor;
      case "MdPets":
        return MdPets;
      case "AiFillUnlock":
        return AiFillUnlock;
      default:
        return null;
    }
  };

  function handlePerksSelection(perks) {
    console.log(perks.name);
    if (!perksArray.includes(perks))
      setPerksArray((prevState) => {
        return [...prevState, perks];
      });
  }

  const renderPerks = perksList.map((perks, i) => {
    const IconComponent = getIconComponent(perks.logo);
    return (
      <div
        key={i}
        className="flex gap-3 cursor-pointer font-poppins items-center my-4 p-1"
        onClick={() => handlePerksSelection(perks)}
      >
        <IconComponent size={30} />
        <span className="text-lg">{perks.name}</span>
      </div>
    );
  });

  const handleMenu = (e) => {
    e.preventDefault();
    SetShowPerks(() => !showPerks);
  };
  function backgroundColor() {
    if (showPerks) return "rgba(0, 0, 0, 0.5)";
  }

  const PerksComponent = () => {
    return (
      <div
        className="absolute top-0 left-0 w-full min-h-screen h-full flex justify-center items-center"
        onClick={handleMenu}
        style={{ background: backgroundColor() }}
      >
        <div
          className="bg-white flex flex-col p-6 space-y-3 rounded-lg w-[50%] h-[70%]"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={handleMenu}
            className=" w-[20px] h-[20px] bg-transparent"
          >
            <TfiClose size={20} />
          </button>
          <div>{renderPerks}</div>
        </div>
      </div>
    );
  };

  function handleDeletePerks(perk) {
    setPerksArray((prevState) => {
      return prevState.filter((item) => item !== perk);
    });
  }

  const handleValueChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleUploadingPhotosByLink = async (e) => {
    e.preventDefault();
    const { data: filename } = await axios.post("/user/places/upload-by-link", {
      link: photosValue,
    });
    handlePhotosCollection(filename);
  };

  const handleUploadingPhotosByDevice = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }
    const { data: filenames } = await axios.post(
      "/user/places/upload-by-device",
      data,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    setValues({ ...values, photos: [...values.photos, ...filenames] });
  };

  function handlePhotosCollection(filename) {
    setValues({ ...values, photos: [...values.photos, filename] });
    setPhotosValue("");
  }

  return (
    <div className=" flex flex-col justify-center items-center mt-8 font-poppins h-full mb-8 mx-auto px-4">
      {action !== "new" && (
        <div className="text-center ">
          <Link
            className="link-primary flex max-w- gap-1"
            to={"/account/places/new"}
          >
            <AiOutlinePlus size={20} />
            Add new places
          </Link>
        </div>
      )}

      {action === "new" && (
        <div className="self-start w-full">
          <form className="flex flex-col space-y-4">
            <div className="flex flex-col">
              <p className=" text-2xl ml-1">Title</p>
              <input
                type="text"
                placeholder="Title of the place"
                name="title"
                value={values.title}
                onChange={handleValueChange}
              />
            </div>
            <div className="flex flex-col">
              <p className=" text-2xl ml-2">Address</p>
              <input
                type="text"
                placeholder="Address of your place"
                name="address"
                value={values.address}
                onChange={handleValueChange}
              />
            </div>
            <div className="flex flex-col gap-1 w-full">
              <p className=" text-2xl ml-2">Photos</p>
              <div className="w-full flex gap-1">
                <input
                  type="text"
                  placeholder="Images of the place"
                  name="photos"
                  value={photosValue}
                  onChange={(e) => setPhotosValue(e.target.value)}
                />
                <button
                  onClick={handleUploadingPhotosByLink}
                  className="secondary max-w-[150px] my-1   hover:shadow-md transition-shadow ease-in"
                >
                  Add&nbsp;Photos
                </button>
              </div>
              <div className="flex w-full gap-4 h-[100px]">
                {values.photos.length > 0 &&
                  values.photos.map((photo, i) => {
                    return (
                      <div key={i}>
                        <img
                          className="rounded-xl w-[150px] h-[100px] object-cover"
                          src={`http://localhost:3000/uploads/${photo}`}
                          alt=""
                        />
                      </div>
                    );
                  })}
                <div>
                  <label className="border p-4 rounded-xl flex justify-center items-center w-[150px] h-full text-gray-500 hover:cursor-pointer">
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleUploadingPhotosByDevice}
                    />
                    <AiOutlinePlus size={20} />
                  </label>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <p className=" text-2xl ml-2">Description</p>
              <textarea
                placeholder="Description"
                name="description"
                value={values.description}
                onChange={handleValueChange}
              />
            </div>
            <div className="flex flex-col">
              <p className=" text-2xl ml-2 mb-2">What this place offers</p>
              <div className="ml-2">
                {showPerks && <PerksComponent />}
                <div className="grid grid-cols-3 gap-2">
                  {perksArray.length > 0 &&
                    perksArray.map((perks, i) => {
                      const IconComponent = getIconComponent(perks.logo);
                      return (
                        <div
                          key={i}
                          className="flex gap-1 items-center justify-between font-poppins border  px-6 py-2 rounded-md hover:shadow-md transition-shadow ease-in cursor-pointer w-full"
                        >
                          <div className="flex gap-2 items-center">
                            <IconComponent size={20} />
                            {perks.name}
                          </div>
                          <TfiClose
                            className="cursor-pointer text-gray-500"
                            size={15}
                            onClick={() => handleDeletePerks(perks)}
                          />
                        </div>
                      );
                    })}
                </div>
                <button
                  onClick={handleMenu}
                  className="secondary max-w-[200px] cursor-pointer text-md font-medium px-6 py-2 mt-2"
                >
                  Add Amenities
                </button>
              </div>
            </div>
            <div className="flex flex-col">
              <p className=" text-2xl ml-2">Extra info</p>
              <textarea
                placeholder="Description"
                name="extraInfo"
                value={values.extraInfo}
                onChange={handleValueChange}
              />
            </div>

            <div className="flex flex-col">
              <p className="text-2xl ml-2 mb-2">Check in&out time</p>
              <div className="flex gap-2 justify-between w-[60%]">
                <div className="w-full">
                  <p className=" text-xl ml-2">Check In Time</p>
                  <input
                    type="text"
                    placeholder="14:00"
                    name="checkIn"
                    value={values.checkIn}
                    onChange={handleValueChange}
                  />
                </div>
                <div className="w-full">
                  <p className=" text-xl ml-2">Check Out Time</p>
                  <input
                    type="text"
                    placeholder="14:00"
                    name="checkOut"
                    value={values.checkOut}
                    onChange={handleValueChange}
                  />
                </div>
                <div className="w-full">
                  <p className="text-xl ml-2">Max Guest</p>
                  <input
                    type="number"
                    placeholder="maximum guest"
                    name="maxGuest"
                    value={values.maxGuest}
                    onChange={handleValueChange}
                  />
                </div>
              </div>
            </div>
            <button className="secondary max-w-[200px] self-start my-2">
              Save
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Places;
