import { action } from "typesafe-actions";

export enum ticketsActionTypes {
  SHOW_TICKETS = "SHOW_TICKETS "
}

export const ticketsActions = {
  showTickets: (count: number) => action(ticketsActionTypes.SHOW_TICKETS, count)
};
