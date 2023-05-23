import { SET_LOADING } from "../actions/types";
const initalState = {
  isLoading: false,
};

const loadingReducer = (state = initalState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};
export default loadingReducer;
