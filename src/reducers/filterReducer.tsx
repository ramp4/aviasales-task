import * as MyTypes from "MyTypes";
import { filterActionsTypes } from "../actions/filterActions";
import TicketsItemProps from "../types/TicketItemProps";
export interface OptionsModel {
  all: boolean;
  non_stop: boolean;
  one_stop: boolean;
  two_stop: boolean;
  three_stop: boolean;
}

interface filterModel {
  filterOptions: OptionsModel;
}

export const initialState: filterModel = {
  filterOptions: {
    all: true,
    non_stop: true,
    one_stop: true,
    two_stop: true,
    three_stop: true
  }
};

function filterTicketList(stopsCount: number, ticketList: TicketsItemProps[]) {
  let newTicketList;
  return (newTicketList = ticketList.map((item, i) => {
    item.segments.map((segment, j) => {
      if (segment.stops.length === stopsCount) {
        return segment;
      }
    });
  }));
}

export const filterReducer = (
  state: filterModel = initialState,
  action: MyTypes.RootAction
) => {
  switch (action.type) {
    case filterActionsTypes.SET_FILTER_OPTION: {
      let newTicketsList;
      let newFilterOptions;
      switch (+action.payload.clickedIndex) {
        case 0: {
          newFilterOptions = {
            all: true,
            non_stop: true,
            one_stop: true,
            two_stop: true,
            three_stop: true
          };
          newTicketsList = filterTicketList(0, action.payload.ticketsList);
          break;
        }
        case 1: {
          newFilterOptions = {
            all: false,
            non_stop: true,
            one_stop: false,
            two_stop: false,
            three_stop: false
          };
          newTicketsList = filterTicketList(0, action.payload.ticketsList);
          break;
        }
        case 2: {
          newFilterOptions = {
            all: false,
            non_stop: false,
            one_stop: true,
            two_stop: false,
            three_stop: false
          };
          newTicketsList = filterTicketList(1, action.payload.ticketsList);
          break;
        }
        case 3: {
          newFilterOptions = {
            all: false,
            non_stop: false,
            one_stop: false,
            two_stop: true,
            three_stop: false
          };
          newTicketsList = filterTicketList(2, action.payload.ticketsList);
          break;
        }
        case 4: {
          newFilterOptions = {
            all: false,
            non_stop: false,
            one_stop: false,
            two_stop: false,
            three_stop: true
          };
          newTicketsList = filterTicketList(3, action.payload.ticketsList);
          break;
        }
        default: {
        }
      }

      return {
        ...state,
        filterOptions: newFilterOptions
      };
    }
    default: {
      return state;
    }
  }
};
