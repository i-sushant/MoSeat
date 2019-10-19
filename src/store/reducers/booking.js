import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility'

const initialState = {
    source: "",
    destination: '',
    journeyDate: '',
    totalPrice:0,
    booked:false,
    loading:false,
    bookings:[]
}

const bookingInit = (state, action) => {
    return updateObject(state, {
        booked:false
    })
}
const bookingSeatStart = (state, action) => {
    return updateObject(state, {
        loading:true
    })
}
const bookingSeatSuccess = (state, action) => {
    const newBooking = {
        ...action.bookingData
    }
    return updateObject(state, {
        loading:false,
        booked:true,
        bookings: state.bookings.concat(newBooking)
    })
}

const bookingSeatFail = (state,action) => {
    return updateObject(state, {
        loading:false
    })
}
const fetchBookingsStart = (state, action) => {
    return updateObject(state, {
        loading:true
    })
}

const fetchBookingsSuccess = (state, action) => {
    return updateObject(state,{
        bookings:action.bookings,
        loading:false
    })
}

const fetchBookingsFail = (state, action) => {
    return updateObject(state, {
        loading:false
    })
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.BOOKING_INIT: return bookingInit(state,action);
        case actionTypes.BOOKING_START: return bookingSeatStart(state, action);
        case actionTypes.BOOKING_SUCCESS: return bookingSeatSuccess(state, action);
        case actionTypes.BOOKING_FAIL: return bookingSeatFail(state, action);
        case actionTypes.FETCH_BOOKINGS_START: return fetchBookingsStart(state, action);
        case actionTypes.FETCH_BOOKINGS_SUCCESS: return fetchBookingsSuccess(state, action);
        case actionTypes.FETCH_BOOKINGS_FAIL:return fetchBookingsFail(state,action);
        default: return state;
    }
}

export default reducer;