import React, { useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/all";

import "../axiosConfig";
import { useSelector, useDispatch } from "react-redux";
import { getAllPlaces } from "../redux/actions/places";
import PlacesCard from "./PlacesCard";
import PlacesForm from "./PlacesForm";
const Places = () => {
  const location = useLocation();
  const { id } = useParams();
  const { pathname } = location;
  const basename = pathname.split("/").pop();
  const dispatch = useDispatch();
  const placesData = useSelector((state) => state.places.placesInfo);
  const editComplete = useSelector((state) => state.places.editComplete);
  console.log(editComplete);
  useEffect(() => {
    try {
      dispatch(getAllPlaces());
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, editComplete]);

  return (
    <div>
      {basename !== "new" && id === undefined ? (
        <div className=" flex flex-col justify-center items-center mt-8 font-poppins h-full mb-8 mx-auto px-4">
          <div className="text-center mb-8 ">
            <Link
              className="link-primary flex max-w- gap-1"
              to={"/account/places/new"}
            >
              <AiOutlinePlus size={20} />
              Add new places
            </Link>
          </div>

          {placesData.length > 0 &&
            placesData.map((place, i) => (
              <div className="self-start" key={i}>
                <PlacesCard place={place} />
              </div>
            ))}
        </div>
      ) : (
        <PlacesForm />
      )}
    </div>
  );
};

export default Places;
