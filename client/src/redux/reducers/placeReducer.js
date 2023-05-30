import { IoReturnUpBack } from "react-icons/io5";
import {
  CREATE_PLACES_ERROR,
  CREATE_PLACES_SUCCESS,
  FETCH_PLACES_ERROR,
  FETCH_PLACES_SUCCESS,
  SET_LOADING,
} from "../actions/types";

const initalState = {
  placesInfo: [],
  error: false,
};

const placesReducer = (state = initalState, action) => {
  switch (action.type) {
    case CREATE_PLACES_SUCCESS:
      return {
        ...state,
        placesInfo: [...state.placesInfo, action.payload],
        error: false,
      };
    case CREATE_PLACES_ERROR:
      return {
        ...state,
        error: true,
      };
    case FETCH_PLACES_SUCCESS:
      return {
        ...state,
        placesInfo: action.payload.places,
        error: false,
      };
    case FETCH_PLACES_ERROR:
      return {
        ...state,
        error: true,
      };
    default:
      return state;
  }
};

export default placesReducer;
