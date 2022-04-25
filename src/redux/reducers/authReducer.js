import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    RESET
} from "../constants/authConstants"

const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
    user: user ? user : null,
    isLoading: false,
    isSuccessLogin: false,
    isSuccessRegister: false,
    isErrorLogin: false,
    isErrorRegister: false,
    message: ''
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return { ...state, isLoading: true, isErrorLogin: false }
        case REGISTER_REQUEST:
            return { ...state, isLoading: true, isErrorLogin: false }
        case LOGIN_SUCCESS:
            return { ...state, isLoading: false, isSuccessLogin: true, user: action.payload }
        case REGISTER_SUCCESS:
            return { ...state, isLoading: false, isSuccessRegister: true }
        case LOGIN_FAIL:
            return { ...state, isLoading: false, isErrorLogin: true, message: action.payload }
        case REGISTER_FAIL:
            return { ...state, isLoading: false, isErrorRegister: true, message: action.payload }
        case LOGOUT_SUCCESS:
            return { ...state, isSuccessLogin: false, isErrorLogin: false, user: null }
        case RESET:
            return { ...state, isSuccessRegister: false, isErrorLogin: false }
        default:
            return state
    }
}
