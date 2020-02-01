import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { rootReducer } from "../reducers/index";
import mySaga from "../sagas/getTickets";
import thunk from "redux-thunk";
const sagaMiddleware = createSagaMiddleware();
export const store = createStore(
  rootReducer,
  applyMiddleware(thunk, sagaMiddleware)
);
sagaMiddleware.run(mySaga);
