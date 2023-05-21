import axios from "axios";
import "../axiosConfig";
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
    const { data } = await axios.post("/auth/register", {
      name,
      email,
      password,
    });
    dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user.name });
    localStorage.setItem(
      "user",
      JSON.stringify({ name: data.user.name, token: data.token })
    );
  } catch (error) {
    dispatch({
      type: REGISTER_USER_ERROR,
    });
  }
};
export const login = (email, password) => async (dispatch) => {
  try {
    const { data } = await axios.post("/auth/login", { email, password });
    dispatch({ type: LOGIN_USER_SUCCESS, payload: data.user.name });
    localStorage.setItem(
      "user",
      JSON.stringify({ name: data.user.name, token: data.token })
    );
  } catch (error) {
    dispatch({
      type: LOGIN_USER_ERROR,
    });
  }
};
export const logout = () => (dispatch) => {
  localStorage.removeItem("user");
  dispatch({ type: LOGOUT_USER });
};

export const setUser = () => (dispatch) => {
  const user = localStorage.getItem("user");
  if (user) {
    const newUser = JSON.parse(user);
    dispatch({ type: SET_USER, payload: newUser.name });
  }
};
