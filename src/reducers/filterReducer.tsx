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

export const filterReducer = (
  state: filterModel = initialState,
  action: MyTypes.RootAction
) => {
  switch (action.type) {
    case filterActionsTypes.SET_FILTER_OPTION: {
      let newFilterOptions;
      let stopsCount;
      switch (+action.payload.clickedIndex) {
        case 0: {
          newFilterOptions = {
            all: true,
            non_stop: true,
            one_stop: true,
            two_stop: true,
            three_stop: true
          };
          stopsCount = -1;
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
          stopsCount = 0;
          break;
        }
        case 2: {
          newFilterOptions = {
            all: false,
            non_stop: true,
            one_stop: true,
            two_stop: false,
            three_stop: false
          };
          stopsCount = 1;
          break;
        }
        case 3: {
          newFilterOptions = {
            all: false,
            non_stop: true,
            one_stop: true,
            two_stop: true,
            three_stop: false
          };
          stopsCount = 2;
          break;
        }
        case 4: {
          newFilterOptions = {
            all: true,
            non_stop: true,
            one_stop: true,
            two_stop: true,
            three_stop: true
          };
          stopsCount = 3;
          break;
        }
        default: {
          newFilterOptions = {
            all: true,
            non_stop: true,
            one_stop: true,
            two_stop: true,
            three_stop: true
          };
        }
      }

      return {
        ...state,
        filterOptions: newFilterOptions,
        stopsCount: stopsCount
      };
    }
    default: {
      return state;
    }
  }
};
