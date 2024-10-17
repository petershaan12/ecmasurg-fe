import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import userReducer from "./reducer";

// Define your RootState type
export type RootState = ReturnType<typeof userReducer>;

export default createStore(userReducer, applyMiddleware(thunk));
