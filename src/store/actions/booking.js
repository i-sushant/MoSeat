import * as actionTypes from '../actions/actionTypes'
import axios from '../../axios-base'

export const setField = (busId, source, destination, journeyDate, basePrice) => {
    return {
        type:actionTypes.SET_FIELD,
        busId:busId,
        source:source,
        destination:destination,
        journeyDate:journeyDate,
        basePrice:basePrice
    }
}
export const addSeat = () => {
    return {
        type:actionTypes.ADD_SEAT
    }
}
export const removeSeat = () => {
    return {
        type: actionTypes.REMOVE_SEAT
    }
}
export const changeTotalSeats = (totalSeats) => {
    return {
        type:actionTypes.CHANGE_TOTAL_SEATS,
        totalSeats:totalSeats
    }
}
export const updateTotalPrice = () => {
    return {
        type:actionTypes.UPDATE_TOTAL_PRICE
    }
}
export const bookingInit = (bookingData) => {
    return {
        type:actionTypes.BOOKING_INIT,
        ...bookingData
    }
}
export const bookingSuccess = () => {
    return {
        type:actionTypes.BOOKING_SUCCESS
    } 
}
export const bookingFail = () => {
    return {
        type:actionTypes.BOOKING_FAIL
    }
}
export const bookNow = (bookingData) => {
    return dispatch => {
        //dispatch(bookingInit(bookingData));
        console.log(bookingData)
        axios.post('/bookings/new', bookingData)
            .then(response => {
               console.log(response.data);
               dispatch(bookingSuccess()); 
            })
            .catch(error => {
                dispatch(bookingFail());
            })
    }
}
export const fetchBookingsStart = () => {
    return {
        type:actionTypes.FETCH_BOOKINGS_START
    }
}
export const fetchBookingsSuccess = (fetchedBookings) => {
    return {
        type:actionTypes.FETCH_BOOKINGS_SUCCESS,
        bookings: fetchedBookings
    }
}
export const fetchBookingsFailure = () => {
    return {
        type:actionTypes.FETCH_BOOKINGS_FAIL
    }
}
export const fetchBookings = () => {
    return dispatch => {
        dispatch(fetchBookingsStart());
        axios.get('/bookings/old')
            .then(response => {
                dispatch(fetchBookingsSuccess(response.data.bookings));
            })
            .catch(error => {
                dispatch(fetchBookingsFailure());
            })
    }
}