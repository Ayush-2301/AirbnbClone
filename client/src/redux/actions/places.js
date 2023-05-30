import axios from "axios";
import "../../axiosConfig";
import {
  CREATE_PLACES_SUCCESS,
  CREATE_PLACES_ERROR,
  FETCH_PLACES_SUCCESS,
  FETCH_PLACES_ERROR,
  SET_LOADING,
} from "./types";

export const createPlaces = (placeDetail) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING, payload: true });
    const { data } = await axios.post("/user/places/create", placeDetail);
    dispatch({ type: CREATE_PLACES_SUCCESS, payload: data.place });
    dispatch({ type: SET_LOADING, payload: false });
  } catch (error) {
    dispatch({ type: CREATE_PLACES_ERROR });
    dispatch({ type: SET_LOADING, payload: false });
  }
};
export const getAllPlaces = () => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING, payload: true });
    const { data } = await axios.get("/user/places/getAllPlaces");
    dispatch({ type: FETCH_PLACES_SUCCESS, payload: data });
    dispatch({ type: SET_LOADING, payload: false });
  } catch (error) {
    dispatch({ type: FETCH_PLACES_ERROR });
    dispatch({ type: SET_LOADING, payload: false });
  }
};
