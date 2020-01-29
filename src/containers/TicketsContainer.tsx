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
  isFailed: boolean;
  sortBySome: (list: TicketsItemProps[], some: string) => object;
  getTickets: () => object;
}

class TicketsContainer extends React.Component<TicketsContainerProps> {
  constructor(props: any) {
    super(props);
    this.props.getTickets();
  }
  handleTabClick = (e: any) => {
    let some = e.currentTarget.id;
    this.props.sortBySome(this.props.ticketsList, some);
  };

  render() {
    return (
      <section>
        <div className="tabs">
          <button className="cheap" id="cheap" onClick={this.handleTabClick}>
            САМЫЙ ДЕШЕВЫЙ
          </button>
          <button className="fast" id="fast" onClick={this.handleTabClick}>
            САМЫЙ БЫСТРЫЙ
          </button>
        </div>
        <TicketsTemplate
          isFailed={this.props.isFailed}
          isFetching={this.props.isFetching}
          ticketsList={this.props.ticketsList}
        />
      </section>
    );
  }
}

const MapStateToProps = (store: MyTypes.ReducerState) => {
  return {
    ticketsList: store.tickets.ticketsList,
    filterOptions: store.filter.filterOptions,
    isFetching: store.tickets.isFetching,
    isFailed: store.tickets.isFailed
  };
};

const MapDispatchToProps = (dispatch: Dispatch<MyTypes.RootAction>) => ({
  sortBySome: (list: TicketsItemProps[], some: string) =>
    dispatch({
      type: ticketsActionTypes.SORT_BY_SOME,
      payload: {
        list,
        some
      }
    }),
  getTickets: () => {
    dispatch({ type: ticketsActionTypes.GET_TICKETS_REQUEST });
    return fetch("https://front-test.beta.aviasales.ru/search")
      .then(r => {
        return r.json();
      })
      .then(r => {
        const { searchId } = r;
        return searchId;
      })
      .then(id => {
        fetch(`https://front-test.beta.aviasales.ru/tickets?searchId=${id}`)
          .then(data => {
            return data.json();
          })
          .then(result => {
            const data = result.tickets;
            dispatch({
              type: ticketsActionTypes.GET_TICKETS_SUCCESS,
              payload: data
            });
            return data;
          })
          .catch(() => {
            dispatch({
              type: ticketsActionTypes.GET_TICKETS_FAIL
            });
          });
      });
  }
});

export default connect(MapStateToProps, MapDispatchToProps)(TicketsContainer);
