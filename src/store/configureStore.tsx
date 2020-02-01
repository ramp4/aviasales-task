import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { rootReducer } from "../reducers/index";
import mySaga from "../sagas/getTickets";
// import logger from "redux-logger";
import thunk from "redux-thunk";
const sagaMiddleware = createSagaMiddleware();
export const store = createStore(
  rootReducer,
  applyMiddleware(thunk, sagaMiddleware)
);
// export const store = createStore(rootReducer, applyMiddleware(thunk, logger));
sagaMiddleware.run(mySaga);
