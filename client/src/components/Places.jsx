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
const Places = () => {
  const { action } = useParams();
  const [showPerks, SetShowPerks] = useState(false);
  const [perksArray, setPerksArray] = useState([]);

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

  function handlePerksSelection(name) {
    if (!perksArray.includes(name))
      setPerksArray((prevState) => {
        return [...prevState, name];
      });
  }

  const renderPerks = perksList.map((perks, i) => {
    const IconComponent = getIconComponent(perks.logo);
    return (
      <div
        key={i}
        className="flex gap-3 cursor-pointer font-poppins items-center my-4 p-1"
        onClick={() => handlePerksSelection(perks.name)}
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

  return (
    <div className=" flex flex-col justify-center items-center mt-8 font-poppins h-full mb-8 ">
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
          <form>
            <div className="flex flex-col">
              <p className=" text-2xl ml-1">Title</p>
              <input type="text" placeholder="Title of the place" />
            </div>
            <div className="flex flex-col">
              <p className=" text-2xl ml-2">Address</p>
              <input type="text" placeholder="Address of your place" />
            </div>
            <div className="flex flex-col gap-1">
              <p className=" text-2xl ml-2">Photos</p>
              <div className="w-full flex gap-1">
                <input type="text" placeholder="Images of the place" />
                <button className="secondary max-w-[150px] my-1   hover:shadow-md transition-shadow ease-in">
                  Add&nbsp;Photos
                </button>
              </div>
              <div>
                <div className="border p-4 rounded-xl flex justify-center items-center max-w-[150px] min-h-[100px] text-gray-500">
                  <AiOutlinePlus size={20} />
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <p className=" text-2xl ml-2">Description</p>
              <textarea placeholder="Description" />
            </div>
            <div className="flex flex-col">
              <p className=" text-2xl ml-2 mb-2">What this place offers</p>
              <div className="ml-2">
                {showPerks && <PerksComponent />}
                <div className="w-[20%] ml-2">
                  {perksArray.length > 0 &&
                    perksArray.map((perks, i) => {
                      return (
                        <div
                          key={i}
                          className="flex gap-1 items-center justify-between font-poppins"
                        >
                          {perks}
                          <TfiClose
                            className="cursor-pointer "
                            size={15}
                            onClick={() => handleDeletePerks(perks)}
                          />
                        </div>
                      );
                    })}
                </div>
                <button
                  onClick={handleMenu}
                  className="secondary max-w-[200px] cursor-pointer text-lg font-medium px-6 py-2 mt-2"
                >
                  Add Amenities
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Places;
