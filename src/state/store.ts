import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { ActionTypes } from "./action-types";
import reducers from "./reducers";

export const store = createStore(
  reducers,
  {},
  composeWithDevTools(applyMiddleware(thunk))
);
