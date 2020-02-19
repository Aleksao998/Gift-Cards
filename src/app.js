// install -> import -> use
import React from "react";
import ReactDOM from "react-dom";
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import "normalize.css/normalize.css";
import "./styles/style.scss";
import FrontMenuBar from "./routers/navigation";




const options = {
  timeout: 5000,
  position: positions.BOTTOM_RIGHT
};

const App = () => (
  <Provider template={AlertTemplate} {...options}>
  <FrontMenuBar/>
  </Provider>
);



ReactDOM.render(<App/>, document.getElementById('app'))
/*
if (module.hot) {
       module.hot.accept()
     }
*/