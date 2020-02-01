import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { ticketsActionTypes } from "../actions/ticketsActions";
import { ticketsActions } from "../actions/ticketsActions";
import { callApi } from "../utils/api";

function* handleFetch() {
  try {
    // To call async functions, use redux-saga's `call()`.
    const res = yield call(callApi);
    console.log(res);

    if (res.error) {
      yield put(ticketsActions.getTicketsFail());
    } else {
      yield put(ticketsActions.getTicketsSuccess(res.tickets));
    }
  } catch (err) {
    yield put(ticketsActions.getTicketsFail());
  }
}

// This is our watcher function. We use `take*()` functions to watch Redux for a specific action
// type, and run our saga, for example the `handleFetch()` saga above.
function* watchFetchRequest() {
  yield takeEvery(ticketsActionTypes.GET_TICKETS_REQUEST, handleFetch);
}

// We can also use `fork()` here to split our saga into multiple watchers.
function* getTicketsSaga() {
  yield all([fork(watchFetchRequest)]);
}

export default getTicketsSaga;
