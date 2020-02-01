import { combineReducers } from "redux";
import { ticketsReducer } from "./ticketsReducer";
import { filterReducer } from "./filterReducer";

export const rootReducer = combineReducers({
  filter: filterReducer,
  tickets: ticketsReducer
});
