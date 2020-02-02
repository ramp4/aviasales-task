import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { ticketsActionTypes } from "../actions/ticketsActions";
import { ticketsActions } from "../actions/ticketsActions";
import { callApi } from "../utils/api";

function* handleFetch() {
  try {
    const res = yield call(callApi);
    if (res.error) {
      yield put(ticketsActions.getTicketsFail());
    } else {
      yield put(ticketsActions.getTicketsSuccess(res.tickets));
    }
  } catch (err) {
    yield put(ticketsActions.getTicketsFail());
  }
}

function* watchFetchRequest() {
  yield takeEvery(ticketsActionTypes.GET_TICKETS_REQUEST, handleFetch);
}

function* getTicketsSaga() {
  yield all([fork(watchFetchRequest)]);
}

export default getTicketsSaga;
