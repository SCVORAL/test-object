import { configureStore, combineReducers } from "@reduxjs/toolkit";
import mainReducer from "./slices/mainSlice";
import serversReducer from "./slices/serversSlice";
import { persistReducer, persistStore } from "redux-persist";
import createIdbStorage from "@piotr-cz/redux-persist-idb-storage";

const rootReducer = combineReducers({
  main: mainReducer,
  servers: serversReducer,
});

const persistConfig = {
  key: "root",
  storage: createIdbStorage({ name: "myAppDB", storeName: "keyval" }),
  whitelist: ["servers"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
