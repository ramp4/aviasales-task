import React from "react";
import TicketsContainer from "./containers/TicketsContainer";
import FilterContainer from "./containers/FilterContainer";
class App extends React.Component {
  render() {
    return (
      <div className="App">
        <FilterContainer />
        <main className="main">
          <TicketsContainer />
        </main>
      </div>
    );
  }
}

export default App;
