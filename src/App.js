import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Main from "./components/Main";
import { DISHES } from "./shared/dishes";
import { BrowserRouter } from "react-router-dom";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES,
    };
  }
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Main />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
