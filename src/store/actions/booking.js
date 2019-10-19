import * as actionTypes from '../actions/actionTypes'
import axios from '../../axios-base'

export const bookingInit = () => {
    return {
        type:actionTypes.BOOKING_INIT
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
        dispatch(bookingInit());
        axios.post('/book', bookingData)
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
export const fetchBookingsSuccess =() => {
    return {
        type:actionTypes.FETCH_BOOKINGS_SUCCESS
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
                const fetchedBookings = [];
                //to be completed
                dispatch(fetchBookingsSuccess());
            })
            .catch(error => {
                dispatch(fetchBookingsFailure());
            })
    }
}