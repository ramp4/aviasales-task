import { ticketsActionTypes } from "../actions/ticketsActions";
import TicketsItemProps from "../types/TicketItemProps";
import * as MyTypes from "MyTypes";
import { handleSort } from "../utils/handleSort";
interface TicketsModel {
  ticketsList: TicketsItemProps[];
  isFetching: boolean;
  isFailed: boolean;
  cheap: boolean;
}

export const initialState: TicketsModel = {
  ticketsList: [],
  isFetching: false,
  isFailed: false,
  cheap: true
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
      return {
        ...state,
        ticketsList: action.payload,
        isFetching: false
      };
    }
    case ticketsActionTypes.GET_TICKETS_FAIL: {
      return { ...state, isFailed: true, isFetching: false };
    }
    case ticketsActionTypes.SORT_BY_SOME: {
      const { cheap } = state;
      const { some } = action.payload;

      return { ...state, cheap: handleSort(cheap, some) };
    }
    default:
      return state;
  }
};
