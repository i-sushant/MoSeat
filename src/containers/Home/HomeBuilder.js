import React, { Component } from 'react'
import Aux from '../../hoc/Aux'
import Home from '../../Home/Home'
class HomeBuilder extends Component {
    state = {
        source: '',
        destination: '',
        journeyDate: ''
  }
  sourceChanged = event => {
    this.setState({
      source:event.target.value
    })
  }
  destinationChanged = event => {
    this.setState({
      destination:event.target.value
    })
  }
  dateChanged = event => {
    this.setState({
      journeyDate:event.target.value
    })
  }
  searchHandler = event => {
    event.preventDefault();
    const search = {
        source:this.state.source,
        destination:this.state.destination,
        journeyDate:this.state.journeyDate
    }
    this.props.history.push('/search?source='+search.source+'&destination='+search.destination+"&journeyDate="+search.journeyDate);
  }
    render() {
        return (
            <Aux>
                <Home sourceChanged={this.sourceChanged}
                      destinationChanged={this.destinationChanged}
                      dateChanged={this.dateChanged}
                      searchHandler={this.searchHandler}
                      source={this.state.source}
                      destination={this.state.destination}
                      journeyDate={this.state.journeyDate}/>
                
            </Aux>
        )
    }
}

export default HomeBuilder;
