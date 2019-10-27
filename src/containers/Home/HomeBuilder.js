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
        openModal:false,
        authStart:false,
        searchData:''
  }
  fieldChanged = event => {
    this.setState({
      [event.target.name]:event.target.value
    })
  }
  closeModal = () => {
    this.setState({
      openModal:false,
      authStart:false
    })
  }

  openModal = () => {
    this.setState({
      openModal:true,
      authStart:true
    })
  }
  switchRoute = (event) => {
        event.preventDefault();
        this.setState({
            source:this.state.destination,
            destination:this.state.source
        })
    }
  authLogout =() => {
    this.setState({
      authStart:false
    });
    this.props.logout();
  }
  searchHandler = event => {
    event.preventDefault();  
    const queryObject = {
      source:this.state.source,
      destination:this.state.destination,
      journeyDate:this.state.journeyDate
    }
    this.props.searchBuses(queryObject);
    console.log("Inside homebuilder "+queryObject.journeyDate)
    this.setFieldForSearch(queryObject.source, queryObject.destination, queryObject.journeyDate);
    this.props.history.push('/search?source=' + queryObject.source + '&destination=' + queryObject.destination + "&journeyDate=" + queryObject.journeyDate);
  }
    setFieldForSearch = (source, destination, journeyDate) => {
      this.props.setField(source, destination,journeyDate);
    }
    render() {
      let Authorize = (
        <Aux>
            <Auth authStart = {this.props.authStart}
                  error={this.props.error}/>
        </Aux>
      )
        return (
            <Aux>
                <Modal show={ this.state.authStart && this.state.openModal && !this.props.isAuthenticated } modalClosed={this.closeModal}>
                  {Authorize}
                </Modal>
                <Home fieldChanged={this.fieldChanged}
                      searchHandler={this.searchHandler}
                      source={this.state.source}
                      destination={this.state.destination}
                      journeyDate={this.state.journeyDate}
                      handleAuthClicked = {this.openModal}
                      isAuthenticated= {this.props.isAuthenticated}
                      authLogout={this.authLogout} 
                      switchRoute={this.switchRoute}/>
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
    authStart:() => dispatch(actions.authStart()),
    authCancel:() => dispatch(actions.authCancel()),
    setField: (source, destination, journeyDate) => dispatch(actions.setFieldForSearch(source, destination, journeyDate))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(HomeBuilder);
