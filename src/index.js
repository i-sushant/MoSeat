import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter} from "react-router-dom";
import App from './App';
import "./styles.css";

  document.body.style.margin = 0;
  document.body.style.padding = 0;
  const app = (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )
const rootElement = document.getElementById("root");
ReactDOM.render(app, rootElement);
