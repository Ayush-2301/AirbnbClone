import { combineReducers } from "redux";
import authReducer from "./authReducer";
import loadingReducer from "./loadingReducer";
import placesReducer from "./placeReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  loading: loadingReducer,
  places: placesReducer,
});

export default rootReducer;
