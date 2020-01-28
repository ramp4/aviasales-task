import { ticketsActionTypes } from "../actions/ticketsActions";
import TicketsItemProps from "../types/TicketItemProps";
import * as MyTypes from "MyTypes";

interface TicketsModel {
  ticketsList: TicketsItemProps[];
  isFetching: boolean;
}

export const initialState: TicketsModel = {
  ticketsList: [],
  isFetching: false
};

export const ticketsReducer = (
  state: TicketsModel = initialState,
  action: MyTypes.RootAction
) => {
  switch (action.type) {
    case ticketsActionTypes.GET_TICKETS_REQUEST: {
      fetch("https://front-test.beta.aviasales.ru/search")
        .then(r => {
          return r.json();
        })
        .then(r => {
          const { searchId } = r;

          return searchId;
        })
        .then(id => {
          fetch(`https://front-test.beta.aviasales.ru/tickets?searchId=${id}`)
            .then(data => {
              return data.json();
            })
            .then(result => {
              const data = result.tickets;
              return data;
            });
        });
      return { ...state, isFetching: true };
    }
    case ticketsActionTypes.GET_TICKETS_SUCCESS: {
      console.log("ыыыыы");
      return state;
    }
    case ticketsActionTypes.SORT_BY_SOME: {
      return state;
    }
    default:
      return state;
  }
};
