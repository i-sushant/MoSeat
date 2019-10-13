import React from "react";
import {Switch, Route } from "react-router-dom";
import Home from "./containers/Home/HomeBuilder";
import Bookings from "./Booking/Booking";
import Search from "../src/containers/SearchBuilder/SearchBuilder";

const App = ()  => {
  return (
      <Switch>
        <Route path="/bookings" component={Bookings} />
        <Route path="/search" component={Search} />
        <Route path="/" exact component={Home} />
      </Switch>
  );
}

export default App;