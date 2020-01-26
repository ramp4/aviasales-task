import { action } from "typesafe-actions";

export enum actionTypes {
  SHOW = "SHOW"
}

export const ticketsActions = {
  show: (count: number) => action(actionTypes.SHOW, count)
};
