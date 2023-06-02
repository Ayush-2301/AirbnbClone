import {
  CREATE_BOOKING_ERROR,
  CREATE_BOOKING_SUCCESS,
  FETCH_ALL_BOOKINGS_SUCCESS,
  FETCH_ALL_BOOKINGS_ERROR,
} from "../actions/types";

const initalState = {
  bookingsInfo: [],
  error: null,
};

const bookingReducer = (state = initalState, action) => {
  switch (action.type) {
    case CREATE_BOOKING_SUCCESS:
      return {
        ...state,
        bookingsInfo: [...state.bookingsInfo, action.payload],
        error: false,
      };
    case CREATE_BOOKING_ERROR:
      return {
        ...state,
        error: true,
      };
    case FETCH_ALL_BOOKINGS_SUCCESS:
      return {
        ...state,
        bookingsInfo: action.payload.bookings,
        error: false,
      };
    case FETCH_ALL_BOOKINGS_ERROR:
      return {
        ...state,
        error: false,
      };
    default:
      return state;
  }
};
export default bookingReducer;
