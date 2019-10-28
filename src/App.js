import React ,{ Component }from "react";
import {Switch, Route , withRouter } from "react-router-dom";
import * as actions from './store/actions/index'
import {connect} from 'react-redux';
import setAuthToken from '../src/utils/setAuthToken'
import Spinner from '../src/components/UI/Spinner/Spinner' 
import asyncComponent from "./hoc/asyncComponent/asyncComponent";
const asyncSearch = asyncComponent(() => {
  return import('../src/containers/SearchBuilder/SearchBuilder');
})
const asyncHome = asyncComponent(() => {
  return import('../src/containers/Home/HomeBuilder')
});
const asyncBooking = asyncComponent(() => {
  return import('../src/containers/Booking/Booking');
});
const asyncShowBookings = asyncComponent(() => {
  return import('../src/containers/Booking/ShowBookings')
})
class App extends Component {
  state={
    loading:true
  }
  componentDidMount(){
    setTimeout(() => this.setState({ loading : false}), 1700)
    //this.setState({ loading : false})
    this.props.onTryAutoSignUp();
    setAuthToken();
  } 
  
  render(){
    const styles ={
      main:{
      'top':'50%',
      'right':'50%',
      'transform':'translate(50%,-50%)'
      }, 
      loadingContainer:{
        'display': 'flex', 
        'flexDirection': 'column', 
        'justifyContent': 'center', 
        'alignItems': 'center', 
        'height': '80vh'
      }
    }
    let spinner = (
      <div style={styles.loadingContainer}>
        <Spinner style={styles.main}/>
        <h3 style={{'color':'#ed3330','fontSize':'25px'}}>Loading...</h3>
      </div>
    )
    let routes = (
      <Switch>
        <Route path="/booknow/:id" component={this.state.loading ? () =>  spinner : asyncBooking} />
        <Route path="/search" component={this.state.loading ? () =>  spinner : asyncSearch} />
        <Route path="/" component={this.state.loading ? () => spinner : asyncHome}/>
      </Switch>
    )
    if(this.props.isAuthenticated){
      routes = (
        <Switch>
          <Route path="/booknow/:id" component={this.state.loading ? () =>  spinner : asyncBooking} />
          <Route path="/showbookings" component={asyncShowBookings} />
          <Route path="/search" component={this.state.loading ? () =>  spinner : asyncSearch} />
          <Route path="/" exact component={this.state.loading ? () => spinner : asyncHome}/>
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