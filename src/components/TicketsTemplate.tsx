import * as React from "react";
import TicketsItemProps from "../types/TicketItemProps";
import "./TicketsItem.scss";
import { TicketsItem } from "../components/TicketsItem";

interface TicketsListProps {
  ticketList?: TicketsItemProps[];
  isFetching: boolean;
  onLoad: any;
}

export const TicketsTemplate: React.FC<TicketsListProps> = props => {
  const renderTemplate = () => {
    let template;
    if (props.isFetching) {
      template = <p>Загружаю...</p>;
    } else {
      // template = props.ticketsList.map((item, idx) => {
      //   return (
      //     <TicketsItem
      //       key={idx}
      //       segments={item.segments}
      //       price={item.price}
      //       carrier={item.carrier}
      //     />
      //   );
      // });
    }
    return template;
  };

  return <div className="tickets-template">{renderTemplate()}</div>;
};
