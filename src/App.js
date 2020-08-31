import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Main from "./components/Main";
import { DISHES } from "./shared/dishes";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES,
    };
  }
  render() {
    return (
      <div className="App">
        <Main />
      </div>
    );
  }
}

export default App;
