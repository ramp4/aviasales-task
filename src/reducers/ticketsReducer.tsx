import * as MyTypes from "MyTypes";
import { actionTypes } from "../actions/ticketsActions";
import TicketsItemProps from "../types/TicketItemProps";
import dataJSON from "../data.json";

interface TicketsModel {
  ticketsList: TicketsItemProps[];
}

export const initialState: TicketsModel = {
  ticketsList: [
    {
      price: 59870,
      carrier: "TG",
      segments: [
        {
          origin: "MOW",
          destination: "HKT",
          date: "2020-02-04T08:43:00.000Z",
          stops: ["KUL", "IST", "HKG"],
          duration: 1657
        },
        {
          origin: "MOW",
          destination: "HKT",
          date: "2020-02-24T15:54:00.000Z",
          stops: ["IST", "BKK"],
          duration: 806
        }
      ]
    },
    {
      price: 72902,
      carrier: "S7",
      segments: [
        {
          origin: "MOW",
          destination: "HKT",
          date: "2020-02-04T05:13:00.000Z",
          stops: [],
          duration: 631
        },
        {
          origin: "MOW",
          destination: "HKT",
          date: "2020-02-23T23:25:00.000Z",
          stops: ["DXB"],
          duration: 1424
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
