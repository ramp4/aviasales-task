import { combineReducers } from "redux";
import { ticketsReducer } from "../reducers/ticketsReducer";
import { tabsReducer } from "./tabsReducer";
import { filterReducer } from "./filterReducer";

export const rootReducer = combineReducers({
  filter: filterReducer,
  tickets: ticketsReducer,
  tabs: tabsReducer
});
