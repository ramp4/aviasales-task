import * as React from "react";
import TicketsItemProps from "../types/TicketItemProps";
import "./TicketsItem.scss";
import { TicketsItem } from "../components/TicketsItem";
import { ticketsReducer } from "../reducers/ticketsReducer";

interface TicketsListProps {
  ticketsList: TicketsItemProps[];
  stopsCount: number;
  cheap: boolean;
}

export const TicketsTemplate: React.FC<TicketsListProps> = props => {
  const renderTemplate = () => {
    const ticketsList = applyFilterAndTabs();
    let template = ticketsList.map((item: TicketsItemProps, idx: number) => {
      return (
        <TicketsItem
          key={idx}
          segments={item.segments}
          price={item.price}
          carrier={item.carrier}
        />
      );
    });
    return template;
  };

  const applyFilterAndTabs = () => {
    let { stopsCount, ticketsList } = props;
    if (stopsCount === undefined) stopsCount = -1;
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
    } else newTicketList = ticketsList;
    console.log(newTicketList);
    quickSort(newTicketList);
    return newTicketList;
  };

  function partition(
    array: Array<TicketsItemProps>,
    left: number = 0,
    right: number = array.length - 1
  ) {
    const pivot = array[Math.floor((right + left) / 2)].price;
    let i = left;
    let j = right;

    while (i <= j) {
      while (array[i].price < pivot) {
        i++;
      }

      while (array[j].price > pivot) {
        j--;
      }

      if (i <= j) {
        [array[i].price, array[j].price] = [array[j].price, array[i].price];
        i++;
        j--;
      }
    }

    return i;
  }

  function quickSort(
    array: Array<TicketsItemProps>,
    left: number = 0,
    right: number = array.length - 1
  ) {
    let index;

    if (array.length > 1) {
      index = partition(array, left, right);

      if (left < index - 1) {
        quickSort(array, left, index - 1);
      }

      if (index < right) {
        quickSort(array, index, right);
      }
    }

    return array;
  }

  const { cheap } = props;
  if (cheap) {
  }

  return <div className="tickets-template">{renderTemplate()}</div>;
};
