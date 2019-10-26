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
export const bookingStart = () => {
    return {
        type:actionTypes.BOOKING_START
    }
}
export const bookingSuccess = (bookingData) => {
    return {
        type:actionTypes.BOOKING_SUCCESS,
        bookingData:bookingData
    } 
}
export const bookingFail = (error) => {
    return {
        type:actionTypes.BOOKING_FAIL,
        error:error
    }
}
export const bookNow = (bookingData) => {
    return dispatch => {
        dispatch(bookingStart());
        axios.post('/bookings/new', bookingData)
            .then(response => {
               dispatch(bookingSuccess(response.data));
            })
            .catch(error => {
                console.log(error.message)
                dispatch(bookingFail(error.message));
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
export const fetchBookingsFailure = (error) => {
    return {
        type:actionTypes.FETCH_BOOKINGS_FAIL,
        error:error
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
                console.log(error.message)
                dispatch(fetchBookingsFailure(error.message));
            })
    }
}