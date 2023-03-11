import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userInfoReducer from './reducers/userInfo';
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
 
const persistConfig = {
  key: "root",
  version: 1,
  storage
}

const reducer = combineReducers({
  userInfo: userInfoReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer
})