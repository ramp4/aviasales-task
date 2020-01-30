import * as MyTypes from "MyTypes";
import { filterActionsTypes } from "../actions/filterActions";
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
      let newFilterOptions = action.payload.filterOptions;

      const checkAll = () => {
        if (
          Object.entries(newFilterOptions).every((item, i) => {
            if (i === 0) {
              return true;
            } else if (item[1] === true) {
              return true;
            }
          })
        ) {
          newFilterOptions = {
            all: true,
            non_stop: true,
            one_stop: true,
            two_stop: true,
            three_stop: true
          };
        } else {
          newFilterOptions = {
            ...newFilterOptions,
            all: false
          };
        }
      };
      switch (+action.payload.clickedIndex) {
        case 0: {
          newFilterOptions = {
            all: true,
            non_stop: true,
            one_stop: true,
            two_stop: true,
            three_stop: true
          };
          break;
        }
        case 1: {
          newFilterOptions = {
            ...newFilterOptions,
            non_stop: !newFilterOptions.non_stop
          };
          checkAll();
          break;
        }
        case 2: {
          newFilterOptions = {
            ...newFilterOptions,
            one_stop: !newFilterOptions.one_stop
          };
          checkAll();
          break;
        }
        case 3: {
          newFilterOptions = {
            ...newFilterOptions,
            two_stop: !newFilterOptions.two_stop
          };
          checkAll();
          break;
        }
        case 4: {
          newFilterOptions = {
            ...newFilterOptions,
            three_stop: !newFilterOptions.three_stop
          };
          checkAll();
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
        clickedIndex: action.payload.clickedIndex
      };
    }
    default: {
      return state;
    }
  }
};
