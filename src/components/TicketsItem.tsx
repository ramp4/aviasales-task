import * as React from "react";
import TicketsItemProps from "../types/TicketItemProps";
import "./TicketsItem.scss";

export const TicketsItem: React.FC<TicketsItemProps> = props => {
  return (
    <div className="ticket">
      <p className="ticket__price">{`${props.price} Р`}</p>
      <p className="ticket__carrier">{`Перевозчик ${props.carrier}`}</p>
      {props.segments.map((item, index) => {
        return (
          <div key={index} className="segment">
            <p className="flight">
              <span className="flight__way">{`${props.segments[index].origin} - ${props.segments[index].destination}`}</span>
              <br />
              <span className="flight__time">{props.segments[index].date}</span>
            </p>
            <p className="duration">
              <span className="duration__title">В ПУТИ </span>
              <br />
              <span className="duration__time">
                {props.segments[index].duration}
              </span>
            </p>
            <p className="stops">
              <span className="stops__title">{`Количество пересадок: ${props.segments[index].stops.length}`}</span>
              <br />
              <span className="stops__names">
                {props.segments[index].stops.join(", ")}
              </span>
            </p>
          </div>
        );
      })}
    </div>
  );
};
