import { ticketsActionTypes } from "../actions/ticketsActions";
import TicketsItemProps from "../types/TicketItemProps";
import * as MyTypes from "MyTypes";

interface TicketsModel {
  ticketsList: TicketsItemProps[];
  isFetching: boolean;
  isFailed: boolean;
}

export const initialState: TicketsModel = {
  ticketsList: [],
  isFetching: false,
  isFailed: false
};

export const ticketsReducer = (
  state: TicketsModel = initialState,
  action: MyTypes.RootAction
) => {
  switch (action.type) {
    case ticketsActionTypes.GET_TICKETS_REQUEST: {
      return { ...state, isFetching: true };
    }
    case ticketsActionTypes.GET_TICKETS_SUCCESS: {
      return { ...state, ticketsList: action.payload, isFetching: false };
    }
    case ticketsActionTypes.GET_TICKETS_FAIL: {
      return { ...state, isFailed: true, isFetching: false };
    }
    case ticketsActionTypes.SORT_BY_SOME: {
      return state;
    }
    default:
      return state;
  }
};
