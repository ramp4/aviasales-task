import * as React from "react";
import TicketsItemProps from "../types/TicketItemProps";
import { TicketsTemplate } from "../components/TicketsTemplate";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import * as MyTypes from "MyTypes";
import { ticketsActionTypes } from "../actions/ticketsActions";
import "./TicketsContainer.scss";
interface TicketsContainerProps {
  stopsCount: number;
  ticketsList: TicketsItemProps[];
  isFetching: boolean;
  isFailed: boolean;
  cheap: boolean;
  sortBySome: (some: string) => object;
  getTickets: () => object;
}

class TicketsContainer extends React.Component<TicketsContainerProps> {
  constructor(props: any) {
    super(props);
    this.props.getTickets();
  }
  handleTabClick = (e: any) => {
    let some = e.currentTarget.id;
    this.props.sortBySome(some);
  };

  applyFilter() {
    let { stopsCount, ticketsList } = this.props;
    let newTicketList: TicketsItemProps[] = [];
    if (stopsCount !== -1) {
      ticketsList.map((item, i) => {
        let bePushed = false;
        item.segments.map((segment, j) => {
          if (segment.stops.length === +stopsCount) {
            bePushed = true;
            return segment;
          }
        });
        if (bePushed) newTicketList.push(item);
      });
    }
    newTicketList = ticketsList;
    return newTicketList;
  }

  render() {
    const newTicketList = this.applyFilter();

    const fetchingTemplate = () => {
      let template;
      if (this.props.isFetching) {
        template = <p>Загружаю...</p>;
      } else if (this.props.isFailed) {
        template = <p>Не удалось загрузить данные</p>;
      }
      return template;
    };
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
        {fetchingTemplate()}
        <TicketsTemplate
          ticketsList={newTicketList}
          stopsCount={this.props.stopsCount}
          cheap={this.props.cheap}
        />
      </section>
    );
  }
}

const MapStateToProps = (store: MyTypes.ReducerState) => {
  return {
    ticketsList: store.tickets.ticketsList,
    stopsCount: store.filter.stopsCount,
    isFetching: store.tickets.isFetching,
    isFailed: store.tickets.isFailed,
    cheap: store.tickets.cheap
  };
};

const MapDispatchToProps = (dispatch: Dispatch<MyTypes.RootAction>) => ({
  sortBySome: (some: string) =>
    dispatch({
      type: ticketsActionTypes.SORT_BY_SOME,
      payload: {
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
