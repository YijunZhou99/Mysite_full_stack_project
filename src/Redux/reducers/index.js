import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { msgReducer } from "./msgReducer";
import { postReducer } from "./postReducer";
import { followReducer } from "./followReducer";

const rootReducer = combineReducers({
  authReducer,
  msgReducer,
  postReducer,
  followReducer,
});

export default rootReducer;
