import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import generalReducer from "./reducer";

// Define your RootState type
export type RootState = ReturnType<typeof generalReducer>;

export default createStore(generalReducer, applyMiddleware(thunk));
