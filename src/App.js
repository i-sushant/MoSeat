import React ,{ Component }from "react";
import {Switch, Route , withRouter } from "react-router-dom";
import Home from "./containers/Home/HomeBuilder";
import Bookings from "./Booking/Booking";
import BookTickets from '../src/components/Booking/Booking'
import Search from "../src/containers/SearchBuilder/SearchBuilder";
import * as actions from './store/actions/index'
import {connect} from 'react-redux';
class App extends Component {
  render(){
    let routes = (
      <Switch>
        <Route path="/search" component={Search} />
        <Route path="/" component={Home}/>
      </Switch>
    )
    if(this.props.isAuthenticated){
      routes = (
        <Switch>
          <Route path="/booktickets" component={BookTickets} />
          <Route path="/bookings" component={Bookings} />
          <Route path="/search" component={Search} />
          <Route path="/" component={Home}/>
        </Switch>
      );
    }
  return (
      <div>
        <Switch>
          {routes}
        </Switch>
      </div>
  );
}
}
const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignUp: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));