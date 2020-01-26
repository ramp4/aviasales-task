import * as React from "react";
import TicketsItemProps from "../types/TicketItemProps";

export const TicketsItem: React.FC<TicketsItemProps> = props => {
  return (
    <div className="ticket">
      <p className="ticket__price">{`${props.data.price} Р`}</p>
      <p className="ticket__carrier">{`Перевозчик ${props.data.carrier}`}</p>
      {props.data.segments.map((item, index) => {
        return (
          <div key={index} className="first-segment">
            <p className="flight">
              <span className="flight__way">{`${props.data.segments[0].origin} - ${props.data.segments[0].destination}`}</span>
              <span className="flight__time">
                {props.data.segments[0].date}
              </span>
            </p>
            <p className="duration">
              <span className="duration__title">В ПУТИ</span>
              <span className="duration__time">
                {props.data.segments[1].duration}
              </span>
            </p>
            <p className="stops">
              <span className="stops__title">{`Количество пересадок: ${props.data.segments[0].stops.length}`}</span>
              <span className="stops__names">
                {props.data.segments[1].stops.join(", ")}
              </span>
            </p>
          </div>
        );
      })}
    </div>
  );
};
