import Cookies from "js-cookie";
import { configureStore } from "@reduxjs/toolkit";
import { CookieStorage } from "redux-persist-cookie-storage";
import tokenReducer from "../features/token/tokenSlice";
import {
    persistStore,
    persistCombineReducers,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";

const PERSIST_TOKEN_NAME = process.env.REACT_APP_TOKEN_PERSIST_KEY;

const persistConfig = {
    key: PERSIST_TOKEN_NAME,
    version: 1,
    storage: new CookieStorage(Cookies),
};
const persistedReducer = persistCombineReducers(persistConfig, {
    token: tokenReducer,
});

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }),
});

export const persistor = persistStore(store);
