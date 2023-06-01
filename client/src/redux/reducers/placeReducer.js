import {
  CREATE_PLACES_ERROR,
  CREATE_PLACES_SUCCESS,
  FETCH_PLACES_ERROR,
  FETCH_PLACES_SUCCESS,
  FETCH_SINGLE_PLACE_ERROR,
  FETCH_SINGLE_PLACE_SUCCESS,
  SET_LOADING,
  EDIT_PLACE_SUCCESS,
  EDIT_PLACE_ERROR,
  EDIT_PROGRESS,
  FETCH_ALL_PLACES_ERROR,
  FETCH_ALL_PLACES_SUCCESS,
} from "../actions/types";

const initalState = {
  allPlaceData: [],
  placesInfo: [],
  singlePlaceInfo: null,
  error: false,
  editComplete: null,
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
        singlePlaceInfo: null,
        error: false,
      };
    case FETCH_PLACES_ERROR:
      return {
        ...state,
        error: true,
      };
    case FETCH_SINGLE_PLACE_SUCCESS:
      return {
        ...state,
        singlePlaceInfo: action.payload,
        error: false,
      };
    case FETCH_SINGLE_PLACE_ERROR: {
      return {
        ...state,
        singlePlaceInfo: null,
        error: true,
      };
    }
    case EDIT_PLACE_SUCCESS: {
      return {
        ...state,
        singlePlaceInfo: action.payload,
        editComplete: true,
        error: false,
      };
    }
    case EDIT_PLACE_ERROR:
      return {
        ...state,
        editComplete: false,
        error: true,
      };
    case EDIT_PROGRESS:
      return {
        ...state,
        editComplete: action.payload,
      };
    case FETCH_ALL_PLACES_SUCCESS:
      return {
        ...state,
        allPlaceData: action.payload.places,
        error: false,
      };
    case FETCH_ALL_PLACES_ERROR:
      return {
        ...state,
        error: true,
      };

    default:
      return state;
  }
};

export default placesReducer;
