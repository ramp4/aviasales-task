import React from "react";
import "./App.css";
import TicketsContainer from "./components/TicketsContainer";
import FilterOption from "./components/FilterOption";

const filterOptionsArray = [
  { name: "all", text: "Все" },
  { name: "non-stop", text: "Без пересадок" },
  { name: "one-stop", text: "1 пересадка" },
  { name: "two-stop", text: "2 пересадки" },
  { name: "three-stop", text: "3 пересадки" }
];

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <TicketsContainer />
        <aside className="filter">
          <form>
            <h3>Количество пересадок</h3>
            {filterOptionsArray.map((item, index) => {
              return (
                <FilterOption key={index} name={item.name} text={item.text} />
              );
            })}
          </form>
        </aside>
        <main className="main">
          <div className="tabs">
            <button className="cheap">САМЫЙ ДЕШЕВЫЙ</button>
            <button className="fast">САМЫЙ БЫСТРЫЙ</button>
          </div>
          <div className="tickets"></div>
        </main>
      </div>
    );
  }
}

export default App;
