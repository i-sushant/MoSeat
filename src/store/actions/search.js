import * as actionTypes from '../actions/actionTypes';
import axios from '../../axios-base'

export const setFieldForSearch = (source, destination, journeyDate) => {
    return {
        type: actionTypes.SET_FIELD_FOR_SEARCH,
        source: source,
        destination: destination,
        journeyDate: journeyDate
        
    }
}
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
export const searchBusesFail = (error) => {

    return {
        type:actionTypes.SEARCH_BUSES_FAIL,
        error:error
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
                if (response.data.buses)
                    dispatch(searchBusesSuccess(response.data.buses));
                else {
                    dispatch(searchBusesFail(response.data.error))
                }      
            })
            .catch(error => {
                dispatch(searchBusesFail(error.message));
            })
    }
}