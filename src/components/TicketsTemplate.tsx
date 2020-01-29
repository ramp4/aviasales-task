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
        let bePushed = item.segments.every((segment, j) => {
          if (segment.stops.length <= +stopsCount) {
            return true;
          }
          return false;
        });
        if (bePushed) newTicketList.push(item);
      });
    } else newTicketList = ticketsList;
    console.log(newTicketList);
    quickSort(newTicketList);
    return newTicketList;
  };

  function partitionCheap(
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
        [array[i], array[j]] = [array[j], array[i]];
        i++;
        j--;
      }
    }

    return i;
  }

  function partitionSpeed(
    array: Array<TicketsItemProps>,
    left: number = 0,
    right: number = array.length - 1
  ) {
    function item(index: number) {
      const result =
        (array[index].segments[0].duration +
          array[index].segments[1].duration) /
        2;
      return result;
    }
    const pivot =
      (array[Math.floor((right + left) / 2)].segments[0].duration +
        array[Math.floor((right + left) / 2)].segments[1].duration) /
      2;
    let i = left;
    let j = right;

    while (i <= j) {
      while (item(i) < pivot) {
        i++;
      }

      while (item(j) > pivot) {
        j--;
      }

      if (i <= j) {
        [array[i], array[j]] = [array[j], array[i]];
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
    if (props.cheap) {
      if (array.length > 1) {
        index = partitionCheap(array, left, right);

        if (left < index - 1) {
          quickSort(array, left, index - 1);
        }

        if (index < right) {
          quickSort(array, index, right);
        }
      }
    } else {
      if (array.length > 1) {
        index = partitionSpeed(array, left, right);

        if (left < index - 1) {
          quickSort(array, left, index - 1);
        }

        if (index < right) {
          quickSort(array, index, right);
        }
      }

      return array;
    }
  }
  return <div className="tickets-template">{renderTemplate()}</div>;
};
