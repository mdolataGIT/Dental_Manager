import React, { Component } from "react";
import Dashboard from "./components/Dashboard";
import "./App.css";
import Header from "./components/Layout/Header";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AddClient from "./components/Client/AddClient";
import { Provider } from "react-redux";
import store from "./store";
import UpdateClient from "./components/Client/UpdateClient";
import ClientBoard from "./components/ClientBoard/ClientBoard";
import AddTooth from "./components/ClientBoard/Teeth/AddTooth";
import UpdateTooth from "./components/ClientBoard/Teeth/UpdateTooth";
import Landing from "./components/Layout/Landing";
import Register from "./components/UserManagment/Register";
import Login from "./components/UserManagment/Login";
import jwt_decode from "jwt-decode";
import setJWTToken from "./securityUtils/setJWTToken";
import { SET_CURRENT_USER } from "./actions/types";
import { logout } from "./actions/securityActions";
import SecuredRoute from "./securityUtils/SecureRoute";
import PhotoBoard from "./components/ClientBoard/PhotoBoard";
import AddXrayPhoto from "./components/ClientBoard/Xray/AddXrayPhoto.js";
import CalendarClass from "./components/ClientBoard/Calendar/CalendarClass.js";
import AddCalendar from "./components/ClientBoard/Calendar/AddCalendar";
import Contact from "./components/Contact/Contact.js";

const jwtToken = localStorage.jwtToken;

if (jwtToken) {
  setJWTToken(jwtToken);
  const decoded_jwtToken = jwt_decode(jwtToken);
  store.dispatch({
    type: SET_CURRENT_USER,
    payload: decoded_jwtToken,
  });

  const currentTime = Date.now() / 1000;
  if (decoded_jwtToken.exp < currentTime) {
    store.dispatch(logout());
    window.location.href = "/";
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Header />

          <Route exact path="/" component={Landing} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />

          <Switch>
            <SecuredRoute exact path="/dashboard" component={Dashboard} />
            <SecuredRoute exact path="/addClient" component={AddClient} />
            <SecuredRoute
              exact
              path="/updateClient/:id"
              component={UpdateClient}
            />
            <SecuredRoute
              exact
              path="/clientBoard/:id"
              component={ClientBoard}
            />
            <SecuredRoute exact path="/addTooth/:id" component={AddTooth} />
            <SecuredRoute
              exact
              path="/updateTooth/:backlogClient_id/:t_id"
              component={UpdateTooth}
            />

            <SecuredRoute exact path="/calendar" component={CalendarClass} />
            <SecuredRoute exact path="/addCalendar" component={AddCalendar} />
            <SecuredRoute exact path="/contact" component={Contact} />
            <SecuredRoute exact path="/toPhotos/:id" component={PhotoBoard} />
            <SecuredRoute exact path="/addPhoto/:id" component={AddXrayPhoto} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
