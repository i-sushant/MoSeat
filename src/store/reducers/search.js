import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../../shared/utility'

const initialState = {
    source : '',
    destination:'',
    journeyDate: '',
    searchData:'',
    loading:false,
    error:''
}

const addSource = (state,action) => {
    const source = action.source
    const updatedState = {
        source: source
    }
    return updateObject(state,updatedState);
}
const addDestination = (state, action) => {
    const destination = action.destination
    const updatedState = {
        destination: destination        
    }
    return updateObject(state, updatedState);
}

const addJourneyDate = (state,action) => {
    const journeyDate = action.journeyDate;
    const updatedState = {
        journeyDate:journeyDate
    }
    return updateObject(state, updatedState);
}
const startSearch = (state,action) => {
    const updatedState ={
        source: '',
        destination: '',
        journeyDate: '',
        searchData: '',
        loading: true,
        error: ''
    }
    return updateObject(state, updatedState);
}

const updateSearchData = (state,action) => {
    const searchData = action.searchData;
    const updatedState = {
        searchData:searchData,
        loading:false,
        error:''
    }
    return updateObject(state,updatedState);
}
const searchBusesFail = (state,action) => {
    const updatedState = {
        source: '',
        destination: '',
        journeyDate: '',
        searchData: '',
        loading: false,
        error: action.error
    }
    return updateObject(state,updatedState);
}
const reducer = (state= initialState, action) => {
    switch(action.type){
        case actionTypes.SOURCE_UPDATE : return addSource(state,action);
        case actionTypes.DESTINATION_UPDATE : return addDestination(state, action);
        case actionTypes.JOURNEY_DATE_UPDATE : return addJourneyDate(state, action);
        case actionTypes.SEARCH_BUSES_SUCCESS :return updateSearchData(state,action);
        case actionTypes.SEARCH_BUSES_FAIL:return searchBusesFail(state,action);
        case actionTypes.SEARCH_BUSES_START: return startSearch(state, action);
        default: return state;
    }
}
export default reducer;