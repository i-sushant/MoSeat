import * as actionTypes from '../actions/actionTypes';
import axios from '../../axios-base'

export const addSource = (source) => {
    return {
        type:actionTypes.SOURCE_UPDATE,
        source:source
    }
}
export const addDestination = (destination) => {
    return {
        type:actionTypes.DESTINATION_UPDATE,
        destination: destination
    }
}

export const addJourneyDate = (journeyDate) => {
    return {
        type:actionTypes.JOURNEY_DATE_UPDATE,
        journeyDate: journeyDate
    }
}

export const searchBusesFail = () => {
    return {
        type:actionTypes.SEARCH_BUSES_FAIL,
    }
}
export const searchBusesStart = () => {
    return {
        type:actionTypes.SEARCH_BUSES_START
    }
}
export const searchBusesSuccess = (searchedData) => {
    return {
        type:actionTypes.SEARCH_BUSES_SUCCESS,
        searchData:searchedData
    }
}

export const searchBuses = (searchParams) => {
    return dispatch => {
        dispatch(searchBusesStart());
        axios.post('/bus/search', searchParams)
            .then(response => {
                dispatch(searchBusesSuccess(response.data.buses));
            })
            .catch(error => {
                dispatch(searchBusesFail());
            })
    }
}