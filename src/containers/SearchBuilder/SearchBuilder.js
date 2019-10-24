import React, { Component } from 'react'
import Aux from '../../hoc/Auxiliary';
import Search from '../../components/Search/Search'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/index'
class SearchBuilder extends Component {
    state = {
        source: '',
        destination: '',
        journeyDate: '',
        searchData: '',
        isAuthenticated: this.props.isAuthenticated
    }
    fieldChanged = event => {
        this.setState({
            [event.target.name] : event.target.value
        })
    }
    switchRoute = (event) => {
        event.preventDefault();
        this.setState({
            source:this.state.destination,
            destination:this.state.source
        })
    }
    searchHandler = (event) => {
        event.preventDefault();
        let queryObject = {
            source: this.state.source,
            destination: this.state.destination,
            journeyDate:this.state.journeyDate
        }
        this.setState({
            searchData:''
        });
        this.props.onSourceChanged(this.state.source);
        this.props.onDestinationChanged(this.state.destination);
        this.props.onJourneyDateChanged(this.state.journeyDate);
        this.props.searchBusesStart();
        setTimeout(() =>  this.props.searchBuses(queryObject), 1500);
        this.props.history.push('/search?source=' + this.state.source + '&destination=' + this.state.destination);
    }
    setFieldForBooking = (busId, source, destination,basePrice) => {
        this.props.setFieldForBooking(busId, source, destination, this.state.journeyDate, basePrice);
    }
    render() {
        return (
            <Aux>
                {/* <Modal show={this.state.authClicked && !this.props.isAuthenticated} modalClosed={this.authCancelHandler}>
                  {Authorize}
                </Modal> */}
               <Search  availableBuses={this.state.searchData.buses}
                        source={this.state.source}
                        destination={this.state.destination}
                        journeyDate={this.state.journeyDate}
                        searchHandler={this.searchHandler}
                        searchData={this.props.searchData? this.props.searchData : ''}
                        fieldChanged={this.fieldChanged}
                        isAuthenticated={this.props.isAuthenticated}
                        logout={this.props.logout}
                        name={this.props.name}
                        loading={this.props.loading}
                        error={this.props.error}
                        switchRoute={this.switchRoute}
                        setFieldForBooking= {this.setFieldForBooking}
                />
            </Aux>
        )
    }
}
const mapStateToProps = state => {
    return {
        name:state.auth.name,
        source:state.search.source,
        destination:state.search.destination,
        journeyDate: state.search.journeyDate,
        searchData:state.search.searchData,
        isAuthenticated: state.auth.token != null,
        loading:state.search.loading,
        error:state.search.error
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onSourceChanged: (source) => dispatch(actions.addSource(source)),
        onDestinationChanged: (destination) => dispatch(actions.addDestination(destination)),
        onJourneyDateChanged: (journeyDate) => dispatch(actions.addJourneyDate(journeyDate)),
        searchBuses: (searchData) => dispatch(actions.searchBuses(searchData)),
        logout: () => dispatch(actions.logout()),
        searchBusesStart: () => dispatch(actions.searchBusesStart()),
        setFieldForBooking: (busId, source, destination, journeyDate, basePrice) => dispatch(actions.setField(busId, source, destination, journeyDate, basePrice))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(SearchBuilder);
