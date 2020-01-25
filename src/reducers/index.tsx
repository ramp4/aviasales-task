import { combineReducers } from "redux";
// import { ticketsReducer } from "./tickets";
import { tabsReducer } from "./tabs";
import { filterReducer } from "./filter";

export const rootReducer = combineReducers({
  // tickets: ticketsReducer,
  tabs: tabsReducer,
  filter: filterReducer
});
