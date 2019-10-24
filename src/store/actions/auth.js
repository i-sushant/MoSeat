import * as actionTypes from './actionTypes'
import axios from '../../axios-base'
import jwt_decode from 'jwt-decode';
export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}
export const authReady = () => {
    return {
        type:actionTypes.AUTH_READY
    }
}
export const authSuccess = (token, userId,name,email) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        userId: userId,
        name:name,
        email:email
    }
}
export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}
export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    localStorage.removeItem("email");
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}
export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, expirationTime * 1000)
    }
}
export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}
export const auth = (email, password,phoneNumber,firstName,lastName, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        let authData = {
            email: email,
            password: password
        }
        let url = '/user/login';
        if (isSignup) {
            url = '/user/register';
            authData = {
                email: email,
                password: password,
                name: firstName.trim() + " " + lastName.trim(),
                phoneNumber: phoneNumber
            }
        };
        axios.post(url, authData)
             .then(response => {
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                const decoded = jwt_decode(response.data.token.split(' ')[1]);
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('expirationDate', expirationDate)
                localStorage.setItem('userId', decoded.id);
                localStorage.setItem('name',decoded.name)
                localStorage.setItem('email', decoded.email);
                dispatch(authSuccess(response.data.token, decoded.id, decoded.name, decoded.email));
                dispatch(checkAuthTimeout(response.data.expiresIn))
            })
            .catch(err => {
                dispatch(authFail(err));
            })
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logout())
            } else {
                const userId = localStorage.getItem('userId');
                const name = localStorage.getItem('name');
                const email = localStorage.getItem('email');
                dispatch(authSuccess(token, userId,name,email));
            }
            dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000))
        }
    }
}