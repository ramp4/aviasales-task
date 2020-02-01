import * as MyTypes from "MyTypes";
import { filterActionsTypes } from "../actions/filterActions";
import { handleOptionClick } from "../utils/handleOptionClick";
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
      let newFilterOptions = handleOptionClick(action.payload);

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
