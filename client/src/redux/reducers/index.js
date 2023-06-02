import { combineReducers } from "redux";
import authReducer from "./authReducer";
import loadingReducer from "./loadingReducer";
import placesReducer from "./placeReducer";
import bookingReducer from "./bookingReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  loading: loadingReducer,
  places: placesReducer,
  bookings: bookingReducer,
});

export default rootReducer;
