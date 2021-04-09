import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { Homepage } from './components/Homepage';
import configureStore from "./store/configureStore";
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles/styles.scss"; 

const store = configureStore()

const jsx = (
  <Provider store={store}>
    <Homepage/>
  </Provider>
)

ReactDOM.render(jsx, document.getElementById("root"));


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
