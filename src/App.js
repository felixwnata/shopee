import React, { Component } from "react";
import logo from "./logo.svg";
import "./CSS/App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Foreign Exchange Currency</h1>
        </header>

        <div id="container" className="container" />
      </div>
    );
  }
}

export default App;
