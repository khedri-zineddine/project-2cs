import { all } from "redux-saga/effects";
import { combineReducers } from "redux";
import { Authreducer, saga } from "../../modules";

export const rootReducer = combineReducers({
  auth: Authreducer
});

export function* rootSaga() {
  yield all([saga()]);
}
