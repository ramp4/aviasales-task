import * as React from "react";
import TicketsItemProps from "../types/TicketItemProps";
import "./TicketsItem.scss";
import moment, { Moment } from "moment";

interface TicketsItemModel {
  data: TicketsItemProps;
  key: number;
}

export const TicketsItem: React.FC<TicketsItemModel> = props => {
  function appearDate(date: string, duration: number, durationDif: boolean) {
    let departureDate = moment(date);
    let arrivalDate = moment(date).add(duration, "minutes");
    const roundedDep = roundMinutes(departureDate);
    const roundedArr = roundMinutes(arrivalDate);

    if (durationDif) {
      let dd: any = 0;
      let hh = 0;
      let startHH = +roundedDep.slice(0, 2);
      let finishHH = +roundedArr.slice(0, 2);
      let mm: string | number = 0;

      let startMM = +roundedDep.slice(3, 5);
      let finishMM = +roundedArr.slice(3, 5);

      mm = finishMM - startMM;
      if (mm < 0) {
        mm = mm + 60;
        hh = hh - 1;
      }

      if (mm > 60) {
        mm = mm - 60;
        hh = hh + 1;
      }

      hh = finishHH - startHH + hh;
      if (hh > 23) {
        hh = hh - 24;
      }

      if (hh < 0) {
        hh = hh + 24;
      }

      dd = Math.floor(duration / 1440);
      if (dd > 0) {
        dd = `${dd}д`;
      } else dd = "";

      if (mm < 10) {
        mm = `0${mm}`;
      }
      return `${dd} ${hh}ч ${mm}м`;
    }
    return `${roundedDep} - ${roundedArr}`;
  }

  const roundMinutes = (date: Moment) => {
    let mm: any = +date.format("mm");
    mm = Math.floor(mm / 5) * 5;
    if (mm < 10) {
      mm = `0${mm}`;
    }
    let hh = date.format("HH");
    let result = `${hh}:${mm}`;
    return result;
  };

  const renderStops = (stops: number) => {
    let postTemplate;
    if (stops === 0) {
      postTemplate = "пересадок";
    } else if (stops === 1) {
      postTemplate = "пересадка";
    } else {
      postTemplate = "пересадки";
    }
    return `${stops} ${postTemplate}`;
  };

  return (
    <div className="ticket">
      <p className="ticket__price">{`${props.data.price} Р`}</p>
      <img
        className="ticket__carrier"
        src={`http://pics.avs.io/440/144/${props.data.carrier}.png`}
        alt={props.data.carrier}
      ></img>
      {props.data.segments.map((item, index) => {
        return (
          <div className="segment" key={index}>
            <p className="flight">
              <span className="flight__title title">{`${props.data.segments[index].origin} - ${props.data.segments[index].destination}`}</span>
              <br />
              <span className="flight__info info">
                {appearDate(
                  props.data.segments[index].date,
                  props.data.segments[index].duration,
                  false
                )}
              </span>
            </p>
            <p className="duration">
              <span className="duration__title title ">В ПУТИ </span>
              <br />
              <span className="duration__info info">
                {appearDate(
                  props.data.segments[index].date,
                  props.data.segments[index].duration,
                  true
                )}
              </span>
            </p>
            <p className="stops">
              <span className="stops__title title">
                {renderStops(props.data.segments[index].stops.length)}
              </span>
              <br />
              <span className="stops__info info">
                {props.data.segments[index].stops.join(", ")}
              </span>
            </p>
          </div>
        );
      })}
    </div>
  );
};
