import axios from "axios";
import "../../axiosConfig";
import {
  CREATE_BOOKING_SUCCESS,
  CREATE_BOOKING_ERROR,
  SET_LOADING,
  FETCH_ALL_BOOKINGS_SUCCESS,
  FETCH_ALL_BOOKINGS_ERROR,
} from "./types";

export const createBooking = (bookingDetail) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING, payload: true });
    const { data } = await axios.post("/booking/createBooking", bookingDetail);
    dispatch({ type: CREATE_BOOKING_SUCCESS, payload: data.bookingData });
    dispatch({ type: SET_LOADING, payload: false });
  } catch (error) {
    dispatch({ type: CREATE_BOOKING_ERROR });
    dispatch({ type: SET_LOADING, payload: false });
  }
};

export const getAllBookings = () => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING, payload: true });
    const { data } = await axios.get("/booking/getAllBookings");
    dispatch({ type: FETCH_ALL_BOOKINGS_SUCCESS, payload: data });
    dispatch({ type: SET_LOADING, payload: false });
  } catch (error) {
    dispatch({ type: FETCH_ALL_BOOKINGS_ERROR });
    dispatch({ type: SET_LOADING, payload: false });
  }
};
