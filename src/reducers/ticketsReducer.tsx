import { ticketsActionTypes } from "../actions/ticketsActions";
import TicketsItemProps from "../types/TicketItemProps";
import * as MyTypes from "MyTypes";

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
      let { cheap } = state;
      let prevSome = "cheap";
      if (cheap === false) {
        prevSome = "fast";
      }
      const { some } = action.payload;
      console.log(prevSome !== some);
      if (prevSome !== some) {
        const someEl = document.querySelector(`#${some}`);
        someEl?.classList.toggle("selected");
        makeDeselectOther(cheap, some);
        cheap = !cheap;
      }

      return { ...state, cheap: cheap };
    }
    default:
      return state;
  }
};

const makeDeselectOther = (cheap: boolean, some: string) => {
  if (some === "fast") {
    cheap = false;
    const otherEl = document.querySelector(`#cheap`);
    otherEl?.classList.toggle("selected");
  } else {
    cheap = true;
    const otherEl = document.querySelector(`#fast`);
    otherEl?.classList.toggle("selected");
  }
};
