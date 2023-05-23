import {
  REGISTER_USER_ERROR,
  REGISTER_USER_SUCCESS,
  LOGIN_USER_ERROR,
  LOGOUT_USER,
  SET_LOADING,
  LOGIN_USER_SUCCESS,
  SET_USER,
} from "../actions/types";

const initalState = {
  user: null,
  error: false,
  email: null,
};

const authReducer = (state = initalState, action) => {
  switch (action.type) {
    case REGISTER_USER_SUCCESS:
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        user: action.payload.name,
        email: action.payload.email,
        error: false,
      };
    case REGISTER_USER_ERROR:
    case LOGIN_USER_ERROR:
      return {
        ...state,
        user: null,
        email: null,
        error: true,
      };
    case LOGOUT_USER:
      return {
        ...state,
        user: null,
        email: null,
        error: false,
      };
    case SET_USER:
      return {
        ...state,
        user: action.payload.name,
        email: action.payload.email,
      };
    default:
      return state;
  }
};
export default authReducer;
