import { action } from "typesafe-actions";
import TicketsItemProps from "../types/TicketItemProps";
import { act } from "react-dom/test-utils";

export enum ticketsActionTypes {
  GET_TICKETS_REQUEST = "GET_TICKETS_REQUEST",
  GET_TICKETS_SUCCESS = "GET_TICKETS_SUCCESS",
  GET_TICKETS_FAIL = "GET_TICKETS_FAIL",
  SORT_BY_SOME = "SORT_BY_SOME"
}

export const ticketsActions = {
  getTicketsRequest: () => action(ticketsActionTypes.GET_TICKETS_REQUEST),
  getTicketsSuccess: (list: TicketsItemProps[]) =>
    action(ticketsActionTypes.GET_TICKETS_SUCCESS, list),
  getTicketsFail: () => action(ticketsActionTypes.GET_TICKETS_FAIL),
  sortBySome: (list: TicketsItemProps[], some: string) =>
    action(ticketsActionTypes.SORT_BY_SOME, { list, some })
};

// const fetchData = () => {
//   return dispatch => {
//     dispatch(getTickets());
//     fetch("https://dog.ceo/api/breeds/image/random")
//       .then(res => res.json())
//       .then(
//         data => dispatch(requestDogSuccess(data)),
//         err => dispatch(requestDogError())
//       );
//   };
// };
