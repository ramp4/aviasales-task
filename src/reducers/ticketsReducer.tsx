import * as MyTypes from "MyTypes";
import { actionTypes } from "../actions/ticketsActions";
import TicketsItemProps from "../types/TicketItemProps";
import dataJSON from "../data/data.json";

interface TicketsModel {
  ticketsList: TicketsItemProps[];
}

export const initialState: TicketsModel = {
  ticketsList: [
    {
      price: 83905,
      carrier: "FV",
      segments: [
        {
          origin: "MOW",
          destination: "HKT",
          date: "2020-02-05T14:31:00.000Z",
          stops: ["DXB", "IST", "BKK"],
          duration: 1523
        },
        {
          origin: "MOW",
          destination: "HKT",
          date: "2020-02-25T03:45:00.000Z",
          stops: ["SHA"],
          duration: 964
        }
      ]
    },
    {
      price: 80596,
      carrier: "FV",
      segments: [
        {
          origin: "MOW",
          destination: "HKT",
          date: "2020-02-04T21:38:00.000Z",
          stops: ["HKG"],
          duration: 1758
        },
        {
          origin: "MOW",
          destination: "HKT",
          date: "2020-02-25T09:23:00.000Z",
          stops: ["AUH"],
          duration: 865
        }
      ]
    }
  ]
};

export const ticketsReducer = (
  state: TicketsModel = initialState,
  action: MyTypes.RootAction
) => {
  switch (action.type) {
    case actionTypes.SHOW: {
      let newList = [...dataJSON[0].tickets];
      newList.length = action.payload;
      let result = newList;
      return {
        ...state,
        ticketsList: result
      };
    }
    default:
      return state;
  }
};
