import * as React from "react";
import TicketsItemProps from "../types/TicketItemProps";
import { TicketsItem } from "../components/TicketsItem";
import "./TicketsContainer.scss";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import * as MyTypes from "MyTypes";
import { actionTypes } from "../actions/ticketsActions";

interface TicketsContainerState {
  showTicketsCountInput: number;
}

interface TicketsContainerProps {
  ticketsList: TicketsItemProps[];
  showTickets: (count: number) => object;
}

class TicketsContainer extends React.Component<
  TicketsContainerProps,
  TicketsContainerState
> {
  constructor(props: TicketsContainerProps) {
    super(props);
    this.state = {
      showTicketsCountInput: +"0"
    };
  }

  handleCountChange = (e: any) => {
    this.setState({
      showTicketsCountInput: e.target.value
    });
  };

  handleButtonClick = () => {
    this.props.showTickets(this.state.showTicketsCountInput);
    this.setState({
      showTicketsCountInput: +"0"
    });
  };

  render() {
    let template;
    if (this.props.ticketsList.length === 0) {
      template = <p>Nothing</p>;
    } else {
      template = this.props.ticketsList.map((item, idx) => {
        return (
          <TicketsItem
            key={idx}
            segments={item.segments}
            price={item.price}
            carrier={item.carrier}
          />
        );
      });
    }

    return (
      <div className="tickets">
        {template}
        <input
          onChange={this.handleCountChange}
          value={this.state.showTicketsCountInput}
        />
        <button onClick={this.handleButtonClick}>Show</button>
      </div>
    );
  }
}

const MapStateToProps = (store: MyTypes.ReducerState) => {
  return {
    ticketsList: store.tickets.ticketsList
  };
};

const MapDispatchToProps = (dispatch: Dispatch<MyTypes.RootAction>) => ({
  showTickets: (count: number) =>
    dispatch({ type: actionTypes.SHOW, payload: count })
});

export default connect(MapStateToProps, MapDispatchToProps)(TicketsContainer);
