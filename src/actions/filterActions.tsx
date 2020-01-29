import { action } from "typesafe-actions";
import { OptionsModel } from "../reducers/filterReducer";
import TicketsItemProps from "../types/TicketItemProps";

export enum filterActionsTypes {
  SET_FILTER_OPTION = "SET_FILTER_OPTION"
}

export const filterActions = {
  setOptions: (filterOptions: OptionsModel, clickedIndex: number) =>
    action(filterActionsTypes.SET_FILTER_OPTION, {
      filterOptions,
      clickedIndex
    })
};
