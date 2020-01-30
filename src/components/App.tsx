import React from "react";
import TicketsContainer from "../containers/TicketsContainer";
import FilterContainer from "../containers/FilterContainer";
import "./App.scss";
import logoSrc from "../data/logo.svg";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <img className="App_logo" alt="App_logo" src={logoSrc}></img>
        <FilterContainer />
        <TicketsContainer />
      </div>
    );
  }
}

export default App;
