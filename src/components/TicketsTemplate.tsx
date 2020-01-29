import * as React from "react";
import TicketsItemProps from "../types/TicketItemProps";
import "./TicketsItem.scss";
import { TicketsItem } from "../components/TicketsItem";

interface TicketsListProps {
  ticketsList: TicketsItemProps[];
  isFetching: boolean;
  isFailed: boolean;
}

export const TicketsTemplate: React.FC<TicketsListProps> = props => {
  const renderTemplate = () => {
    let template;
    if (props.isFetching) {
      template = <p>Загружаю...</p>;
    }
    if (props.isFailed) {
      template = <p>Не удалось загрузить данные</p>;
    } else {
      console.log(props.ticketsList);
      template = props.ticketsList.map((item, idx) => {
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
    return template;
  };

  return <div className="tickets-template">{renderTemplate()}</div>;
};
