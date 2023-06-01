import axios from "axios";
import "../../axiosConfig";
import {
  REGISTER_USER_ERROR,
  REGISTER_USER_SUCCESS,
  SET_LOADING,
  SET_USER,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER,
  LOGIN_USER_ERROR,
} from "./types";

export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING, payload: true });
    const { data } = await axios.post("/auth/register", {
      name,
      email,
      password,
    });
    dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
    localStorage.setItem(
      "user",
      JSON.stringify({ user: data.user, token: data.token })
    );
    dispatch({ type: SET_LOADING, payload: false });
  } catch (error) {
    dispatch({
      type: REGISTER_USER_ERROR,
    });
    dispatch({ type: SET_LOADING, payload: false });
  }
};
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING, payload: true });
    const { data } = await axios.post("/auth/login", { email, password });
    dispatch({ type: LOGIN_USER_SUCCESS, payload: data.user });
    localStorage.setItem(
      "user",
      JSON.stringify({ user: data.user, token: data.token })
    );
    dispatch({ type: SET_LOADING, payload: false });
  } catch (error) {
    dispatch({
      type: LOGIN_USER_ERROR,
    });
    dispatch({ type: SET_LOADING, payload: false });
  }
};
export const logout = () => (dispatch) => {
  dispatch({ type: SET_LOADING, payload: true });
  localStorage.removeItem("user");
  dispatch({ type: LOGOUT_USER });
  dispatch({ type: SET_LOADING, payload: false });
};

export const setUser = () => (dispatch) => {
  dispatch({ type: SET_LOADING, payload: true });
  const user = localStorage.getItem("user");
  if (user) {
    const newUser = JSON.parse(user);
    dispatch({ type: SET_USER, payload: newUser.user });
  }
  dispatch({ type: SET_LOADING, payload: false });
};
