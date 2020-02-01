import * as React from "react";
import TicketsItemProps from "../types/TicketItemProps";

import { TicketsTemplate } from "../components/TicketsTemplate";

import { connect } from "react-redux";

import { Dispatch } from "redux";
import * as MyTypes from "MyTypes";

import { ticketsActionTypes } from "../actions/ticketsActions";
import "./TicketsContainer.scss";

import { OptionsModel } from "../reducers/filterReducer";
import Tab from "../components/Tab";

interface TicketsContainerProps {
  ticketsList: TicketsItemProps[];
  isFetching: boolean;
  isFailed: boolean;
  cheap: boolean;
  filterOptions: OptionsModel;
  sortBySome: (some: string) => object;
  getTickets: () => object;
}

class TicketsContainer extends React.Component<TicketsContainerProps> {
  componentWillMount() {
    this.props.getTickets();
  }

  handleTabClick = (e: any) => {
    let some = e.currentTarget.id;
    e.preventDefault();
    this.props.sortBySome(some);
  };

  render() {
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
      <main className="main">
        <div className="tabs">
          <Tab
            onClickHandler={this.handleTabClick}
            id="cheap"
            key="cheap"
            innerText="САМЫЙ ДЕШЕВЫЙ"
            classType="selected"
          />
          <Tab
            onClickHandler={this.handleTabClick}
            id="fast"
            key="fast"
            innerText="САМЫЙ БЫСТРЫЙ"
            classType="deselected"
          />
        </div>
        {fetchingTemplate()}
        <TicketsTemplate
          ticketsList={this.props.ticketsList}
          cheap={this.props.cheap}
          options={this.props.filterOptions}
        />
      </main>
    );
  }
}

const MapStateToProps = (store: MyTypes.ReducerState) => {
  return {
    ticketsList: store.tickets.ticketsList,
    filterOptions: store.filter.filterOptions,
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
  getTickets: () => dispatch({ type: ticketsActionTypes.GET_TICKETS_REQUEST })
});

export default connect(MapStateToProps, MapDispatchToProps)(TicketsContainer);
