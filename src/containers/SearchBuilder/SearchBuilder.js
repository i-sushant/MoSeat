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
        this.props.searchBuses(queryObject);
        this.props.history.push('/search?source=' + this.state.source + '&destination=' + this.state.destination);
    }
    render() {
        return (
            <Aux>
               <Search  availableBuses={this.state.searchData.buses}
                        source={this.state.source}
                        destination={this.state.destination}
                        journeyDate={this.state.journeyDate}
                        searchHandler={this.searchHandler}
                        searchData={this.props.searchData? this.props.searchData : ''}
                        fieldChanged={this.fieldChanged}
                />
            </Aux>
        )
    }
}
const mapStateToProps = state => {
    return {
        source:state.search.source,
        destination:state.search.destination,
        journeyDate: state.search.journeyDate,
        searchData:state.search.searchData
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onSourceChanged: (source) => dispatch(actions.addSource(source)),
        onDestinationChanged: (destination) => dispatch(actions.addDestination(destination)),
        onJourneyDateChanged: (journeyDate) => dispatch(actions.addJourneyDate(journeyDate)),
        searchBuses: (searchData) => dispatch(actions.searchBuses(searchData))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(SearchBuilder);
