import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "../features/token/tokenSlice";
import {
    persistReducer,
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";

const PERSIST_TOKEN_NAME = process.env.REACT_APP_TOKEN_PERSIST_KEY

const persistConfig = {
    key: PERSIST_TOKEN_NAME,
    storage: storageSession,
};
const persistedReducer = persistReducer(persistConfig, tokenReducer);

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
