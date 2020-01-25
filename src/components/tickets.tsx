import * as React from "react";
interface Props {
  text: string;
}

const CheckConsole: React.FunctionComponent<Props> = props => {
  const getId = async () => {
    const response = await fetch("https://front-test.beta.aviasales.ru/search");
    const body = await response.json();
    const id = body.searchId;
    return id;
  };

  const getTickets = async () => {
    let id = await getId();
    const response = await fetch(
      `https://front-test.beta.aviasales.ru/tickets?searchId=${id}`
    );
    const body = await response.json();
    const tickets = body.tickets;
    console.log(tickets[0]);
    return tickets;
  };

  getTickets();
  return <h1>{props.text}</h1>;
};

export default CheckConsole;
