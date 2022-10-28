import {
  SET_MESSAGE,
  CLEAR_MESSAGE,
} from "../actions/types";

const initialState = {
  message: null,
};

export const msgReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MESSAGE:
      return {
        message: action.payload,
      };
    case CLEAR_MESSAGE:
      return {
        message: "",
      };
    default:
      return state;
  }
}