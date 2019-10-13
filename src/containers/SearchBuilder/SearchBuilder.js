import React, { Component } from 'react'
import { Route } from 'react-router-dom';
import Aux from '../../hoc/Auxiliary';
import Search from '../../Search/Search'
import queryString from 'query-string';
import axios from 'axios';
class SearchBuilder extends Component {
    _isMounted = false;
    state = {
        source: '',
        destination: '',
        journeyDate: '',
        searchData: ''
    }
    componentDidMount() {
        this._isMounted = true;
        let queryObject = queryString.parse(this.props.location.search);
        this.setState({
            searchData:''
        });
        axios.post('http://localhost:3002/bus/search', queryObject)
                .then(data => {
                    if(this._isMounted){
                        this.setState({
                        searchData: data.data
                    })
                    }
                    this.props.history.push('/search?source=' + this.state.source + '&destination=' + this.state.destination);
                })
                .catch(error => console.log(error));
    }
    componentWillUnmount(){
        this._isMounted = false;
    }
    sourceChanged = event => {
        console.log(event.target.value);
        this.setState({
            source: event.target.value
        })
    }
    destinationChanged = event => {
        console.log(event.target.value);
        this.setState({
            destination: event.target.value
        })
    }
    dateChanged = event => {
        console.log(event.target.value);
        this.setState({
            journeyDate: event.target.value
        })
    }
    searchHandler = () => {
        //let queryObject = queryString.parse(this.props.location.search);
        let queryObject = {
            source: this.state.source,
            destination: this.state.destination
        }
        console.log(queryObject)
        this.setState({
            searchData:''
        });
        axios.post('http://localhost:3002/bus/search', queryObject)
            .then(data => {
                this.setState({
                    searchData: data.data
                    })
                console.log(data);
                this.props.history.push('/search?source=' + this.state.source + '&destination=' + this.state.destination);
            })
            .catch(error => console.log(error));
    }
    render() {
        return (
            <Aux>
               <Search  availableBuses={this.state.searchData.buses}
                        source={this.state.source}
                        destination={this.state.destination}
                        journeyDate={this.state.journeyDate}
                        sourceChanged={this.sourceChanged}
                        destinationChanged={this.destinationChanged}
                        dateChanged={this.dateChanged}
                        searchHandler={this.searchHandler}
                        searchData={this.state.searchData}/>
            </Aux>
        )
    }
}

export default SearchBuilder
