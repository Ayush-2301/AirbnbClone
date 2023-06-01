import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPlace } from "../redux/actions/places";
import { IndexPlaceCard } from "../components/index";
const IndexPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllPlace());
  }, [dispatch]);
  let allPlaceData = useSelector((state) => state.places.allPlaceData);

  allPlaceData = [...allPlaceData, ...allPlaceData];
  return (
    <div className="mt-8 grid grid-col-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-4">
      {allPlaceData &&
        allPlaceData.map((placeData, i) => {
          return (
            <div className="" key={i}>
              <IndexPlaceCard placeData={placeData} />
            </div>
          );
        })}
    </div>
  );
};

export default IndexPage;
