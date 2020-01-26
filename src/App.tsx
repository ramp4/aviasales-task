import React from "react";
import TicketsContainer from "./containers/TicketsContainer";
import FilterOption from "./components/FilterOption";
import { filterOptionsArray } from "./data/filterOptionsArray";
class App extends React.Component {
  render() {
    return (
      <div className="App">
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
          <TicketsContainer />
        </main>
      </div>
    );
  }
}

export default App;
