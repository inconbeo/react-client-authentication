"use strict";

import axios from 'axios';
const ROOT_URL = "http://localhost:3090";
export const signinUser = ({email, password}) => {
    //return a function is how we get access to the "dispatch" method
    //redux think gives us access to the dispatch method, allow us to dispatch any action
    return function(dispatch) {

        axios.post(`${ROOT_URL}/signin`, {email, password})

    }
    //SUbmit email, password to the server

    //if request is good...
    //we need to update state to indicate user is authenticated
    //Save the JWT token
    //redirect to the route '/feature'


    //if the request is bad...
    // we need to show an error to the user
}