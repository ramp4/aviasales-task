import * as React from "react";
import TicketsItemProps from "../types/TicketItemProps";
import "./TicketsItem.scss";
import { TicketsItem } from "../components/TicketsItem";
import { OptionsModel } from "../reducers/filterReducer";
interface TicketsListProps {
  ticketsList: TicketsItemProps[];
  cheap: boolean;
  options: OptionsModel;
}

export const TicketsTemplate: React.FC<TicketsListProps> = props => {
  const renderTemplate = () => {
    let template;
    const ticketsList = applyFilterAndTabs();
    if (ticketsList.length !== 0) {
      template = ticketsList.map((item: TicketsItemProps, idx: number) => {
        return (
          <TicketsItem
            key={idx}
            segments={item.segments}
            price={item.price}
            carrier={item.carrier}
          />
        );
      });
    } else if (props.ticketsList.length !== 0) {
      template = <p>Билетов с выбранными параметрами не найдено</p>;
    }

    return template;
  };

  const applyFilterAndTabs = () => {
    let { options } = props;
    let { ticketsList } = props;

    // eslint-disable-next-line array-callback-return
    let stopCounts = Object.entries(options).map((item, i) => {
      if (item[1] === true) {
        if (i !== 0) {
          return i - 1;
        }
        return null;
      }
    });

    let newTicketList: TicketsItemProps[] = [];

    ticketsList.forEach((item, i) => {
      let bePushed = false;
      for (let j = 0; j < 2; ++j) {
        for (let k = 0; k < stopCounts.length; ++k) {
          if (item.segments[j].stops.length === stopCounts[k]) {
            bePushed = true;
          }
        }
      }
      if (bePushed) {
        newTicketList.push(item);
      }
    });

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
