"use strict";
import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER, AUTH_ERROR, UNAUTH_USER, FETCH_MESSAGE } from './types';

const ROOT_URL = 'http://localhost:3090';
export function signinUser({email, password}) {
    console.log('HELLO')
    //return a function is how we get access to the "dispatch" method
    //redux thunk gives us access to the dispatch method, allow us to dispatch any action
    return function(dispatch) {

        axios.post(`${ROOT_URL}/signin`, {email, password})
            .then(response => {
                //update state to indicate that users is aiuthenticated
                dispatch({ type: AUTH_USER })

                //Save the JWT token in localstore which is managed
                //entirely by users' browser
                localStorage.setItem('token', response.data.token)

                //Redirect users to /feature route
                browserHistory.push('/feature');
            })
            .catch(() => {
                console.log('ERRRRRRROR')
                dispatch(authError('Bad Login Info'))
            })
}    
}

export function authError(error) {
    return {
        type: AUTH_ERROR,
        payload: error
    }
}

export function signoutUser() {
    localStorage.removeItem('token');
    return {
        type: UNAUTH_USER
    }
}

export const signupUser = ({email, password}) => {
    return function(dispatch) {
        axios.post(`${ROOT_URL}/signup`, {email, password})
        .then(response => {
            console.log(response);
            dispatch({type: AUTH_USER});
            localStorage.setItem('token', response.data.token)
            browserHistory.push('/feature')
        })
        .catch(() => {
            
            dispatch(authError("Email is in use"))
        })
    }
}

export function fetchMessage() {
    return function(dispatch) {
        axios.get(ROOT_URL, {
            headers: {authorization: localStorage.getItem('token')}
        })
            .then(response => {
                dispatch({
                    type: FETCH_MESSAGE,
                    payload: response.data.message
                })
            })
    }
}


// Using redux promise for the same action creator
// export function fetchMessage() {
//     const request = axios.get(ROOT_URL, {
//         authorization: localStorage.getItem('token')
//     })

//     return {
//         type: FETCH_MESSAGE,
//         payload: request
//     }
// }