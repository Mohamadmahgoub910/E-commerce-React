import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import "./index.css";
import "./bootstrap.min.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
// https://www.digitalocean.com/community/tutorials/build-a-to-do-application-using-django-and-react
// https://morioh.com/p/8c30a016aba9
// https://dev.to/koladev/django-rest-authentication-cmh
// favIcons Converter
//  https://favicon.io/favicon-converter/
