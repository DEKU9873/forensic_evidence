import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk"; // استخدام التصدير المسمى
import rootReducer from "./reducers/rootReducer";
import { composeWithDevTools } from "@redux-devtools/extension";

const initialState = {};
const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
