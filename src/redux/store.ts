import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to sessionStorage for web
import { thunk } from "redux-thunk";
import generalReducer from "./reducer";

// Define your RootState type
export type RootState = ReturnType<typeof generalReducer>;

// Configuration for redux-persist
const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, generalReducer);

// Create the Redux store with the persisted reducer
const store = createStore(persistedReducer, applyMiddleware(thunk));

// Create the persistor
const persistor = persistStore(store);

export { store, persistor };
