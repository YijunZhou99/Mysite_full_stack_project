import { createStore, applyMiddleware } from "redux";
import rootReducers from "./reducers/index";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const middlewate = [thunk];

const store = createStore(
  rootReducers,
  composeWithDevTools(applyMiddleware(...middlewate))
);

export default store;