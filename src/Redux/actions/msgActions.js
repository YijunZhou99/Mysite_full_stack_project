import {
  SET_MESSAGE,
  CLEAR_MESSAGE,
} from "./types";

const setMessage = (message) => {
  return {
    type: SET_MESSAGE,
    payload: message,
  };
}

const clearMessage = () => {
  return {
    type: CLEAR_MESSAGE,
  };
}

export const msgActions = {
  setMessage,
  clearMessage,
};  