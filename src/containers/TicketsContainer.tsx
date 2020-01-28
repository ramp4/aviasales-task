import * as React from "react";
import TicketsItemProps from "../types/TicketItemProps";
import { TicketsTemplate } from "../components/TicketsTemplate";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import * as MyTypes from "MyTypes";
import { ticketsActionTypes } from "../actions/ticketsActions";
import "./TicketsContainer.scss";
interface TicketsContainerProps {
  ticketsList: TicketsItemProps[];
  isFetching: boolean;
  getTickets: () => object;
  sortBySome: (list: TicketsItemProps[], some: string) => object;
}

export const TicketsContainer: React.FC<TicketsContainerProps> = props => {
  const handleTabClick = (e: any) => {
    let some = e.currentTarget.id;
    props.sortBySome(props.ticketsList, some);
  };

  return (
    <section>
      <div className="tabs">
        <button className="cheap" id="cheap" onClick={handleTabClick}>
          САМЫЙ ДЕШЕВЫЙ
        </button>
        <button className="fast" id="fast" onClick={handleTabClick}>
          САМЫЙ БЫСТРЫЙ
        </button>
      </div>
      <TicketsTemplate
        onLoad={props.getTickets()}
        isFetching={props.isFetching}
      />
    </section>
  );
};

const MapStateToProps = (store: MyTypes.ReducerState) => {
  return {
    ticketsList: store.tickets.ticketsList,
    filterOptions: store.filter.filterOptions,
    isFetching: store.tickets.isFetching
  };
};

const MapDispatchToProps = (dispatch: Dispatch<MyTypes.RootAction>) => ({
  getTickets: () => dispatch({ type: ticketsActionTypes.GET_TICKETS_REQUEST }),
  sortBySome: (list: TicketsItemProps[], some: string) =>
    dispatch({
      type: ticketsActionTypes.SORT_BY_SOME,
      payload: {
        list,
        some
      }
    }),
  getTicketsSuccess: () =>
    dispatch({
      type: ticketsActionTypes.GET_TICKETS_SUCCESS
    })
});

export default connect(MapStateToProps, MapDispatchToProps)(TicketsContainer);
