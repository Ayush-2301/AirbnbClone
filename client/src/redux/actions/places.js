import axios from "axios";
import "../../axiosConfig";
import {
  CREATE_PLACES_SUCCESS,
  CREATE_PLACES_ERROR,
  FETCH_PLACES_SUCCESS,
  FETCH_PLACES_ERROR,
  SET_LOADING,
  FETCH_SINGLE_PLACE_SUCCESS,
  FETCH_SINGLE_PLACE_ERROR,
  EDIT_PLACE_ERROR,
  EDIT_PLACE_SUCCESS,
  EDIT_PROGRESS,
  FETCH_ALL_PLACES_ERROR,
  FETCH_ALL_PLACES_SUCCESS,
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
export const getAllUserPlaces = () => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING, payload: true });
    const { data } = await axios.get("/user/places/getAllUserPlaces");
    dispatch({ type: FETCH_PLACES_SUCCESS, payload: data });
    dispatch({ type: SET_LOADING, payload: false });
  } catch (error) {
    dispatch({ type: FETCH_PLACES_ERROR });
    dispatch({ type: SET_LOADING, payload: false });
  }
};
export const getSinglePlace = (id) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING, payload: true });
    const { data } = await axios.get("/user/places/getSinglePlace/" + id);
    dispatch({ type: FETCH_SINGLE_PLACE_SUCCESS, payload: data });
    dispatch({ type: SET_LOADING, payload: false });
  } catch (error) {
    dispatch({ type: FETCH_SINGLE_PLACE_ERROR });
    dispatch({ type: SET_LOADING, payload: false });
  }
};

export const updatePlace = (id, values) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING, payload: true });
    dispatch({ type: EDIT_PROGRESS, payload: false });
    const { data } = await axios.patch("/user/places/updatePlace/" + id, {
      ...values,
    });
    dispatch({ type: EDIT_PLACE_SUCCESS, payload: data });
    dispatch({ type: SET_LOADING, payload: false });
  } catch (error) {
    dispatch({ type: EDIT_PLACE_ERROR });
    dispatch({ type: SET_LOADING, payload: false });
  }
};
export const getAllPlace = () => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING, payload: true });
    const { data } = await axios.get("/getAllplaces");
    dispatch({ type: FETCH_ALL_PLACES_SUCCESS, payload: data });
    dispatch({ type: SET_LOADING, payload: false });
  } catch (error) {
    dispatch({ type: FETCH_ALL_PLACES_ERROR });
    dispatch({ type: SET_LOADING, payload: false });
  }
};
