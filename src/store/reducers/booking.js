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
    busId:'',
    fetchError:'',
    bookError:'',
    fetchedBookings:[]
}

const setField = (state, action) => {
    const updatedState ={
            busId: action.busId,
            source: action.source,
            destination: action.destination,
            journeyDate:action.journeyDate,
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

const bookingInit = (state, action) => {
    return updateObject(state,{
        loading:false,
        booked:false,
        bookError: null

    })
}
const bookingSeatStart = (state, action) => {
    return updateObject(state, {
        loading:true,
        booked:false,
        bookError: null
    })
}
const bookingSeatSuccess = (state, action) => {
    const bookingUpdate = action.bookingData
    return updateObject(state, {
        bookError:null,
        loading:false,
        booked:true,
        source: "",
        destination: '',
        journeyDate: '',
        totalSeats: '',
        totalPrice: 0,
        basePrice: 0,
        busId: '',
        bookings: state.bookings.concat(bookingUpdate)
    })
}

const bookingSeatFail = (state,action) => {
    return updateObject(state, {
        loading:false,
        bookError:action.error
    })
}
const fetchBookingsStart = (state, action) => {
    return updateObject(state, {
        loading:true
    })
}

const fetchBookingsSuccess = (state, action) => {
    return updateObject(state,{
        bookings: action.bookings,
        loading:false,
        fetchError:null
    })
}

const fetchBookingsFail = (state, action) => {
    return updateObject(state, {
        loading:false,
        fetchError:action.error
    })
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.ADD_SEAT : return addSeat(state,action);
        case actionTypes.REMOVE_SEAT : return removeSeat(state,action);
        case actionTypes.CHANGE_TOTAL_SEATS : return changeTotalSeats(state,action);
        case actionTypes.UPDATE_TOTAL_PRICE:return updateTotalPrice(state,action)
        case actionTypes.SET_FIELD: return setField(state, action);
        case actionTypes.BOOKING_INIT: return bookingInit(state, action);
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