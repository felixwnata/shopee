import React from "react";
import ReactDOM from "react-dom";
import "./CSS/index.css";
import App from "./App";
import Currency from "./models/Currency";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(<App />, document.getElementById("root"));
ReactDOM.render(<Currency />, document.getElementById("container"));
registerServiceWorker();
