import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import perksList from "../constant/perks";
import {
  TfiClose,
  AiOutlinePlus,
  AiOutlineWifi,
  AiFillCar,
  FiMonitor,
  MdPets,
  AiFillUnlock,
  FaTrashAlt,
  AiFillStar,
  AiOutlineStar,
} from "react-icons/all";
import axios from "axios";
import "../axiosConfig";
import { useDispatch, useSelector } from "react-redux";
import {
  createPlaces,
  getAllUserPlaces,
  getSinglePlace,
  updatePlace,
} from "../redux/actions/places";

const PlacesForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showPerks, SetShowPerks] = useState(false);
  const [perksArray, setPerksArray] = useState([]);
  const [values, setValues] = useState({
    title: "",
    address: "",
    photos: [],
    description: "",
    perksCollection: [],
    extraInfo: "",
    checkIn: "",
    checkOut: "",
    maxGuest: "",
    price: "",
  });
  const [photosValue, setPhotosValue] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    if (!id && id !== "new") return;
    try {
      dispatch(getSinglePlace(id));
    } catch (error) {
      console.log(error);
    }
  }, [id]);
  const placeData = id
    ? useSelector((state) => state.places.singlePlaceInfo)
    : null;

  useEffect(() => {
    if (placeData) {
      const {
        title,
        address,
        photos,
        description,
        perksCollection,
        extraInfo,
        checkIn,
        checkOut,
        maxGuest,
        price,
      } = placeData;
      setValues({
        title,
        address,
        photos,
        description,
        perksCollection,
        extraInfo,
        checkIn: checkIn.toString(),
        checkOut: checkOut.toString(),
        maxGuest: maxGuest.toString(),
        price: price.toString(),
      });
      const filtered = perksList.filter((obj) =>
        perksCollection.includes(obj.name)
      );
      setPerksArray(filtered);
    }
  }, [placeData]);

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
    if (!perksArray.includes(perks))
      setPerksArray((prevState) => {
        perks.state = true;
        setValues({
          ...values,
          perksCollection: [...values.perksCollection, perks.name],
        });
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
      const updatedPerksCollection = values.perksCollection.filter(
        (item) => item !== perk.name
      );
      setValues({ ...values, perksCollection: updatedPerksCollection });

      return prevState.filter((item) => {
        perk.state = false;
        return item !== perk;
      });
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

  function handleDeletePhotos(photo) {
    const newPhotos = values.photos.filter((filename) => filename !== photo);
    setValues({ ...values, photos: newPhotos });
  }

  function handleCoverPhotoSelection(photo) {
    const addeddPhotosWithoutSelection = values.photos.filter(
      (filename) => filename != photo
    );
    setValues({
      ...values,
      photos: [photo, ...addeddPhotosWithoutSelection],
    });
  }

  const handlePlaceSubmition = (e) => {
    e.preventDefault();
    try {
      if (id) {
        dispatch(updatePlace(id, values));
        dispatch(getAllUserPlaces());
      } else {
        dispatch(createPlaces(values));
      }

      navigate("/account/places");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" flex flex-col justify-center items-center mt-8 font-poppins h-full mb-8 mx-auto px-4">
      <div className="self-start w-full">
        <form
          onSubmit={handlePlaceSubmition}
          className="flex flex-col space-y-4"
        >
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
                    <div key={i} className="relative">
                      <div
                        className="absolute bottom-[5px] left-[5px] text-white cursor-pointer bg-[#000000] bg-opacity-50 p-2 rounded-full flex justify-center items-center"
                        onClick={() => handleCoverPhotoSelection(photo)}
                      >
                        {i === 0 ? (
                          <AiFillStar size={15} />
                        ) : (
                          <AiOutlineStar size={15} />
                        )}
                      </div>
                      <img
                        className="rounded-xl w-[150px] h-[100px] object-cover "
                        src={`http://localhost:3000/uploads/${photo}`}
                        alt=""
                      />
                      <div
                        onClick={() => handleDeletePhotos(photo)}
                        className="cursor-pointer absolute bg-[#000000] bg-opacity-50  bottom-[5px] right-[5px] p-2 rounded-full flex justify-center items-center"
                      >
                        <FaTrashAlt size={15} className=" text-white" />
                      </div>
                    </div>
                  );
                })}
              <div>
                <label className="border p-4 rounded-xl flex justify-center items-center w-[150px] h-full text-gray-500 hover:cursor-pointer">
                  <input
                    multiple
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
              <div className="w-full">
                <p className="text-xl ml-2">Price per night</p>
                <input
                  type="number"
                  placeholder="Price"
                  name="price"
                  value={values.price}
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
    </div>
  );
};

export default PlacesForm;
