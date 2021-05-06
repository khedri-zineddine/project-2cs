import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { put, takeLatest } from "redux-saga/effects";
import { getUserByToken } from "./auth.crud";
import { actionTypes } from "./auth.constants";

const initialAuthState = {
    authToken: "",
    user:null
};
export const Authreducer = persistReducer(
    { storage, key: "autolibdz", whitelist: ["authToken"] },
    (state = initialAuthState, action) => {
        switch (action.type) {
            case actionTypes.Login: {
                const { authToken } = action.payload;
                return { authToken };
            }
            case actionTypes.Logout: {
                return initialAuthState;
            }
            case actionTypes.UserLoaded: {
                const { user } = action.payload;
                return { ...state, user };
            }
            default:
                return state;
        }
    }
);

export const actions = {
    login: (authToken) => ({ type: actionTypes.Login, payload: { authToken } }),
    logout: () => ({ type: actionTypes.Logout }),
    requestUser: (user) => ({
        type: actionTypes.UserRequested,
        payload: { user },
      }),
    fulfillUser: (user) => ({ type: actionTypes.UserLoaded, payload: { user } }),
};

export function* saga() {
    yield takeLatest(actionTypes.Login, function* loginSaga() {
        yield put(actions.requestUser());
    });
    yield takeLatest(actionTypes.UserRequested, function* userRequested() {
        const { data: user } = yield getUserByToken();
        yield put(actions.fulfillUser(user));
    });
}