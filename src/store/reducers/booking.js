import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility'
const initialState = {
    source: "",
    destination: '',
    journeyDate: '',
    totalSeats:'',
    totalPrice:0,
    basePrice:0,
    booked:false,
    loading:false,
    bookings:[],
    busId:''
}

// const bookingInit = (state, action) => {
//     const updatedState = {
//         source:action.source,
//         destination:action.destination,
//         journeyDate:action.journeyDate,
//         totalSeats:action.totalSeats,
//         totalPrice:action.basePrice * action.totalSeats,
//         booked:false
//     }
//     return updateObject(state, updatedState)
// }
const setField = (state, action) => {
    const formatDate = action.journeyDate.split('-');
    const journeyDate = [formatDate[2], formatDate[1], formatDate[0]].join('-')
    const updatedState ={
            busId: action.busId,
            source: action.source,
            destination: action.destination,
            journeyDate:journeyDate,
            basePrice:action.basePrice
    }
    return updateObject(state,updatedState);
}
const addSeat = (state,action) => {
    return updateObject(state,{totalSeats: Number(state.totalSeats) + 1})
}
const removeSeat = (state,action) => {
    return updateObject(state,{totalSeats: Number(state.totalSeats) - 1})
}
const changeTotalSeats = (state,action) => {
    return updateObject(state, {totalSeats : Number(action.totalSeats)})
}
const updateTotalPrice = (state,action) => {
    return updateObject(state, {totalPrice: state.totalSeats * state.basePrice});
}
const bookingSeatStart = (state, action) => {
    return updateObject(state, {
        loading:true,
        booked:false,
    })
}
const bookingSeatSuccess = (state, action) => {
    const bookingUpdate = action.bookingData
    return updateObject(state, {
        loading:false,
        booked:true,
        source: "",
        destination: '',
        journeyDate: '',
        totalSeats: '',
        totalPrice: 0,
        basePrice: 0,
        busId: '',
        bookings: state.booking.concat(bookingUpdate)
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
        case actionTypes.ADD_SEAT : return addSeat(state,action);
        case actionTypes.REMOVE_SEAT : return removeSeat(state,action);
        case actionTypes.CHANGE_TOTAL_SEATS : return changeTotalSeats(state,action);
        case actionTypes.UPDATE_TOTAL_PRICE:return updateTotalPrice(state,action)
        case actionTypes.SET_FIELD: return setField(state, action);
        //case actionTypes.BOOKING_INIT: return bookingInit(state,action);
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