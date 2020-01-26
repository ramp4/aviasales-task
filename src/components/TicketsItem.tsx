import * as React from "react";
import TicketsItemProps from "../types/TicketItemProps";

export const TicketsItem: React.FC<TicketsItemProps> = props => {
  return (
    <div className="ticket">
      <p className="ticket__price">{`${props.price} Р`}</p>
      <p className="ticket__carrier">{`Перевозчик ${props.carrier}`}</p>
      {props.segments.map((item, index) => {
        return (
          <div key={index} className="first-segment">
            <p className="flight">
              <span className="flight__way">{`${props.segments[0].origin} - ${props.segments[0].destination}`}</span>
              <span className="flight__time">{props.segments[0].date}</span>
            </p>
            <p className="duration">
              <span className="duration__title">В ПУТИ</span>
              <span className="duration__time">
                {props.segments[1].duration}
              </span>
            </p>
            <p className="stops">
              <span className="stops__title">{`Количество пересадок: ${props.segments[0].stops.length}`}</span>
              <span className="stops__names">
                {props.segments[1].stops.join(", ")}
              </span>
            </p>
          </div>
        );
      })}
    </div>
  );
};
