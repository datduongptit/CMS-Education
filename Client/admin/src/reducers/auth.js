import {
    // SET_ALERT,
    // REMOVE_ALERT,
    // REGISTER_FAIL,
    // REGISTER_SUCCESS,
    ACCOUNT_DELETED,
    LOGOUT,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    USER_LOADED,
    AUTH_ERROR,
} from '../constants';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null
}

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case LOGIN_SUCCESS:
            localStorage.setItem("token", payload.token)
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false
            };

        case LOGIN_FAIL:
        case LOGOUT:
        case AUTH_ERROR:
            localStorage.removeItem("token")
            return {
                ...state,
                token: null,
                isAuthenticated: null,
                loading: true
            };
        case ACCOUNT_DELETED:
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null
            };
        case USER_LOADED:
            return {
                ...state,
                user: payload,
                isAuthenticated: true,
                loading: false
            };

        default:
            return state;
    }
}
