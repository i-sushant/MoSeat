import React, { Component } from 'react'
import Aux from '../../hoc/Auxiliary'
import Home from '../../components/Home/Home';
import Modal from '../../components/UI/Modal/Modal';
import Auth from '../Auth/Auth'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/index' 
class HomeBuilder extends Component {
    state = {
        source: '',
        destination: '',
        journeyDate: '',
        authClicked:false,
        authCancel:false,
        searchData:''
  }
  fieldChanged = event => {
    this.setState({
      [event.target.name]:event.target.value
    })
  }
  handleAuthClicked = () => {
    this.setState({
      authClicked: !this.state.authClicked
    })
  }
  authCancelHandler =() => {
    this.setState({
      authClicked:!this.state.authClicked
    })
  }
  searchHandler = event => {
    event.preventDefault();  
    const queryObject = {
      source:this.state.source,
      destination:this.state.destination,
      journeyDate:this.state.journeyDate
    }
    this.props.onSourceChanged(this.state.source);
    this.props.onDestinationChanged(this.state.destination);
    this.props.onJourneyDateChanged(this.state.journeyDate);
    this.props.searchBuses(queryObject);
    const search = {
      source: this.state.source,
      destination: this.state.destination,
      journeyDate: this.state.journeyDate
    }
    this.props.history.push('/search?source='+search.source+'&destination='+search.destination+"&journeyDate="+search.journeyDate);
  }
    
    render() {
      let Authorize = (
        <Aux>
            <Auth authStart = {this.props.authStart}/>
        </Aux>
      )
        return (
            <Aux>
                <Modal show={this.state.authClicked && !this.props.isAuthenticated} modalClosed={this.authCancelHandler}>
                  {Authorize}
                </Modal>
                <Home fieldChanged={this.fieldChanged}
                      searchHandler={this.searchHandler}
                      source={this.state.source}
                      destination={this.state.destination}
                      journeyDate={this.state.journeyDate}
                      handleAuthClicked = {this.handleAuthClicked}
                      isAuthenticated= {this.props.isAuthenticated}
                      name={this.props.name}
                      logout={this.props.logout} />
                
            </Aux>
        )
    }
}
const mapStateToProps = state => {
  return {
      isAuthenticated: state.auth.token != null,
      error:state.auth.error,
      name:state.auth.name,
      loading:state.auth.loading
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onSourceChanged: (source) => dispatch(actions.addSource(source)),
    onDestinationChanged: (destination) => dispatch(actions.addDestination(destination)),
    onJourneyDateChanged: (journeyDate) => dispatch(actions.addJourneyDate(journeyDate)),
    searchBuses: (searchData) => dispatch(actions.searchBuses(searchData)),
    logout:() => dispatch(actions.logout()),
    authStart:() => dispatch(actions.authStart())
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(HomeBuilder);
