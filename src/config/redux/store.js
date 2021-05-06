import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { persistStore } from "redux-persist";
import { rootReducer, rootSaga } from "./rootReducer";
import logger from 'redux-logger'
const sagaMiddleware = createSagaMiddleware();
const middleware = [
    ...getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
        thunk: true
    }),
    sagaMiddleware,
    logger
];

export const store = configureStore({
    reducer: rootReducer,
    middleware
});

export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);
