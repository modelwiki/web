import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import User from './components/User';
import ViewModel from './components/ViewModel';
import { FirebaseInit, Login } from './firebase';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

FirebaseInit();
Login();

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route path="/user/:user/model/:model" children={<ViewModel />}></Route>
        <Route path="/" children={<User />}></Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

