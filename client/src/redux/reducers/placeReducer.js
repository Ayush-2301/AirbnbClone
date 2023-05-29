import {
  CREATE_PLACES_ERROR,
  CREATE_PLACES_SUCCESS,
  SET_LOADING,
} from "../actions/types";

const initalState = {
  placesInfo: null,
  error: false,
};

const placesReducer = (state = initalState, action) => {
  switch (action.type) {
    case CREATE_PLACES_SUCCESS:
      return {
        ...state,
        placesInfo: action.payload,
        error: false,
      };
    case CREATE_PLACES_ERROR:
      return {
        ...state,
        placesInfo: action.payload,
      };
    default:
      return state;
  }
};

export default placesReducer;
